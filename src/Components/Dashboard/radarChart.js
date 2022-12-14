// code inspo for radar chart
//  http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
import React, { useEffect, useRef, useMemo } from "react"
import * as d3 from "d3"
import { useGetTrackFeatures } from "../../data"

const Radar = ({ selectedTrack }) => {
  const [height, setHeight] = React.useState(0)
  const { data: features } = useGetTrackFeatures(selectedTrack?.id)

  const ref = useRef()

  const svg = d3.select(ref.current)
  const width = svg.node()?.getBoundingClientRect().width

  if (height !== width) setHeight(width)

  const radarWidth = width - margin.left - margin.right
  const radarHeight = width - margin.top - margin.bottom

  genericScale.range([0, radarWidth / 2])
  loudnessScale.range([0, radarWidth / 2])
  tempoScale.range([0, radarWidth / 2])

  const cfg = useMemo(() => {
    return {
      w: radarWidth,
      h: radarHeight,
      margin,
      levels: 5, //How many levels or inner circles should there be drawn
      maxValue: 1, //What is the value that the biggest circle will represent
      labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
      wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
      opacityArea: 0.35, //The opacity of the area of the blob
      dotRadius: 4, //The size of the colored circles of each blog
      opacityCircles: 0.1, //The opacity of the circles of each blob
      strokeWidth: 2, //The width of the stroke around each blob
      roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed)
      color, //Color function
    }
  }, [radarWidth, radarHeight])

  const radius = Math.min(cfg.w / 2, cfg.h / 2)
  const angleSlice = (Math.PI * 2) / featureNames.length

  //Scale for the radius
  const rScale = d3.scaleLinear().range([0, radius]).domain([0, cfg.maxValue])

  const previousSelectedTrack = usePrevious(selectedTrack)

  // If the selected song is unselected, remove the blob
  useEffect(() => {
    if (!ref) return
    if (!selectedTrack && previousSelectedTrack) {
      svg
        .selectAll(".radar-chart-container")
        .selectAll(".radarWrapper")
        .selectAll(".radarArea")
        .remove()
    }
  }, [selectedTrack, svg, previousSelectedTrack])

  // Modify the svg's width and height if the window is resized
  useEffect(() => {
    if (!ref) return
    svg
      .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
      .attr("height", radius * 2 + cfg.margin.top + cfg.margin.bottom)
      .attr("class", "radar")
  }, [cfg, radius, svg])

  // Draw the background circles
  useEffect(() => {
    if (!ref) return
    //Append a g element
    let g = svg.select(".radar-chart-container")
    let drawElements = g.empty()
    // var testing = true;
    if (drawElements) {
      g = svg
        .append("g")
        .attr("class", "radar-chart-container")
        .attr(
          "transform",
          "translate(" +
            (cfg.w / 2 + cfg.margin.left) +
            "," +
            (radius + 30) +
            ")"
        )
      //Wrapper for the grid & axes

      let axisGrid = g.append("g").attr("class", "axisWrapper")
      //Draw the background circles
      axisGrid
        .selectAll(".levels")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("circle")
        .merge(axisGrid)
        .attr("class", "gridCircle")
        .attr("r", function (d, i) {
          return (radius / cfg.levels) * d
        })
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles)
      // .style("filter" , "url(#glow)");

      //Text indicating at what % each level is
      axisGrid
        .selectAll(".axisLabel")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", function (d) {
          return (-d * radius) / cfg.levels
        })
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(function (d, i) {
          return `${cfg.maxValue * ((100 * d) / cfg.levels)}%`
        })

      //draw axis
      //Create the straight lines radiating outward from the center
      var axis = axisGrid
        .selectAll(".axis")
        .data(featureNames)
        .enter()
        .append("g")
        .attr("class", "axis")

      //Append the lines
      axis
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d, i) {
          return (
            rScale(cfg.maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
          )
        })
        .attr("y2", function (d, i) {
          return (
            rScale(cfg.maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
          )
        })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px")
      //Append the labels at each axis
      axis
        .append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", function (d, i) {
          return (
            rScale(cfg.maxValue * cfg.labelFactor) *
            Math.cos(angleSlice * i - Math.PI / 2)
          )
        })
        .attr("y", function (d, i) {
          return (
            rScale(cfg.maxValue * cfg.labelFactor) *
            Math.sin(angleSlice * i - Math.PI / 2)
          )
        })
        .text(function (d) {
          return d
        })
        .call(wrap, cfg.wrapWidth)

      // add radarWrapper to hold the shape
      g.append("g").attr("class", "radarWrapper")
    }
  })

  useEffect(() => {
    if (!features || !ref) return

    const g = svg.select(".radar-chart-container")

    const selectedSongFeaturesSimple = [
      features.acousticness,
      features.danceability,
      features.energy,
      features.instrumentalness,
      features.loudness,
      features.tempo,
      features.valence,
    ]

    //draw radar blobs
    //The radial line function
    const radarLine = d3
      .lineRadial()
      .radius(function (d, i) {
        return scaleValue(d, i)
      })
      .angle(function (d, i) {
        return i * angleSlice
      })

    //Create a wrapper for the blobs
    const blobWrapper = g.selectAll(".radarWrapper")
    blobWrapper.selectAll(".radarArea").remove()

    blobWrapper
      .data([selectedSongFeaturesSimple])
      .enter()
      .merge(blobWrapper)
      .append("path")
      .attr("class", "radarArea")
      .attr("d", radarLine)
      .style("fill", function (d, i) {
        return cfg.color(i)
      })
      .style("fill-opacity", cfg.opacityArea)
      .on("mouseover", function (d, i) {
        //Dim all blobs
        d3.selectAll(".radarArea")
          .transition()
          .duration(200)
          .style("fill-opacity", 0.1)
        //Bring back the hovered over blob
        d3.select(this).transition().duration(200).style("fill-opacity", 0.7)
      })
      .on("mouseout", function () {
        //Bring back all blobs
        d3.selectAll(".radarArea")
          .transition()
          .duration(200)
          .style("fill-opacity", cfg.opacityArea)
      })
  }, [features, selectedTrack, cfg, svg, angleSlice])

  return (
    <>
      <div className="centered">
        <h3>
          {selectedTrack
            ? `Radar Chart for ${selectedTrack?.name}`
            : "Radar Chart"}
        </h3>
      </div>
      <svg
        style={{
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
        ref={ref}
      />
    </>
  )
}

//wrap helper function
//Wraps SVG text
const wrap = (text, width) => {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.4, // ems
      y = text.attr("y"),
      x = text.attr("x"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em")

    while ((word = words.pop())) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word)
      }
    }
  })
} //wrap

export default Radar

// Scales for each attr
const color = d3.scaleOrdinal().range(["#EDC951", "#CC333F", "#00A0B0"])
const genericScale = d3.scaleLinear().domain([0, 1])
const loudnessScale = d3.scaleLinear().domain([-25, 0])
const tempoScale = d3.scaleLinear().domain([50, 250])

const scaleValue = (attrData, index) => {
  if (index === 4) return loudnessScale(attrData)
  if (index === 5) return tempoScale(attrData)
  return genericScale(attrData)
}

const margin = { top: 30, right: 60, bottom: 40, left: 60 }

const featureNames = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "loudness",
  "tempo",
  "valence",
]

// Hook borrowed from https://usehooks.com/usePrevious/
const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()
  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current
}

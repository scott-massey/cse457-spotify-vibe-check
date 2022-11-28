// code inspo for radar chart
//  http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
import { useD3 } from "../hooks/useD3"
import React from "react"
import * as d3 from "d3"
import { useGetTrackFeatures } from "../../data"

const Radar = ({ featuresSummary, selectedTrack, loading }) => {
  console.log("selectedTrack:", selectedTrack)
  const [height, setHeight] = React.useState(0)
  const { data: features } = useGetTrackFeatures(selectedTrack?.id)

  const renderChart = (svg) => {
    if (!features) return

    const width = svg.node()?.getBoundingClientRect().width
    let middle = width / 2

    if (height !== width) setHeight(width)

    var margin = { top: 200, right: 100, bottom: 200, left: 100 },
      radarWidth =
        Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
      radarHeight = Math.min(
        width,
        window.innerHeight - margin.top - margin.bottom - 20
      )

    var color = d3.scaleOrdinal().range(["#EDC951", "#CC333F", "#00A0B0"])

    // Scales for each attr
    let genericScale = d3.scaleLinear().domain([0, 1]).range([0, 15])

    let loudnessScale = d3.scaleLinear().domain([-25, 0]).range([0, 3])

    let tempoScale = d3.scaleLinear().domain([50, 250]).range([0, 3])

    function scaleValue(attrData) {
      if (attrData.key === "loudness") return loudnessScale(attrData.value)
      if (attrData.key === "tempo") return tempoScale(attrData.value)
      return genericScale(attrData.value)
    }

    var cfg = {
      w: radarWidth,
      h: radarHeight,
      margin: margin,
      levels: 5, //How many levels or inner circles should there be drawn
      maxValue: 3, //What is the value that the biggest circle will represent
      labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
      wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
      opacityArea: 0.35, //The opacity of the area of the blob
      dotRadius: 4, //The size of the colored circles of each blog
      opacityCircles: 0.1, //The opacity of the circles of each blob
      strokeWidth: 2, //The width of the stroke around each blob
      roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed)
      color: color, //Color function
    }

    if (featuresSummary) {
      var allAxis = featuresSummary.map(function (i, j) {
          return i.key
        }), //Names of each axis
        total = allAxis.length, //The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
        Format = d3.format("%"), //Percentage formatting
        angleSlice = (Math.PI * 2) / total //The width in radians of each "slice"
    }

    //Scale for the radius
    var rScale = d3.scaleLinear().range([0, radius]).domain([0, cfg.maxValue])

    //create containers
    //radar chart SVG
    svg
      .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
      .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
      .attr("class", "radar")

    //Append a g element
    var g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          (cfg.w / 2 + cfg.margin.left) +
          "," +
          (cfg.h / 2 + 50) +
          ")"
      )

    //draw circular grid
    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper")

    //Draw the background circles
    axisGrid
      .selectAll(".levels")
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append("circle")
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
        return Format((cfg.maxValue * d) / cfg.levels)
      })

    //draw axis
    //Create the straight lines radiating outward from the center
    var axis = axisGrid
      .selectAll(".axis")
      .data(allAxis)
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

    /*var testData = [
      [3.14 * 1.4],
      [3.14 * 0.75],
      [3.14 * 1.25],
      [3.14 * 1.5],
      [3.14 * 1.75],
      [3.14 * 2],
    ]*/

    const data = [
      { key: "acousticness", value: features.acousticness },
      { key: "danceability", value: features.danceability },
      { key: "energy", value: features.energy },
      { key: "energy", value: features.instrumentalness },
      { key: "loudness", value: features.loudness },
      { key: "tempo", value: features.tempo },
      { key: "valence", value: features.valence },
    ]

    //draw radar blobs
    //The radial line function
    var radarLine = d3
      .lineRadial()
      .radius(function (d) {
        return scaleValue(d)
      })
      .angle(function (d, i) {
        return i * angleSlice
      })
    // .interpolate("linear-closed");

    // if(cfg.roundStrokes) {
    //     radarLine.interpolate("cardinal-closed");
    // }

    //Create a wrapper for the blobs
    var blobWrapper = g
      .selectAll(".radarWrapper")
      .data(featuresSummary)
      .enter()
      .append("g")
      .attr("class", "radarWrapper")

    //think i need to be passing a list of songs with their attr means into this function for it to properly draw path of blob
    //Right now its using the same fixed test data above (which mimics an individual songs attr values) and plots it
    //Append the backgrounds
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .attr("d", function (d, i) {
        return radarLine(data)
      })
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

    //Create the outlines
    blobWrapper
      .append("path")
      .attr("class", "radarStroke")
      .attr("d", function (d, i) {
        return radarLine(d)
      })
      .style("stroke-width", cfg.strokeWidth + "px")
      .style("stroke", "red")
      .style("fill", "red")

    //Append the circles
    blobWrapper
      .selectAll(".radarCircle")
      .data(function (d, i) {
        return d
      })
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", cfg.dotRadius)
      .attr("cx", function (d, i) {
        return scaleValue(d) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr("cy", function (d, i) {
        return scaleValue(d) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .style("fill", "red")
      .style("fill-opacity", 0.8)

    //wrap helper function
    //Wraps SVG text
    function wrap(text, width) {
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

    //data length is used as a trigger to re render chartRenderFn when length of data changes
  }

  const ref = useD3(renderChart, [
    featuresSummary,
    loading,
    selectedTrack,
    features,
  ])

  if (!featuresSummary || loading) {
    return <div></div>
  }

  if (!selectedTrack) {
    return <h3>Select a track to see more!</h3>
  }

  return (
    <>
      <div className="centered">
        <h3>Radar Chart for {selectedTrack?.name}</h3>
      </div>
      <svg
        style={{
          height,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
        ref={ref}
      >
        <g className="radar-area" />
      </svg>
    </>
  )
}

export default Radar

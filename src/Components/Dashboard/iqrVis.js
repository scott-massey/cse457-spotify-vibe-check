// code inspo for radar chart
//  http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
import { useD3 } from "../hooks/useD3"
import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import { CircularProgress } from "@mui/material"

import { useGetTrackFeatures } from "../../data"

const IQR = ({
  data,
  featuresSummary,
  loading,
  activePlaylist,
  selectedTrack,
}) => {
  const ref = useRef()
  const { data: selectedTrackFeatures } = useGetTrackFeatures(selectedTrack?.id)

  useEffect(() => {
    if (!ref.current) return

    const svg = d3.select(ref.current)
    const width = svg.node()?.getBoundingClientRect().width

    //circle avg label container
    svg
      .select(".plot-area")
      .append("text")
      .attr("class", "avgLabel")
      .style("opacity", 0)
      .attr("x", "50%")
      .attr("y", 50)

    let middle = width / 2

    // Scales for each attr
    let genericScale = d3.scaleLinear().domain([0, 1]).range([-150, 150])
    let loudnessScale = d3.scaleLinear().domain([-25, 0]).range([-150, 150])
    let tempoScale = d3.scaleLinear().domain([50, 250]).range([-150, 150])

    function scaleValue(attrData, iqrSpot) {
      if (attrData.key === "loudness") return loudnessScale(attrData[iqrSpot])
      if (attrData.key === "tempo") return tempoScale(attrData[iqrSpot])
      return genericScale(attrData[iqrSpot])
    }

    let circle = svg
      .select(".plot-area")
      .selectAll("circle")
      .data(featuresSummary)

    //Draw circles for average value
    circle
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return middle + scaleValue(d, "mean")
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })
      .merge(circle)
      .attr("r", 10)
      .style("fill", "blue")
      .style("opacity", 0.6)
      .attr("class", "avgCircle")
      .on("mouseover", function (event, d) {
        let label = d3.select("text.avgLabel")

        label
          .style("opacity", 0.8)
          .style("fill", "blue")
          .attr("x", d3.select(this)._groups[0][0].cx.baseVal.value - 8)
          .attr("y", d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("font-size", 10)
          .text(d.mean)
      })
      .on("mouseout", function (d, i) {
        let label = d3.select("text.avgLabel")
        label.style("opacity", 0)
      })

    //draw circles for low value
    circle
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return middle + scaleValue(d, "min")
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })
      .merge(circle)
      .attr("r", 10)
      .style("fill", "red")
      .style("opacity", 0.6)
      .attr("class", "lowCircle")
      .on("mouseover", function (event, d) {
        let label = d3.select("text.avgLabel")
        label
          .style("opacity", 0.8)
          .attr("x", d3.select(this)._groups[0][0].cx.baseVal.value - 8)
          .attr("y", d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("fill", "red")
          .style("font-size", 10)
          .text(d.min)
      })
      .on("mouseout", function (d, i) {
        let label = d3.select("text.avgLabel")
        label.style("opacity", 0)
      })

    //draw circles for high value
    circle
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return middle + scaleValue(d, "max")
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })
      .merge(circle)
      .attr("r", 10)
      .style("fill", "green")
      .style("opacity", 0.6)
      .attr("class", "highCircle")
      .on("mouseover", function (event, d) {
        let label = d3.select("text.avgLabel")
        label
          .style("opacity", 0.8)
          .attr("x", d3.select(this)._groups[0][0].cx.baseVal.value - 8)
          .attr("y", d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("font-size", 10)
          .style("fill", "green")
          .text(d.max)
      })
      .on("mouseout", function (d, i) {
        let label = d3.select("text.avgLabel")
        label.style("opacity", 0)
      })

    // Exit
    circle.exit().remove()

    let iqrLine = svg
      .select(".plot-area")
      .selectAll("line")
      .data(featuresSummary)

    //draw line connecting circles by hori plane
    iqrLine
      .enter()
      .append("line")
      .attr("x1", function (d) {
        return middle + scaleValue(d, "min")
      })
      .attr("y1", function (d, i) {
        return i * 30 + 30
      })
      .attr("x2", function (d) {
        return middle + scaleValue(d, "max")
      })
      .attr("y2", function (d, i) {
        return i * 30 + 30
      })
      .merge(iqrLine)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .style("stroke-opacity", 0.5)
      .attr("fill", "none")

    iqrLine.exit().remove()

    //draw avg line down middle
    svg
      .select(".plot-area")
      .append("line")
      .attr("x1", function (d) {
        return middle
      })
      .attr("y1", 10)
      .attr("x2", function (d) {
        return middle
      })
      .attr("y2", 240)
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 5.5)
      .attr("fill", "none")

    //middle line label
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", function (d) {
        return middle
      })
      .attr("y", 310)
      .attr("transform", "translate(-50, -50)")
      .style("font-size", 10)
      .text("Avg Scaled Attr Value")

    //left arrow label
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", function (d) {
        return middle - 150
      })
      .attr("y", 310)
      .attr("transform", "translate(-20, -50)")
      .style("font-size", 10)
      .text("<-- less attr")

    //left arrow label
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", function (d) {
        return middle + 150
      })
      .attr("y", 310)
      .attr("transform", "translate(-20, -50)")
      .style("font-size", 10)
      .text("more attr -->")

    //middle of scale label (0)
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle)
      .attr("y", 10)
      .style("font-size", 10)
      .text("0")
    //left bound of scale (-3)
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle - 155)
      .attr("y", 10)
      .style("font-size", 10)
      .text("-1")

    //right bound of scale (+3)
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle + 155)
      .attr("y", 10)
      .style("font-size", 10)
      .text("+1")

    let text = svg
      .select(".plot-area")
      .selectAll("text.label")
      .data(featuresSummary)

    //add song attributes labels
    text
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", function (d, i) {
        return i * 30 + 35
      })
      .text(function (d, i) {
        return d.key
      })
      .merge(text)
      .style("font-size", 10)
      .style("font-weight", "bold")

    text.exit().remove()

    // add group for selected track
    svg.append("g").attr("class", "selected-track")

    //data length is used as a trigger to re render chartRenderFn when length of data changes
  }, [featuresSummary, loading, data.length])

  useEffect(() => {
    if (!ref.current) return
    if (!selectedTrackFeatures) return

    // Scales for each attr
    let genericScale = d3.scaleLinear().domain([0, 1]).range([-150, 150])
    let loudnessScale = d3.scaleLinear().domain([-25, 0]).range([-150, 150])
    let tempoScale = d3.scaleLinear().domain([50, 250]).range([-150, 150])

    function scaleValue(d, i) {
      if (i === 4) return loudnessScale(d)
      if (i === 5) return tempoScale(d)
      return genericScale(d)
    }

    const svg = d3.select(ref.current)
    const width = svg.node()?.getBoundingClientRect().width
    const middle = width / 2

    const features = [
      selectedTrackFeatures.acousticness,
      selectedTrackFeatures.danceability,
      selectedTrackFeatures.energy,
      selectedTrackFeatures.instrumentalness,
      selectedTrackFeatures.loudness,
      selectedTrackFeatures.tempo,
      selectedTrackFeatures.valence,
    ]

    const selectedTrackCircles = svg
      .select(".selected-track")
      .selectAll("circle")
      .data(features)

    //draw circles for selected track
    selectedTrackCircles
      .enter()
      .append("circle")
      .merge(selectedTrackCircles)
      .attr("cx", function (d, i) {
        return middle + scaleValue(d, i)
      })
      .attr("cy", function (d, i) {
        return i * 30 + 30
      })
      .attr("r", 5)
      .attr("fill", "#EDC951")

    selectedTrackCircles.exit().remove()
  }, [selectedTrackFeatures])

  if (!activePlaylist) {
    return <h3>Click on a playlist to get started!</h3>
  }

  if (loading || !featuresSummary) {
    return (
      <div className="centered">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div className="centered">
        <h3>Playlist Features</h3>
      </div>
      <svg
        style={{
          height: 275,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
        ref={ref}
      >
        <g className="plot-area" />
        <g className="radar-area" />
      </svg>
    </>
  )
}

export default IQR

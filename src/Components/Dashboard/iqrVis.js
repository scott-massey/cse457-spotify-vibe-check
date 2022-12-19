// code inspo for radar chart
//  http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

import { useGetTrackFeatures } from "../../data"
import { obamaTrackFeatures } from "../../data/obama/trackFeatures"

const IQR = ({ featuresSummary, loading, activePlaylist, selectedTrack, loggedIn }) => {
  const ref = useRef()
  var { data: selectedTrackFeatures } = useGetTrackFeatures(selectedTrack?.id)

  if (!loggedIn && activePlaylist) {
	const obamaFeatures = obamaTrackFeatures[activePlaylist?.id].find(element => element.id === selectedTrack?.id);
	selectedTrackFeatures = obamaFeatures
  }


  const selectedTrackFeatures2 = (loggedIn ? selectedTrackFeatures : obamaTrackFeatures[selectedTrack?.id])
//   console.log(selectedTrackFeatures2)
  const svg = d3.select(ref.current)
  const width = svg.node()?.getBoundingClientRect().width
  const middle = (width + 80) / 2
//   console.log({loggedIn, selectedTrack})

  if (!selectedTrack) {
    svg.select(".plot-area").selectAll(".selected-track").remove()
  }

  // Draw Scaffolds for iqr chart, if needed
  if (svg && svg.select(".plot-area").empty()) {
    svg.append("g").attr("class", "plot-area")

    //draw avg line down middle
    svg
      .select(".plot-area")
      .append("line")
      .attr("x1", middle)
      .attr("y1", 15)
      .attr("x2", middle)
      .attr("y2", 240)
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 5.5)
      .attr("fill", "none")

    //middle line label
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle)
      .attr("y", 310)
      .attr("transform", "translate(-50, -50)")
      .style("font-size", 10)
      .text("Avg Scaled Attr Value")

    //left arrow label
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle - 150)
      .attr("y", 310)
      .attr("transform", "translate(-20, -50)")
      .style("font-size", 10)
      .text("<-- less attr")

    //left arrow label
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle + 150)
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
      .style("text-anchor", "middle")
      .text("0")
    //left bound of scale (-3)
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle - 155)
      .attr("y", 10)
      .style("font-size", 10)
      .style("text-anchor", "middle")
      .text("-1")

    //right bound of scale (+3)
    svg
      .select(".plot-area")
      .append("text")
      .attr("x", middle + 155)
      .attr("y", 10)
      .style("font-size", 10)
      .style("text-anchor", "middle")
      .text("+1")

    let text = svg
      .select(".plot-area")
      .selectAll("text.label")
      .data(featureLabels)

    //add song attributes labels
    text
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", function (d, i) {
        return i * 30 + 35
      })
      .text((d) => d)
      .merge(text)
      .style("font-size", 10)
      .style("font-weight", "bold")

    //circle avg label container
    svg
      .select(".plot-area")
      .append("text")
      .attr("class", "avgLabel")
      .style("opacity", 0)
      .attr("x", "50%")
      .attr("y", 50)
      .style("text-anchor", "middle")
      .style("font-size", 10)
  }

  useEffect(() => {
    if (!ref.current) return
    if (!featuresSummary) return

    let avgCircle = svg
      .select(".plot-area")
      .selectAll("circle.avgCircle")
      .data(featuresSummary)

    //Draw circles for average value
    avgCircle
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("fill", "blue")
      .style("opacity", 0.6)
      .attr("class", "avgCircle")
      .on("mouseover", function (event, d) {
        let label = d3.select("text.avgLabel")

        label
          .style("opacity", 0.8)
          .style("fill", "blue")
          .attr("x", d3.select(this)._groups[0][0].cx.baseVal.value)
          .attr("y", d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .text(d.mean.toFixed(3))
      })
      .on("mouseout", function (d, i) {
        let label = d3.select("text.avgLabel")
        label.style("opacity", 0)
      })
      .merge(avgCircle)
      .attr("cx", function (d) {
        return middle + scaleValue(d, "mean")
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })

    let lowCircle = svg
      .select(".plot-area")
      .selectAll("circle.lowCircle")
      .data(featuresSummary)

    //draw circles for low value
    lowCircle
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("fill", "red")
      .style("opacity", 0.6)
      .attr("class", "lowCircle")
      .on("mouseover", function (event, d) {
        let label = d3.select("text.avgLabel")
        label
          .style("opacity", 0.8)
          .attr("x", d3.select(this)._groups[0][0].cx.baseVal.value)
          .attr("y", d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("fill", "red")
          .text(d.min.toFixed(3))
      })
      .on("mouseout", function (d, i) {
        let label = d3.select("text.avgLabel")
        label.style("opacity", 0)
      })
      .merge(lowCircle)
      .attr("cx", function (d) {
        return middle + scaleValue(d, "min")
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })

    const highCircle = svg
      .select(".plot-area")
      .selectAll("circle.highCircle")
      .data(featuresSummary)

    //draw circles for high value
    highCircle
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("fill", "green")
      .style("opacity", 0.6)
      .attr("class", "highCircle")
      .on("mouseover", function (event, d) {
        let label = d3.select("text.avgLabel")
        label
          .style("opacity", 0.8)
          .attr("x", d3.select(this)._groups[0][0].cx.baseVal.value)
          .attr("y", d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("fill", "green")
          .text(d.max.toFixed(3))
      })
      .on("mouseout", function (d, i) {
        let label = d3.select("text.avgLabel")
        label.style("opacity", 0)
      })
      .merge(highCircle)
      .attr("cx", function (d) {
        return middle + scaleValue(d, "max")
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })

    const iqrLine = svg
      .select(".plot-area")
      .selectAll("line.iqrLine")
      .data(featuresSummary)

    //draw line connecting circles by hori plane
    iqrLine
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .style("stroke-opacity", 0.5)
      .attr("fill", "none")
      .attr("class", "iqrLine")
      .attr("y2", function (d, i) {
        return i * 30 + 30
      })
      .attr("y1", function (d, i) {
        return i * 30 + 30
      })
      .merge(iqrLine)
      .attr("x1", function (d) {
        return middle + scaleValue(d, "min")
      })
      .attr("x2", function (d) {
        return middle + scaleValue(d, "max")
      })

    iqrLine.exit().remove()

    const q1line = svg
      .select(".plot-area")
      .selectAll("line.q1Line")
      .data(featuresSummary)

    //draw q1 lines for each horizontal IQR line
    q1line
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .style("stroke-opacity", 0.5)
      .attr("fill", "none")
      .attr("class", "q1Line")
      .attr("y1", function (d, i) {
        return i * 30 + 25
      })
      .attr("y2", function (d, i) {
        return i * 30 + 35
      })
      .merge(q1line)
      .attr("x1", function (d) {
        return middle + scaleValue(d, "q1")
      })
      .attr("x2", function (d) {
        return middle + scaleValue(d, "q1")
      })

    const q3line = svg
      .select(".plot-area")
      .selectAll("line.q3Line")
      .data(featuresSummary)

    //draw q3 lines for each horizontal IQR line
    q3line
      .enter()
      .append("line")
      .attr("y1", function (d, i) {
        return i * 30 + 25
      })
      .attr("y2", function (d, i) {
        return i * 30 + 35
      })
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .style("stroke-opacity", 0.5)
      .attr("fill", "none")
      .attr("class", "q3Line")
      .merge(q3line)
      .attr("x1", function (d) {
        return middle + scaleValue(d, "q3")
      })
      .attr("x2", function (d) {
        return middle + scaleValue(d, "q3")
      })
  })

  useEffect(() => {
    if (!ref.current) return
    if (!selectedTrackFeatures) return

    // scaling is slightly different for selected track
    function scaleValue(value, index) {
      if (index === 4) return loudnessScale(value)
      if (index === 5) return tempoScale(value)
      return genericScale(value)
    }

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
      .select(".plot-area")
      .selectAll("circle.selected-track")
      .data(features)

    //draw circles for selected track
    selectedTrackCircles
      .enter()
      .append("circle")
      .attr("cy", function (d, i) {
        return i * 30 + 30
      })
      .attr("r", 5)
      .attr("fill", "#e8bc2a")
      .attr("class", "selected-track")
      .merge(selectedTrackCircles)
      .attr("cx", function (d, i) {
        return middle + scaleValue(d, i)
      })

    selectedTrackCircles.exit().remove()
  })

  return (
    <>
      <div className={activePlaylist && "centered"}>
        <h3>
          {activePlaylist
            ? "Playlist Features"
            : "Select a playlist to get started!"}
        </h3>
      </div>
      <svg
        style={{
          height: 275,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
        ref={ref}
      ></svg>
    </>
  )
}

// Scales for each attr
let genericScale = d3.scaleLinear().domain([0, 1]).range([-150, 150])
let loudnessScale = d3.scaleLinear().domain([-25, 0]).range([-150, 150])
let tempoScale = d3.scaleLinear().domain([50, 250]).range([-150, 150])

function scaleValue(attrData, iqrSpot) {
  if (attrData.key === "loudness") return loudnessScale(attrData[iqrSpot])
  if (attrData.key === "tempo") return tempoScale(attrData[iqrSpot])
  return genericScale(attrData[iqrSpot])
}

const featureLabels = [
  "Acousticness",
  "Danceability",
  "Energy",
  "Instrumentalness",
  "Loudness",
  "Tempo",
  "Valence",
]

export default IQR

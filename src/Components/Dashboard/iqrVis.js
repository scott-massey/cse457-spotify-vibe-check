import { useD3 } from "../hooks/useD3"
import React from "react"
import * as d3 from "d3"

const IQR = ({ data, featuresSummary, activePlaylist, loading }) => {
	// console.log(featuresSummary)

  const renderChart = (svg) => {
    const margin = { top: 40, right: 0, bottom: 60, left: 60 }

    const width = 800
    const height = 300


    svg.select(".plot-area").append("text").text("TEST TEST TEST from vis")


    //text g
    svg.append("g").attr("class","textContainer");

    //line container
    svg.append("g").attr("class","lineContainer");

    //circle container
    svg.append("g").attr("class","circleContainer");

    //circle avg label container
    svg
      .select(".plot-area")
      .append("text")
      .attr("class", "avgLabel")
      .style("opacity", 0)
      .attr("x", "50%")
      .attr("y", 50);

      // svg
      // .select(".plot-area")
      // .append("text")
      // .attr("class", "avgLabel")
      // .style("opacity", 0)
      // .attr("x", "50%")
      // .attr("y", 50);

    // Scales and axes
    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain(
        (function (d) {
          return d.low
        },
        function (d) {
          return d.high
        })
      )

    let circle = svg.select(".plot-area").selectAll("circle").data(featuresSummary)

    //Draw circles for average value
    circle
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        if(d.key == "loudness") return width/2 + 15;
        if(d.key == "tempo") return width/2 +24;

        return width / 2 + 100 * d.mean
      })
      .attr("cy", function (d, i) {
        return 30 + 30 * i
      })
      .merge(circle)
      .attr("r", 10)
      .style("fill", "blue")
      .style("opacity", 0.6)
      .attr("class", "avgCircle")
      .on('mouseover', function (event,d) {
          let label = d3.select("text.avgLabel");

          label
          .style("opacity",.8)
          .style("fill","blue")
          .attr("x",d3.select(this)._groups[0][0].cx.baseVal.value -8)
          .attr("y",d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("font-size",10)
          .text(d.mean);
      })
      .on('mouseout', function (d, i) {
          let label = d3.select("text.avgLabel");
          label.style("opacity",0);
      });

    //draw circles for low value
      circle.enter().append("circle")
      .attr("cx", function(d) { 
        if(d.key == "tempo") return width/2 -.3;
        if(d.key == "loudness") return width/2 -.5;
        return width/2 + (100*d.min); })
      .attr("cy", function(d,i) { return 30 + 30*i; })
      .merge(circle)
      .attr("r", 10)
      .style("fill","red")
      .style("opacity",.6)
      .attr("class", "lowCircle")
      .on('mouseover', function (event,d) {
          let label = d3.select("text.avgLabel");
          label
          .style("opacity",.8)
          .attr("x",d3.select(this)._groups[0][0].cx.baseVal.value -8)
          .attr("y",d3.select(this)._groups[0][0].cy.baseVal.value - 15)
          .style("fill","red")
          .style("font-size",10)
          .text(d.min);
      })
      .on('mouseout', function (d, i) {
          let label = d3.select("text.avgLabel");
          label.style("opacity",0);
      });

    //draw circles for high value
        circle.enter().append("circle")
        .attr("cx", function(d) { 
          if(d.key == "tempo") return width/2 + Math.abs(d.max)
          return width/2 + Math.abs(100*d.max); })
        .attr("cy", function(d,i) { return 30 + 30*i; })
        .merge(circle)
        .attr("r", 10)
        .style("fill","green")
        .style("opacity",.6)
        .attr("class", "highCircle")
        .on('mouseover', function (event,d) {
            let label = d3.select("text.avgLabel");
            label
            .style("opacity",.8)
            .attr("x",d3.select(this)._groups[0][0].cx.baseVal.value -8)
            .attr("y",d3.select(this)._groups[0][0].cy.baseVal.value - 15)
            .style("font-size",10)
            .style("fill","green")
            .text(d.max);
        })
        .on('mouseout', function (d, i) {
            let label = d3.select("text.avgLabel");
            label.style("opacity",0);
        });

    //     // Exit
    circle.exit().remove()

        let iqrLine = svg.select(".plot-area").selectAll("line").data(featuresSummary);

    //draw line connecting circles by hori plane
        iqrLine.enter().append("line")
        .attr('x1', function(d,i){
          if(i == 5) return 0;
          if(i == 4) return 0;
           return width/2 + (100*d.min)})
        .attr('y1', function(d,i){return i*30 + 30})
        .attr('x2', function(d,i){ 
          if(i == 5) return 0;
          if(i == 4) return 0;
          return width/2 + Math.abs(100*d.max)})
        .attr('y2', function(d,i){ return i*30 + 30})
        .merge(iqrLine)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .style("stroke-opacity", 0.5)
        .attr("fill", "none");

        iqrLine.exit().remove();

    //draw avg line down middle
        svg.select(".plot-area").append('line')
        .attr('x1', function(d){ return width/2 + 50})
        .attr('y1', 30)
        .attr('x2', function(d){ return width/2 + 50})
        .attr('y2', function(d){ return (data.length + 3)* 30 + 30})
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray",5.5)
        .attr("fill", "none");

    //middle line label
        svg.select(".plot-area").append("text")
        .attr("x", width/2 + 50)
        .attr("y", (data.length + 5)*30 + 40)
        .attr("transform", "translate(-50, -50)")
        .style("font-size",10)
        .text("Average Attribute Value");

      let text = svg.select(".plot-area").selectAll("text.label").data(featuresSummary);

    //add story titles
      text.enter().append("text")
      .attr("x", 30)
      .attr("y", function(d,i){return i*30 + 35})
      .text(function(d,i){return d.key})
      .merge(text)
      .style("font-size",10)
      .style("font-weight","bold");

      text.exit().remove();

    //data length is used as a trigger to re render chartRenderFn when length of data changes
  }

  const ref = useD3(renderChart, [featuresSummary, loading])

//   console.log("ref:", ref)

  if (loading) {
	return(
		<div>
			loading...
		</div>
	)
  }
  if (!featuresSummary) {
	return(
		<div>
			select a playlist to get started!
		</div>
	)
  }
  return (
	<>
	<p>{(activePlaylist) ? `${activePlaylist.name}` : ''}</p>
    <svg
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
      ref={ref}
    >
      <g className="plot-area" />
      <g className="text-area" />
      <g className="line-area" />
      <g className="circle-area" />
    </svg>
	</>
  )
}

export default IQR

import { useD3 } from "../hooks/useD3"
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Box, Typography } from "@mui/material"
import { ticks } from "d3"

const ArtistBubbles = ({ data, loading }) => {

	const [ activeArtist, setActiveArtist ] = useState(null)
	const [ activeCount, setActiveCount ] = useState(0)

	useEffect(() => {
		if (!loading) {
			if (data) {
				d3.select('#artist-bubbles-container').selectAll("*").remove()
				display(data)
			}
		}

	}, [data])

	if (loading) {
		return (
			<Box>loading...</Box>
		)
	}
	if (!data) {
		return (
			<Box>Bubbles</Box>
		)
	}
	return(
		<Box>
			<Box id="artist-bubbles-header">
				<Typography>Arists in this playlist:</Typography>
			</Box>
			<Box id="artist-bubbles-container" ></Box>
			<Box sx={{minHeight: "40px"}}>
				{activeArtist && <Typography>{activeArtist} - {activeCount} songs in this playlist</Typography>}

			</Box>

		</Box>

	)



// bubbleChart creation function; instantiate new bubble chart given a DOM element to display it in and a dataset to visualise
function bubbleChart() {
	const width = 500;
	const height = 500;
  
	// location to centre the bubbles
	const centre = { x: width/2, y: height/2 };
  
	// strength to apply to the position forces
	const forceStrength = 2;
  
	// these will be set in createNodes and chart functions
	let svg = null;
	let bubbles = null;
	let labels = null;
	let nodes = [];
  
	// charge is dependent on size of the bubble, so bigger towards the middle
	function charge(d) {
	  return Math.pow(d.radius, 2.0) * 0.01
	}
  
	// create a force simulation and add forces to it
	const simulation = d3.forceSimulation()
		.force("x", d3.forceX(width / 2).strength(0.01))
		.force("y", d3.forceY(height / 2).strength(0.01))
		.force("cluster", forceCluster())
		.force('collision', d3.forceCollide().radius(d => d.radius + 1))
		.force('center', d3.forceCenter(centre.x, centre.y))
		.stop()
		// .tick(300)
	// simulation.reset()

  
	// set up colour scale
	// const fillColour = d3.scaleOrdinal()
	// 	.domain(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])
	// 	.range(["#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#AAAAAA"]);
  
	// data manipulation function takes raw data from csv and converts it into an array of node objects
	// each node will store data and visualisation values to draw a bubble
	// rawData is expected to be an array of data objects, read in d3.csv
	// function returns the new node array, with a node for each element in the rawData input
	function createNodes(rawData) {
		// console.log(rawData)


	  const maxSize = d3.max(Object.values(rawData), d => {
		return d
	  });
  
	  // size bubbles based on area
	  const radiusScale = d3.scaleSqrt()
		.domain([0, maxSize])
		.range([0, 36])
  
	  // use map() to convert raw data into node data
	  const myNodes = Object.entries(rawData).map(d => ({
		...d[1],
		radius: radiusScale(+d[1]),
		size: +d[1],
		x: Math.random() * 900,
		y: Math.random() * 800,
		id: d[0]
	  }))
  
	  return myNodes;
	}

	function forceCluster() {
		const strength = 0.2;
		let nodes;
	  
		function force(alpha) {
		  const centroids = d3.rollup(nodes, centroid, d => d.Bronx);
		  const l = alpha * strength;
		  for (const d of nodes) {
			const {x: cx, y: cy} = centroids.get(d.Bronx);
			d.vx -= (d.x - cx) * l;
			d.vy -= (d.y - cy) * l;
		  }
		}
	  
		force.initialize = _ => nodes = _;
	  
		return force;
	}
	function centroid(nodes) {
		let x = 0;
		let y = 0;
		let z = 0;
		for (const d of nodes) {
		  let k = d.radius ** 2;
		  x += d.x * k;
		  y += d.y * k;
		  z += k;
		}
		return {x: x / z, y: y / z};
	}

  
	// main entry point to bubble chart, returned by parent closure
	// prepares rawData for visualisation and adds an svg element to the provided selector and starts the visualisation process
	let chart = function chart(selector, rawData) {
	  // convert raw data into nodes data
	  nodes = createNodes(rawData);
  
	  // create svg element inside provided selector
	  svg = d3.select(selector)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
  
	  // bind nodes data to circle elements
	  const elements = svg.selectAll('.bubble')
		.data(nodes, d => d.artist)
		.enter()
		.append('g')
  
	  bubbles = elements
		.append('circle')
		.classed('bubble', true)
		.attr('r', d => d.radius)
		.attr('fill', "#0096FF")
		.on('mouseover', (d) => {
			d.target.classList.add('hoverColor')
			setActiveArtist(d.target.__data__.id)
			setActiveCount(d.target.__data__.size)
		})
		.on('mouseout', (d) => {
			d.target.classList.remove('hoverColor')
			setActiveArtist(null)
			setActiveCount(0)
		})
  
		// labels
		labels = elements
			.append('text')
			.attr('dy', '.3em')
			.style('text-anchor', 'middle')
			.style('font-size', 10)
			.style('fill', 'white')
			.text(d => d.size)

	  // set simulation's nodes to our newly created nodes array
	  // simulation starts running automatically once nodes are set
	  	simulation.nodes(nodes)
			.on('tick', ticked)
			.restart();
		}

		// callback function called after every tick of the force simulation
		// here we do the actual repositioning of the circles based on current x and y value of their bound node data
		// x and y values are modified by the force simulation
		function ticked() {
			bubbles
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)
	
		 	labels
				.attr('x', d => d.x)
				.attr('y', d => d.y)
		}

  	return chart;
}
  

  
  // function called once promise is resolved and data is loaded from csv
  // calls bubble chart function to display inside #vis div
function display(data) {
	// new bubble chart instance
	let myBubbleChart = bubbleChart();

	myBubbleChart('#artist-bubbles-container', data);
}




}

export default ArtistBubbles



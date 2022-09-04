import React, { useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import useResizeObserver from "../useResizeObserver";
import { useWindowSize } from "react-use";
import { select, geoPath, geoIdentity, geoCentroid, geoMercator } from "d3";
import { feature } from "topojson-client";
import data from "../maharashtra.json";

const Statevisualizer = () => {
  const params = useParams();
  const state = params.statename;
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    // console.log(height)
    // console.log(width)

    var districts = feature(data, data.objects.districts).features;
    console.log(districts);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    const svg = select(svgRef.current);
    const filteredDistricts = [];

    for (let i = 0; i < districts.length; i++) {
      if (districts[i].properties.st_nm === state) {
        filteredDistricts.push(districts[i]);
      }
    }

    // for(let i=0;i<state.length;i++){
    //   if(districts[i].properties.st_nm === state){
    //     filteredDistricts.push(districts[i]);
    //   }
    // }
    console.log(filteredDistricts);

    const projection = geoIdentity()
      .scale(3)
      // .fitSize([width, height], filteredDistricts)
      .translate([72.654608, 15.606125]);
    // .center([width/2, height/2])
    // .fitWidth(width, filteredDistricts)

    // creating the pathGenerator and passing the projection instance
    const path = geoPath().projection(projection);
    // const bound = pathGenerator.bounds(filteredDistricts[0]);

    //   var width  = 100;
    //   var height = 110;

    //

    //   // var svg =select("#vis").append("svg")
    //   //     .attr("width", width).attr("height", height)

    //   var center = geoCentroid(filteredDistricts[filteredDistricts.length-1])
    // var scale  = 50;
    // var offset = [width/2, height/2];
    // var projection = geoMercator().scale(scale).center(center)
    //     .translate(offset);

    // // create the path
    // var path = geoPath().projection(projection);

    // // using the path determine the bounds of the current map and use
    // // these to determine better values for the scale and translation
    // var bounds  = path.bounds(filteredDistricts[filteredDistricts.length-1]);
    // var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
    // var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
    // var scale   = (hscale < vscale) ? hscale : vscale;
    // var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
    //                   height - (bounds[0][1] + bounds[1][1])/2];

    // // new projection
    // projection = geoMercator().center(center)
    //   .scale(scale).translate(offset);
    // path = path.projection(projection);

    // svg.select(".state").selectAll("path").data(filteredDistricts).enter().append("path").attr("class" , "state");
    // svg.select(".state").selectAll('.border')
    //         .data(filteredDistricts)
    //         .enter()
    //         .append('path')
    //         .attr('class', 'border')
    //         .attr('d', (district) => pathGenerator(district))
    //         .attr('stroke-width', 1)
    //         .attr('stroke-opacity', 1)
    //         .attr('fill', 'rgba(246,251,255,0.1)')
    //         .attr('stroke', 'rgba(21, 7, 134,0.5)')
    //         .style('cursor', 'pointer')
    //         .attr('pointer-events', 'all')

    svg
      .select('.regions')
      .selectAll('path')
      .data(filteredDistricts)
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('d', path)
            .attr('stroke-width', 1.8)
            .attr('stroke-opacity', 0)
            .style('cursor', 'pointer')
           
            
            .attr('stroke', '#fff'),
        (update) => update,
        (exit) =>
          exit
            .attr('stroke', '#fff')
            
            .remove()
      )
      .attr('pointer-events', 'all')
      .on('click', (event, d) => {
        console.log(`State name : ${d.properties.st_nm}`);
      })
     
  }, [dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef} className = "svgDistrict">
        <g className="regions"></g>
      </svg>
    </div>
  );
};

export default Statevisualizer;

import React, { useEffect, useRef } from 'react';

//importing select, geoPath, geoIdentity from d3.js
import { select, geoPath, geoIdentity } from 'd3';
//importing styles
import './style.css';

import { useNavigate } from 'react-router-dom';
//importing the fucntionality which returns the responsive height and width of the wrapper
import useResizeObserver from '../useResizeObserver';
//importing the topoJSON data
import data from '../india-copy.json';
//importing feature from topojson client to convert topoJSON to geoJSON
import { feature, transform } from 'topojson-client';



//the functional component
const Mapvisualizer = () => {
    //refference to the svg item
    const navigate = useNavigate();

    // const  {update,state}= useContext(State);

    // console.log(useContext(State));
    const svgRef = useRef();

    
    
    //wrapperRef
    const wrapperRef = useRef();

    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        //passing the svgREF to d3.select
        const svg = select(svgRef.current);
        // getting the responsive height and width from useResizeObserver
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

        // console.log(width + " width");

        // const height = 0;
        // const width = 0;


        
        //configuring the districts data from data.json
        // var districts = feature(data, data.objects.districts).features;
        //configuring the states data from data.json
        var states = feature(data, data.objects.states).features;
        // console.log(states);

        //creating the projection instance
        const projection = geoIdentity()
            .scale(10)
            .translate([-600, 0]);

            // console.log(projection);

            
            
        // creating the pathGenerator and passing the projection instance
        const pathGenerator = geoPath().projection(projection);
        const bound  = pathGenerator.bounds(states[0])
        console.log(bound);
        

        //creating the .district elements in svg
        // svg.selectAll('.district')
        //     .data(districts)
        //     .enter()
        //     .append('path')
        //     .attr('class', 'district')
        //     .attr('d', (district) => pathGenerator(district))
        //     .attr('stroke-width', 0.3)
        //     .attr('stroke-opacity', 1)
        //     .attr('fill', 'rgb(246,251,255)')
        //     .attr('stroke', 'rgb(0,123,255)')
        //     .style('cursor', 'ponter')
        //     .attr('pointer-events', 'all')
            
            
            //creating the .state elements in the svg
            svg.select('.state')
                .selectAll(".paths")
                .data(states)
                .enter()
                .append('path')
                .attr('class', 'paths')
                .attr('d', (state) => pathGenerator(state))
                .attr('stroke-width', 1)
                // .attr('transform' , (feature) =>  `translate(${pathGenerator.centroid(feature)})`)             
                .attr('stroke-opacity', 1)
                .attr('fill', 'rgba(246,251,255,0.1)')
                .attr('stroke', 'rgba(21, 7, 134,0.5)')
                .style('cursor', 'pointer')
                .attr('pointer-events', 'all')
                .on('click', (e, d) => {
                    console.log(`State name : ${d.properties.st_nm}`);
                    // console.log(state)
                    // update(d);
                    // window.location.href = 'http://localhost:3000/state'
                    navigate(`/state/${d.properties.st_nm}`)
                });

                svg.attr("viewBox" , "0 0 532 588" ).attr("preserveAspectRatio" , "xMidYMid meet").attr("pointer-events"  , 'auto')
            
        // console.log(svg.selectAll(".state"));
    });

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem' , width : "100%" }} className="zoom">
            <svg ref={svgRef} >
                
                <g className="state" fill='red'></g>
                
            </svg>
        </div>
    );
};

export default Mapvisualizer;
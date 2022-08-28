import React, { useEffect, useRef,useState } from 'react';

//importing select, geoPath, geoIdentity from d3.js
import { select, geoPath, geoIdentity } from 'd3';
//importing styles
import './style.css';
//importing the fucntionality which returns the responsive height and width of the wrapper
import useResizeObserver from '../useResizeObserver';
//importing the topoJSON data
import data from '../india.json';
//importing feature from topojson client to convert topoJSON to geoJSON
import { feature } from 'topojson-client';


//the functional component
const Mapvisualizer = () => {
    //refference to the svg item
    const svgRef = useRef();

    const [state, setState] = useState(null); 
    // WILL be used to create routes
    
    //wrapperRef
    const wrapperRef = useRef();

    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        //passing the svgREF to d3.select
        const svg = select(svgRef.current);
        // getting the responsive height and width from useResizeObserver
        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

        //configuring the districts data from data.json
        var districts = feature(data, data.objects.districts).features;
        //configuring the states data from data.json
        var states = feature(data, data.objects.states).features;
        // console.log(states);

        //creating the projection instance
        const projection = geoIdentity()
            .scale(20)
            .translate([-width/1.8, -height / 6]);
            
        // creating the pathGenerator and passing the projection instance
        const pathGenerator = geoPath().projection(projection);
        

        //creating the .district elements in svg
        svg.selectAll('.district')
            .data(districts)
            .enter()
            .append('path')
            .attr('class', 'district')
            .attr('d', (district) => pathGenerator(district))
            .attr('stroke-width', 0.3)
            .attr('stroke-opacity', 1)
            .attr('fill', 'rgb(246,251,255)')
            .attr('stroke', 'rgb(0,123,255)')
            .style('cursor', 'ponter')
            .attr('pointer-events', 'all')
            
            
            //creating the .state elements in the svg
            svg.selectAll('.state')
                .data(states)
                .enter()
                .append('path')
                .attr('class', 'state')
                .attr('d', (state) => pathGenerator(state))
                .attr('stroke-width', 1)
                .attr('stroke-opacity', 1)
                .attr('fill', 'rgba(246,251,255,0.1)')
                .attr('stroke', 'rgba(21, 7, 134,0.5)')
                .style('cursor', 'ponter')
                .attr('pointer-events', 'all')
                .on('click', (e, d) => {
                    console.log(`State name : ${d.properties.st_nm}`);
                    
                });
            
        // console.log(svg.selectAll(".state"));
    });

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
            <svg ref={svgRef} >
                
                <g className="state"></g>
                
            </svg>
        </div>
    );
};

export default Mapvisualizer;

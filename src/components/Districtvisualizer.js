import React, { useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import useResizeObserver from '../useResizeObserver';
import {useWindowSize} from 'react-use';
import { select, geoPath, geoIdentity } from 'd3';
import { feature } from 'topojson-client';

import data from '../maharashtra.json';

const Statevisualizer = () => {
    const params = useParams();
    const state = params.statename;
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);


    useEffect(() => {
        const svg = select(svgRef.current);
        // console.log(height)
        // console.log(width)

          var districts = feature(data, data.objects.districts).features;
          const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

          const filteredDistricts = [];

          for(let i=0;i<districts.length;i++){
            if(districts[i].properties.st_nm === state){
              filteredDistricts.push(districts[i]);
            }
          }
          console.log(filteredDistricts);


        const projection = geoIdentity()
        .scale(30)
        .translate([-2000, 0]);
            // .center([width/2, height/2])
            // .fitWidth(width, filteredDistricts)

        // creating the pathGenerator and passing the projection instance
        const pathGenerator = geoPath(geoIdentity())




        // svg.selectAll('.border')
        //         .data(filteredDistricts)
        //         .enter()
        //         .append('path')
        //         .attr('class', 'border')
        //         .attr('d', (district) => pathGenerator(district))
        //         .attr('stroke-width', 1)
        //         .attr('stroke-opacity', 1)
        //         .attr('fill', 'rgba(246,251,255,0.1)')
        //         .attr('stroke', 'rgba(21, 7, 134,0.5)')
        //         .style('cursor', 'ponter')
        //         .attr('pointer-events', 'all')

        svg.select('.region')
        .selectAll(".paths")
        .data(filteredDistricts)
        .enter()
        .append('path')
        .attr('class', 'paths')
        .attr('d', (district) => pathGenerator(district))
        .attr('stroke-width', 1)
        // .attr('transform' , (feature) =>  `translate(${pathGenerator.centroid(feature)})`)             
        .attr('stroke-opacity', 1)
        .attr('fill', 'rgba(246,251,255,0.1)')
        .attr('stroke', 'rgba(21, 7, 134,0.5)')
        .style('cursor', 'pointer')
        .attr('pointer-events', 'all')
       

                svg.attr("viewBox" , "0 0 432 488" ).attr("preserveAspectRatio" , "xMidYMid meet").attr("pointer-events"  , 'auto')

                
    },[dimensions]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }} >
            <svg ref={svgRef} >
                <g className="region"></g>
            </svg>
        </div>
    );
};

export default Statevisualizer;
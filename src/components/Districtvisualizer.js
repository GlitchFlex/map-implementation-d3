import React, { useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import useResizeObserver from '../useResizeObserver';
import {useWindowSize} from 'react-use';
import { select, geoPath, geoIdentity } from 'd3';
import { feature } from 'topojson-client';

import data from '../india.json';

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
            .scale(20)
            // .fitSize([width, height], filteredDistricts)
            .translate([-width/1.8, -height / 6])
            // .center([width/2, height/2])
            // .fitWidth(width, filteredDistricts)

        // creating the pathGenerator and passing the projection instance
        const pathGenerator = geoPath().projection(projection);




        svg.selectAll('.border')
                .data(filteredDistricts)
                .enter()
                .append('path')
                .attr('class', 'border')
                .attr('d', (district) => pathGenerator(district))
                .attr('stroke-width', 1)
                .attr('stroke-opacity', 1)
                .attr('fill', 'rgba(246,251,255,0.1)')
                .attr('stroke', 'rgba(21, 7, 134,0.5)')
                .style('cursor', 'ponter')
                .attr('pointer-events', 'all')
                
    },[dimensions]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }} >
            <svg ref={svgRef} >
                <g className="state"></g>
            </svg>
        </div>
    );
};

export default Statevisualizer;

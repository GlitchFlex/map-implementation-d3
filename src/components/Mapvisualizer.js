import React, { useEffect, useRef } from 'react';
import { select, geoPath, geoMercator,geoIdentity } from 'd3';
import './style.css'
import useResizeObserver from '../useResizeObserver';
import data from '../india.json';
import {feature, mesh} from 'topojson-client'

const Mapvisualizer = () => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();

        
        var states = feature(data, data.objects.districts).features;
        console.log(states);
        const projection = geoIdentity().translate([width/2,height/2]).scale(100);
    

        const pathGenerator = geoPath().projection(projection);

        svg.selectAll('.state').data(states).enter().append("path").attr("class","state").attr("d", state => pathGenerator(state)).attr('stroke-width', 5)
        .attr('stroke-opacity', 1).attr('fill', '#000')
        .attr('stroke', '#000');
        
    });

    return (
        <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
            <svg ref={svgRef}>
            </svg>
            
        </div>
    );
};

export default Mapvisualizer;

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import "./Widget.css"
import { useCards } from '../App';

export default function ColorStats() {
    const { cardsVault, deck, rerender } = useCards();

    const [colors, setColors] = useState([]);
    const svgRef = useRef();

    useEffect(() => {
        const colors = {
            'W': 0,
            'U': 0,
            'B': 0,
            'R': 0,
            'G': 0,
            'CL': 0,
        };

        for (var id in deck) {
            const count = deck[id].count
            const card = cardsVault[id]
            if (!card.colorIdentity || card.colorIdentity.length == 0) {
                colors['CL'] += count;
                continue;
            }
            for (const color of card.colorIdentity) {
                colors[color] += count;
            }
        }

        const data = [];
        for (const color in colors) {
            data.push({ color: color, count: colors[color] });
        }

        setColors(data);
    }, [rerender]);

    useEffect(() => {
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        d3.select(svgRef.current).selectAll("*").remove();

        const color = d3.scaleOrdinal()
            .domain(colors.map(d => d.color))
            .range(['#F0E68C', '#4682B4', '#000000', '#B22222', '#228B22', '#A9A9A9']);

        const pie = d3.pie()
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const arcs = svg.selectAll("arc")
            .data(pie(colors))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.color));
    }, [colors]);

    return (
        <div className='ColorStats' ref={svgRef}>
        </div>
    );
}
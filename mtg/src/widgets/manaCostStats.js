import * as d3 from "d3";
class ManaCostStats {
    constructor() {
    }

    getManaCost(deckMap, cards){
        const manaCosts = {};

        for (var id in deckMap) {
            const count = deckMap[id].count
            const card = cards[id]
            if (count == 0)
                continue
            if (!Number.isInteger(card.cmc)){
                continue;
            }
            if (card.cmc < 7){
                if (!manaCosts[card.cmc]){
                    manaCosts[card.cmc] = count;
                } else {
                    manaCosts[card.cmc] += count;
                }
            } else {
                if (!manaCosts['7+']){
                    manaCosts['7+'] = count;
                } else {
                    manaCosts['7+'] += count;
                }
            }
        }

        const data = [];
        for (const manaCost in manaCosts){
            data.push({cost: manaCost, count: manaCosts[manaCost]});
        }
        return data;
    }

    buildStats(element, deckMap, cards){
        const data = this.getManaCost(deckMap, cards)

        // const data = [
        //     { cost: 0, count: 2 },
        //     { cost: 1, count: 8 },
        //     { cost: 2, count: 12 },
        //     { cost: 3, count: 15 },
        //     { cost: 4, count: 10 },
        //     { cost: 5, count: 6 },
        //     { cost: 6, count: 4 },
        //     { cost: '7+', count: 3 }
        // ];

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        element.innerHTML = ''


        const svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.cost))
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.cost))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.count))
            .attr("fill", "#69b3a2");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .text("MTG Deck Mana Cost Distribution");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Number of Cards");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Mana Cost");
    }
}
export {ManaCostStats};
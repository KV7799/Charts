const indianPopulationData = [
    { state: "Andhra Pradesh", population: 53903393 },
    { state: "Arunachal Pradesh", population: 1570458 },
    { state: "Assam", population: 35607039 },
    { state: "Bihar", population: 124799926 },
    { state: "Chhattisgarh", population: 29436231 },
    { state: "Goa", population: 1542733 },
    { state: "Gujarat", population: 63872399 },
    { state: "Haryana", population: 28204692 },
    { state: "Himachal Pradesh", population: 7451955 },
    { state: "Jharkhand", population: 38593948 },
    { state: "Karnataka", population: 67562686 },
    { state: "Kerala", population: 35699443 },
    { state: "Madhya Pradesh", population: 85358965 },
    { state: "Maharashtra", population: 123144223 },
    { state: "Manipur", population: 3091545 },
    { state: "Meghalaya", population: 3366710 },
    { state: "Mizoram", population: 1239244 },
    { state: "Nagaland", population: 2249695 },
    { state: "Odisha", population: 46356334 },
    { state: "Punjab", population: 30141373 },
    { state: "Rajasthan", population: 81032689 },
    { state: "Sikkim", population: 689577 },
    { state: "Tamil Nadu", population: 77841267 },
    { state: "Telangana", population: 39362732 },
    { state: "Tripura", population: 4169794 },
    { state: "Uttar Pradesh", population: 237882725 },
    { state: "Uttarakhand", population: 11250858 },
    { state: "West Bengal", population: 99609303 }
];

const width = 1000;
const height = 1000;
const radius = Math.min(width, height) / 2 - 10;

// Color scale
const color = d3.scaleOrdinal()
    .domain(indianPopulationData.map(d => d.state))
    .range(d3.schemeCategory10);

// Arc generator
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Pie layout
const pie = d3.pie()
    .sort(null)
    .value(d => d.population);

const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .style("background-color" , "red")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);


// Create arcs
const arcs = pie(indianPopulationData);

svg.selectAll("path")
    .data(arcs)
    .enter().append("path")
    .attr("fill", d => color(d.data.state))
    .attr("d", arc)
    .append("title")
    .text(d => `${d.data.state}: ${d.data.population.toLocaleString()}`);


svg.selectAll("text")
    .data(arcs)
    .enter().append("text")
    .attr("transform", d => {
        const pos = arc.centroid(d);
        // const midAngle = (d.startAngle + d.endAngle) / 2;
        // pos[0] = radius * 0.7 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
    })
    .attr("dy", "0.35em")
    .attr("text-anchor", d => (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end")
    .text(d => d.data.population.toLocaleString())
    .style("fill", "white")
    .style("font-size", "12px");

const legend = svg.selectAll(".legend")
    .data(indianPopulationData)
    .enter().append("g")
    .attr("class", "legend")
    // .attr("fill", d => color(d.state))

    .attr("transform", (d, i) => `translate(-150,${i * 20})`);

legend.append("rect")
    .attr("x", width / 1.6)
    .attr("width", 18)
    .attr("height", 18)
    .attr("y", -350)
    .attr("fill", d => color(d.state));

legend.append("text")
    .attr("x", 620)
    .attr("y", -343)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(d => d.state);
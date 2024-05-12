const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2023-12-31&end=2024-05-08';

document.addEventListener("DOMContentLoaded" , function(event) {
    fetch(api)
    .then (function(response) {return response.json();})
    .then(function(data){
        var parsedData = parseData(data);
        drawChart(parsedData);
    })
     .catch(function(err) {console.log(err)})
})


// Parse data into key value pairs

function parseData(data){
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i),
            price : +data.bpi[i] //convert string to number
        });
    }
     return arr;
}

function  drawChart(data){
            
     // Set up the dimensions for the chart
     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 1000 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Create an SVG element
        const svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Set up scales
        const x = d3.scaleBand()
            .domain(data.map(d => d.date))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.price)])
            .nice()
            .range([height, 0]);

        // Define the area generator
        const area = d3.area()
            .x(d => x(d.date) )
            .y0(height)
            .y1(d => y(d.price));

        // Add the area path
        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        // Add the x axis
        svg.append("g")
         .attr("transform", `translate(0,${height})`)
         .call(d3.axisBottom(x)
         .tickValues(data.map(d => d.date).filter((d, i) => i % 7 === 0)) // Show every 7th date
         .tickFormat(d3.timeFormat("%m-%d")) // Format the tick labels as desired
    );


        // Add the y axis
        svg.append("g")
            .call(d3.axisLeft(y));
}

//canvas1, bar-chart
export function barChart(data) {
    const margin = { top: 10, right: 10, bottom: 250, left: 90 },
        width = 500 - margin.right - margin.left,
        height = 700 - margin.top - margin.bottom,
        barPadding = 0.5,
        barWidth = width / data.length;

    const barColors = d3.scaleOrdinal(d3.schemePastel2);
    // //canvas1 for bar-chart, svg2
    const canvas1 = d3.select('.barWrap')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'canvas1');
    // .append('g')
    // .attr('transform', 'translate(' + margin2.left + ',' + margin2.right + ')');
    const xScale = d3.scaleLinear()
        .rangeRound([0, width])
        .domain([0, data.length]);
    // .attr("class", "xAxisBar")
    // .attr("transform", "translate(0," + height + ")")

    const xAxisScale = d3.scaleBand()
        .domain(data.map(d => d.GEO))
        .rangeRound([0, width]);
        // .domain([0, data.length])
        // .padding(0.5);
        // .padding(0);
    // .attr('class', 'xAxis');
    // .range([0, width])

    // .tickValues((d) => d.GEO);

    const xAxis = d3.axisBottom()
        .scale(xAxisScale)
        .ticks(1);
    // .attr('padding', '1rem');
    // .style('font-size', '2rem');
    // .ticks(10, "%");


    const yScale = d3.scaleSqrt()
        .domain([0, 1700000])
        .range([0, height]);

    const yAxisScale = d3.scaleSqrt()
        .domain([1700000, 0])
        .range([0, height]);

    const yAxis = d3.axisLeft()
        .scale(yAxisScale);

    //draw the bars
    canvas1.selectAll('rect')
        .attr('class', 'barGroup')
        .data(data)
        .enter()
        .append('rect')
        .attr('transform', 'translate(80, 0)')
        .attr('x', (d, i) => barWidth * i)
        .attr('y', d => height - yScale(parseInt(d.VALUE)) + 20)
        .on("mouseover", onMouseOver) // listener for the mouseover event
        .on("mouseout", onMouseOut) // listener for the mouseleave event
        .attr('width', barWidth - barPadding)
        .attr('height', d => yScale(parseInt(d.VALUE)))
        .style('fill', (d, i) => { return barColors(parseInt(d.VALUE)) });

    //labels specific VALUE for each data
    const labels = canvas1.selectAll('text')
        .data(data)
        .enter()
        .append('g')
        .append('text')
        .text(d => parseInt(d.VALUE))
        .attr('y', d => height - yScale(parseInt(d.VALUE)) + 15)
        .on("mouseover", onMouseOver) // listener for the mouseover event
        .on("mouseout", onMouseOut) // listener for the mouseleave event
        .attr("transform", " rotate(0)")
        .style('text-anchor', 'middle')
        .attr('x', (d, i) => (106 + barWidth * i))
        .attr('fill', 'darkgray');

    //appending xAxis
    canvas1.append('g')
        .attr('class', 'x_axis')
        .attr('transform', 'translate( 80, 460)')
        .call(xAxis)
        .selectAll('text')
        .attr('class', 'barAxisText')
        .attr('transform', 'rotate(90)')
        .style('text-anchor', 'start');

    // appending yAxis
    canvas1.append('g')
        .attr('class', 'y_axis')
        .attr('transform', 'translate(80, 20)')
        .call(yAxis);
}

let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function onMouseOver(d, i) {
    d3.select(this).transition()
        .duration(0)
        .style('opacity', '0.5');
    div.transition()
        .duration(0)
        .style("opacity", 0.9);
    div.html(d.GEO + " in " + d.REF_DATE + "<br/>" + "tourists from overseas: " +  d.VALUE + " persons")
        .style("left", (d3.event.pageX - 50) + "px")
        .style("top", (d3.event.pageY - 100) + "px")
}

//mouseout event handler function
function onMouseOut(d, i) {
    d3.select(this).transition()
        .duration(0)
        .style('opacity', '1');
    // d3.select(this).attr('class', 'bar');
    // d3.select(this)
    //     .transition()     // adds animation
    //     .duration(400)
    //     .attr('width', x.bandwidth())
    //     .attr("y", function (d) { return y(d.value); })
    //     .attr("height", function (d) { return height - y(d.value); });

    d3.selectAll('div.tooltip')
        .style('opacity', 0);
}



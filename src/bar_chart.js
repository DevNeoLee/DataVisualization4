
//draw bar-chart from the data input
export function barChart(data) {
    const margin = { top: 10, right: 10, bottom: 250, left: 90 },
        width = 500 - margin.right - margin.left,
        height = 700 - margin.top - margin.bottom,
        barPadding = 1,
        barWidth = width / data.length;

    const barColors = d3.scaleThreshold()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        // .range(["#aff05b", "#52f667", "#1ddfa3", "#23abd8", "#4c6edb", "#fe4b83", "#ff7847", "#e2b72f"]);
        .range(["#4a58dd", "#2f9df5", "#27d7c4", "#4df884", "#95fb51", "#dedd32", "#ffa423", "#f65f18", "#ba2208", "#900c00", "#bf3caf", "#fe4b83"]);
    // ["#6e40aa", "#963db3", "#bf3caf", "#e4419d", "#fe4b83", "#ff5e63", "#ff7847", "#fb9633", "#e2b72f", "#c6d63c", "#aff05b"]
    const canvas1 = d3.select('.barWrap')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'canvas1');

    const xScale = d3.scaleLinear()
        .rangeRound([0, width])
        .domain([0, data.length]);
  
    const xAxisScale = d3.scaleBand()
        .domain(data.map(d => d.GEO))
        .rangeRound([0, width]);

    const xAxis = d3.axisBottom()
        .scale(xAxisScale);

    const yScale = d3.scaleSqrt()
        .domain([0, 1700000]) // record high number of visitors, hard code here if there is new high! 
        .range([0, height]);

    const yAxisScale = d3.scaleSqrt()
        .domain([1700000, 0]) // record high number of visitors, hard code here if there is new high!
        .range([0, height]);

    const yAxis = d3.axisLeft()
        .scale(yAxisScale);

    //draw bars
    const bars = canvas1.selectAll('rect')
        .attr('class', 'barGroup')
        .data(data)
        .enter()
        .append('g')
        .append('rect')
        .attr('class', 'bar')
        .attr('transform', 'translate(80, 0)')
        .attr('width', barWidth )
        .attr('x', (d, i) => barWidth * i)
        // .style('fill', (d, i) => { return barColors(parseInt(d.VALUE)) })
        .style('fill', (d, i) => { return barColors(i)})
        .attr("y", d => { return height + 20})
        .attr("height", '0')
        .transition()//animation effect
        .duration(350)
        .delay(function (d, i) { return i * 30; })
        .attr('y', d => height - yScale(parseInt(d.VALUE)) + 20)
        .attr('height', d => yScale(parseInt(d.VALUE)));

        d3.selectAll('.bar') //listener for mouseover, mouseout on bars
            .data(data)
            .on("mouseover", onMouseOver) 
            .on("mouseout", onMouseOut); 

    //label visitor numbers
    const labels = canvas1.selectAll('text')
        .data(data)
        .enter()
        .append('g')
        .append('text')
        .attr('class', 'label')
        .text(d => parseInt(d.VALUE))
        .attr("y", d => { return height - 500; })
        .attr("height", 0)
        .transition()//animation effect
        .duration(250)
        .delay(function (d, i) {
            return i * 30;
        })
        .attr('y', d => height - yScale(parseInt(d.VALUE)) + 15)
        .attr("transform", " rotate(0)")
        .style('text-anchor', 'middle')
        .attr('x', (d, i) => (106 + barWidth * i))
        .attr('fill', 'darkgray');

    //append xAxis
    canvas1.append('g')
        .attr('class', 'x_axis')
        .attr('transform', 'translate( 80, 460)')
        .call(xAxis)
        .selectAll('text')
        .attr('class', 'barAxisText')
        .attr('transform', 'rotate(90)')
        .style('text-anchor', 'start');

    // append yAxis
    canvas1.append('g')
        .attr('class', 'y_axis')
        .attr('transform', 'translate(80, 20)')
        .call(yAxis);
}

const div = d3.select("body").append("div") //tooptip initial container
    .attr("class", "tooltip")
    .style("opacity", 0);

//mouseover event to bar chart
function onMouseOver(d, i) {
    d3.select(this).transition()
        .duration(0)
        .style('opacity', '0.5');

    div.transition()
        .duration(0)
        .style("opacity", 1);

    div.html(d.GEO + " on " + d.REF_DATE + "<br/>" + "tourists from overseas: " +  d.VALUE + " persons")
        .style("left", (d3.event.pageX - 50) + "px")
        .style("top", (d3.event.pageY - 100) + "px");
}

//mouseout event to bar chart
function onMouseOut(d, i) {
    d3.select(this).transition()
        .duration(0)
        .style('opacity', '1');

    d3.selectAll('div.tooltip')
        .style('opacity', 0);
}



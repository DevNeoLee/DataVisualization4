//draw pieChart with the monthly data set
export function pieChart(data, totalVisitor){
    
    //draw canvas 
    const canvas3 = d3.select(".pieWrap")
            .append('svg')
            .attr('width', 345)
            .attr('height',220)
            .attr('class', 'canvas3')
            .append('g')
            .attr('transform', "translate(230, 108)");

    //variable for pie
    const color = d3.scaleOrdinal(d3.schemePastel2),
          radius = 100;

    const pieTooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //generate pie
    const pie = d3.pie()
        .value(d => +d.VALUE);

    //generate arcs
    const arc = d3.arc()
        .innerRadius(35)
        .outerRadius(radius);
    const arcLarge = d3.arc()
        .innerRadius(30)
        .outerRadius(110);     

    //generate arcs
    const arcs = canvas3.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");
        
    //draw arc path
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) { return color(i); })
        .on("mouseover", function (d) {
                d3.select(this).transition()
                    .duration(0)
                    .attr("d", arcLarge)
                    .style('opacity', '0.5')
                pieTooltip.transition()
                    .duration(0)
                    .style("opacity", '0.9');
            pieTooltip.html(d.data.GEO + " in " + d.data.REF_DATE + "<br/>" + "tourists from overseas: " + d.data.VALUE + " persons" + "<br/>" + Math.round(d.data.VALUE / totalVisitor * 100) + "%")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 100) + "px")
            })
        .on("mouseout", function (d) {
            d3.select(this).transition()
                .duration(0)
                .attr("d", arc)
                .style('opacity', '1.0');
            pieTooltip.transition()
                .duration(0)
                .style("opacity", 0);
        });

    arcs.append('text')
        .attr('transform', function (d) {
            var c = arc.centroid(d);
            return "translate(" + c[0] + "," + c[1] + ")"; 
        })
        .text(function (d) { return Math.round(d.data.VALUE / totalVisitor * 100) + "%"; });
}

//mouseout event handler function
function onMouseOut(d) {
    d3.selectAll('div.tooltip')
        .style('opacity', 0);
}


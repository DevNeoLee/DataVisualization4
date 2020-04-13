
export function pieChart(data){

    const canvas3 = d3.select(".pieWrap")
            .append('svg')
            .attr('width', 345)
            .attr('height',220)
            .attr('class', 'canvas3');

     const radius = 100;

     const g = canvas3.append("g").attr("transform", "translate(230, 108)");

    const color = d3.scaleOrdinal(d3.schemePastel2);

    // Generate the pie
    const pie = d3.pie().value(d => +d.VALUE);

    // Generate the arcs
    const arc = d3.arc()
        .innerRadius(35)
        .outerRadius(radius);

    //Generate groups
    const arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");
        
    const arcOver = d3.arc()
        .innerRadius(30)
        .outerRadius(110);     
    
    const pieTooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //Draw arc paths
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) { return color(i); })
        .on("mouseover", function (d) {
                d3.select(this).transition()
                    .duration(0)
                    .attr("d", arcOver)
                    .style('opacity', '0.8')

                pieTooltip.transition()
                    .duration(0)
                    .style("opacity", '0.7');
                pieTooltip.html(d.data.GEO + " in " + d.data.REF_DATE + "<br/>" + "tourists from overseas: " + d.data.VALUE + " persons")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 100) + "px")
            })
        .on("mouseout", function (d) {
            d3.select(this).transition()
                .duration(0)
                .attr("d", d3.arc().innerRadius(35).outerRadius(100))
                .style('opacity', '1.0');
            pieTooltip.transition()
                .duration(0)
                .style("opacity", 0);
        });

    // arcs.append('text')
    //     .attr('transform', function (d) {
    //         var c = arc.centroid(d);
    //         return "translate(" + c[0] + "," + c[1] + ")"; 
    //     })
    //     .text(function (d) { return d.data.GEO; });

    // const labels = canvas3.selectAll('pie')
    //     .data(data)
  
    //     .append('text')
    //     .text(d => parseInt(d.VALUE))
    //     // .attr('transform', function (d) {
    //     //     var c = arc.centroid(d);
    //     //     console.log(c);
    //     //     return "translate(" + c[0] + "," + c[1] + ")";
    //     // })
    //     .attr('fill', 'darkgray');
    
}

//mouseout event handler function
function onMouseOut(d) {
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


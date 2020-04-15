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
    const color = d3.scaleThreshold()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .range(["#4a58dd", "#2f9df5", "#27d7c4", "#4df884", "#95fb51", "#dedd32", "#ffa423", "#f65f18", "#ba2208", "#900c00", "#bf3caf", "#fe4b83"]);
        
    const radius = 100;

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
        
    //draw arcs
    //add animation effect of path
    const pieces = arcs
        .append('g')
        .append('path')
        .attr('class', 'piece')
        .attr('d', arc)
        .attr("fill", function (d, i) { return color(i); })
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .attrTween('d', pieTween);

    //listen actions of mouseover, mouseout
    d3.selectAll('.piece') //listener for mouseover, mouseout on bars
        .on("mouseover", onMouseover)
        .on("mouseout", onMouseout); 

    //add text of percentile of province visitors
    const text = arcs
        .append('g')
        .append('text')
        .transition()
        .ease(d3.easeLinear)
        .duration(350)
        .attr('transform', function (d) {
            var c = arc.centroid(d);
            return "translate(" + (c[0]-14) + "," + c[1] + ")";
        })
        .text(function (d) { //only show distint value of province 
            const percentage = Math.round(d.data.VALUE / totalVisitor * 100);

            return percentage > 3 ? (percentage + "%") : null;
        })
        .attr('class', 'text');

    //add actionListener to text on centroid
    d3.selectAll('text')
        .on("mouseover", onMouseover)
        .on("mouseout", onMouseout); 

    //mouseover event handler function
    function onMouseover(d) {
        d3.select(this).transition()
            .duration(0)
            .attr("d", arcLarge)
            .style('opacity', '0.5')
        pieTooltip.transition()
            .duration(0)
            .style("opacity", '0.9');
        pieTooltip.html(d.data.GEO + " on " + d.data.REF_DATE + "<br/>" + 
                                    "tourists from overseas: " + d.data.VALUE + " persons" + 
                                    "<br/>" + Math.round(d.data.VALUE / totalVisitor * 100) + "%")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 100) + "px")
    }

    //mouseout event handler function
    function onMouseout(d) {
        d3.select(this).transition()
            .duration(0)
            .attr("d", arc)
            .style('opacity', '1.0');
        pieTooltip.transition()
            .duration(0)
            .style("opacity", 0);
    }

    //pieTween animation arc function
   function pieTween(b) {
        b.innerRadius = 0;
        const inter = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function(t) { return arc(inter(t));};
   }
}
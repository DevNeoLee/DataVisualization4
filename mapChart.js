
export function mapChart(data) {
    data.push({ REF_DATE: data[0].REF_DATE, GEO: "Northwest Territories", VALUE: "0" }); // adding missing data for 'Northwest Territories" to the data array
    const dataSorted = [data[1], data[2], data[10], data[11], data[7], data[9], data[4], data[0], data[5], data[12], data[3], data[8], data[6]];
    //canvas2 for map of canada chart, svg2
    const canvas2 = d3.select('.mapWrap')
        .append('svg')
        .attr('width', '750')
        .attr('height', '500')
        .attr('class', 'map-chart');

    //define yScale
    const yScale = d3.scaleSqrt()
        .domain([140000, 0])
        .range([0, 500]);
    //define colorScale
    const colorScale = d3.scaleSqrt()
        .domain([0, 1400000])
        //  .range(["#a6cee3", "#b15928"]);
        .range(d3.schemePastel2);

    // drawing canadian map from topojson data from statistics canada
    d3.json("data/canadaProvinces.json", (d => {
        const provinces = canvas2.selectAll('g')
            .data(d.features)
            .enter()
            .append('g')
            .attr('class', 'provinces');

        const projection = d3.geoMercator()
            .scale([420])
            .translate([1060, 840]);

        const path = d3.geoPath()
            .projection(projection);

        const province = provinces.append("path")
            .attr('d', path)
            .attr('class', 'province')
            // .attr("class", function (data) { return "province" + data.id; })
            .attr('fill', 'white');

        d3.selectAll('.province')
            .data(dataSorted)
            .style("fill", function (d) { return colorScale(parseInt(d.VALUE)) })
            .on("mouseover", onMouseOver) // listener for the mouseover event
            .on("mouseout", onMouseOut); // listener for the mouseleave event
        // .append('title')
        // .text((data) => { return data.properties.PRENAME; });

        //map-chart event listener for 'mouseover' 
        // document.querySelectorAll('.province').forEach(province => {
        //     province.addEventListener('mouseover', (e) => {
        //         let tooltip = document.querySelector('.tooltip');
        //         let x = e.pageX;     // Get the horizontal coordinate
        //         let y = e.pageY;
        //         tooltip.style.left = x + 20 + "px";
        //         tooltip.style.top = y + 20 + "px";
        //         tooltip.innerText = "# of Visitors: " + this.VALUE;
        //         // tooltip.style.opacity = 1;
        //         // console.log(data.features.);
        //         // const message = `this province had: ${data.features.PRENAME}`;  
        //     })
        // });

        //map-chart event listner for 'mouseleave'
        // document.querySelectorAll('.province').forEach(province => {
        //     province.addEventListener('mouseleave', (e) => {
        //         let tooltip = document.querySelector('.tooltip');
        //         // tooltip.style.opacity = 1;
        //         tooltip.innerText = "";
        //         // const message = `this province had: ${data.features.PRENAME}`;
        //     })
        // });
        // //map-chart province name display
        // provinces.append('text')
        //     .attr('x', (data) => { return path.centroid(data)[0]; })
        //     .attr('y', (data) => { return path.centroid(data)[1]; })
        //     .attr('text-anchor', 'left')
        //     .style('font-size', '1rem')
        //     .text((data) => { return data.properties.PRENAME + data.id; });
        // // data.id
    }));
   

   
   
    // coloring the province accoring to the visitor numbers  
    // const numList = reVisitorList.map(d => parseInt(d[2]));
 
    // d3.selectAll('.province')
    //     .data(data)
    //     .style("fill", function (d) { return colorScale(parseInt(d.VALUE)) });
    // define axis
    const yAxis = d3.axisRight()
        .scale(yScale);

    // append group and insert axis
    // canvas2
    //     .append('g')
    //     .attr('transform', 'translate(700, 50)')
    //     .append(yAxis);
}
let mapTooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function onMouseOver(d, i) {
    mapTooltip.transition()
        .duration(0)
        .style("opacity", 0.9);
    mapTooltip.html(d.GEO + " in " + d.REF_DATE + "<br/>" + "tourists from overseas: " + d.VALUE + " persons")
        .style("left", (d3.event.pageX - 100) + "px")
        .style("top", (d3.event.pageY - 120) + "px")
    // .attr('width', x.bandwidth() + 5)
    // .attr("y", function (d) { return y(d.value) - 10; })
    // .attr("height", function (d) { return height - y(d.value) + 10; });

    // g.append("text")
    //     .attr('class', 'val')
    //     .attr('x', function () {
    //         return x(d.year);
    //     })
    //     .attr('y', function () {
    //         return y(d.value) - 15;
    //     })
    //     .text(function () {
    //         return ['$' + d.value];  // Value of the text
    //     });
}

//mouseout event handler function
function onMouseOut(d, i) {
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

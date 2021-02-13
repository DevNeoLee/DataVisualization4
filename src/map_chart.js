
//draw map_chart with monthly data in
//draw cities with long lat infos from csv file
export function mapChart(data) {
     
    data.push({ REF_DATE: data[0].REF_DATE, GEO: "Northwest Territories", VALUE: "0" }); 
     
    const dataSorted = [data[9], data[4], data[11], data[1], data[7], data[10], data[6], data[5], data[3], data[12], data[8], data[0], data[2]];
  
    const margin = { top: 62, left: 30, right: 50, bottom: 50},
        height = 505 - margin.top - margin.bottom,
        width = 670 - margin.left - margin.right;

    const canvas2 = d3.select('.mapWrap')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'map')
        .append('g')
        .attr('transform', 'translate('+ margin.left + "," + margin.top + ")");

    const visitorFormat = [0, 500, 5000, 10000, 50000, 100000, 300000, 700000, 1000000, 1300000, 1700000]; //custom visitors amounts

    const colorScale = d3.scaleThreshold()
        .domain(visitorFormat)
        .range(["#ffffff", "#f7fbff", "#e3eef9", "#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"]);
       
    //convert globe project to 2d-map project
    const projection = d3.geoMercator()
        .scale([410])
        .translate([980, 770]);

    const canvas2b = d3.select('.mapWrap')
        .append('svg')
        .attr('width', '130')
        .attr('height', '505')
        .attr('class', 'legend2');

    const squareSize = 25;
    canvas2b.selectAll('square')
        .append('g')
        .attr('class', 'square')
        .data(visitorFormat)
        .enter()
        .append("rect")
        .attr("x", 3)
        .attr("y", function (d, i) { return 115 + i * (squareSize + 1) })
        .attr("width", squareSize)
        .attr("height", squareSize)
        .style("fill", function (d) { return colorScale(d) });

    canvas2b.selectAll('.square')
        .data(visitorFormat)
        .enter()
        .append('text')
        .attr('class', 'axisText')
        .attr("x", 32)
        .attr("y", function (d, i) { return 137 + i * (squareSize + 1) })
        .text(d => {
            if (d !== 0) { return "~ " + d }
            else return d
        });

    canvas2b.selectAll('.square')
        .attr('transform', 'translate(200,200');

    canvas2b.append('text')
        .attr('class', 'axisText')
        .attr('x', 5)
        .attr('y', 95)
        .text('person')

    //legend small screen
    const canvas2a = d3.select('.mapWrap')
        .append('svg')
        .attr('width', '600')
        .attr('height', '140')
        .attr('class', 'legend1');

    canvas2a.selectAll('square1')
        .append('g')
        .attr('class', 'square1')
        .data(visitorFormat)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { return i * (squareSize * 1.5 + 1) + 5 })
        .attr("y", 20)
        .attr("width", squareSize *1.5)
        .attr("height", squareSize)
        .style("fill", function (d) { return colorScale(d) });

    canvas2a.selectAll('.square1')
        .data(visitorFormat)
        .enter()
        .append('g')
        .append('text')       
        .text(d => {
            if (d !== 0) { return "~ " + d }
            else return d
        })
        .attr('transform', 'rotate(90)')
        .style('text-anchor', 'start')
        .attr('class', 'axisText')
        .attr('x', 47)
        .attr("y", function (d, i) { return -19 - i * (squareSize * 1.5 + 1) });
        
    canvas2a.append('text')
        .attr('class', 'axisText')
        .attr('x', 5)
        .attr('y', 125)
        .text('persons');

    //draw map from json file
    //draw cities on the map from csv file
    d3.csv("data/canadian_cities.csv", (cities => {
        d3.json("data/province_map.json", (map => {
            const canada = canvas2.selectAll('g')
                .data(map.features)
                .enter()
                .append('g')
                .attr('class', 'province');

            const paths = d3.geoPath()
                .projection(projection);

            //draw canada map
            const path = canada.append("path")
                .attr('d', paths)
                .attr('class', 'path')
                .attr('fill', 'white');

            //draw major cities
            const city = canvas2.selectAll('.cityDots')
                .data(cities)
                .enter()
                .append('circle')
                .attr('class', 'cityDots')
                .attr('r', 2)
                .attr('cx', city =>{
                    const coords1 = projection([city.lng, city.lat]);
                    return coords1[0];
                    })
                .attr('cy', city => {
                    const coords2 = projection([city.lng, city.lat]);
                    return coords2[1];
                    });
            
            //add city name label
            canvas2.selectAll('.cityName')
                .data(cities)
                .enter()
                .append('text')
                .attr('class', 'cityName')
                .attr('x', city => {
                    const coords3 = projection([city.lng, city.lat]);
                    return coords3[0];
                })
                .attr('y', city => {
                    const coords4 = projection([city.lng, city.lat]);
                    return coords4[1];
                })
                .text(d => d.city)
                .attr('dx', 1)
                .attr('dy', -2)
                .style('font-size', '13px');             

            //color provinces according to d.VALUE( tourist number )
            d3.selectAll('.path')
                .data(dataSorted)
                .style("fill", function (d) { return colorScale(parseInt(d.VALUE)) })
                .on("mouseover", onMouseOver) 
                .on("mouseout", onMouseOut); 

        }));
    }));
}

//create tooptip element
const mapTooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//listen mouseover event
function onMouseOver(d, i) {
    mapTooltip.transition()
        .duration(0)
        .style("opacity", 0.9);
    mapTooltip.html(d.GEO + " on " + d.REF_DATE + "<br/>" + "Tourists from Overseas: " + d.VALUE + " persons")
        .style("left", (d3.event.pageX - 100) + "px")
        .style("top", (d3.event.pageY - 120) + "px");
}

//listen mouseout event
function onMouseOut(d, i) {
    d3.selectAll('div.tooltip')
        .style('opacity', 0);
}

//draw map_chart with monthly data in
//draw cities with long lat infos from csv file
export function mapChart(data) {
    //fix missing data of 'Northwest Territories" 
    data.push({ REF_DATE: data[0].REF_DATE, GEO: "Northwest Territories", VALUE: "0" }); 
     // sort CSV data accordng to json province order
    const dataSorted = [data[1], data[2], data[10], data[11], data[7], data[9], data[4], data[0], data[5], data[12], data[3], data[8], data[6]];
 
    const margin = { top: 50, left: 50, right: 50, bottom: 50},
        height = 520 - margin.top - margin.bottom,
        width = 750 - margin.left - margin.right;

    const canvas2 = d3.select('.mapWrap')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate('+ margin.left + "," + margin.top + ")");

    const yScale = d3.scaleThreshold()
        .domain([140000, 0])
        .range([0, 500]);


    const yAxis = d3.axisRight()
        .scale(yScale);
   
    // const colorScale = d3.scaleSqrt()
    //     .domain([0, 1400000])
    //     .range(d3.schemePastel2);
    const colorScale = d3.scaleThreshold()
        .domain([0, 500, 5000, 10000, 50000, 100000, 300000, 700000, 1000000, 1300000, 1700000])
        // .range(["#ffffff", "#fcfbfd", "#f1eff6", "#e2e1ef", "#cecee5", "#b6b5d8", "#9e9bc9", "#8782bc", "#7363ac", "#61409b", "#501f8c", "#3f007d"]);
        .range(["#ffffff", "#f7fbff", "#e3eef9", "#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"]);
        //convert globe project to 2d-map project
    const projection = d3.geoMercator()
        .scale([410])
        .translate([980, 800]);

    //draw map from json file
    //draw cities on the map from csv file
    d3.csv("data/cities.csv", (cities => {
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
                .style('font-size', '13px')
                .style('text-shadow', '10px 10px 20px white');
             


            //color provinces according to d.VALUE( tourist number )
            d3.selectAll('.path')
                .data(dataSorted)
                .style("fill", function (d) { return colorScale(parseInt(d.VALUE)) })
                .on("mouseover", onMouseOver) // listener mouseover event
                .on("mouseout", onMouseOut); // listener mouseleave event

            d3.selectAll('.path')
                .append('text')
                .attr("transform", "translate(10, 20)")
                .text(d => { "hello" + d.GEO });
        }));

    }));
    
    // append group and insert axis
    d3.selectAll('.path')
        .attr('transform', 'translate(700, 50)')
        .call(yAxis);
}

let mapTooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function onMouseOver(d, i) {
    mapTooltip.transition()
        .duration(0)
        .style("opacity", 0.9);
    mapTooltip.html(d.GEO + " on " + d.REF_DATE + "<br/>" + "tourists from overseas: " + d.VALUE + " persons")
        .style("left", (d3.event.pageX - 100) + "px")
        .style("top", (d3.event.pageY - 120) + "px");
}

//mouseout event listen function
function onMouseOut(d, i) {
    d3.selectAll('div.tooltip')
        .style('opacity', 0);
}

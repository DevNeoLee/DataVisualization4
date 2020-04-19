# Monthly Canadian Province Visited from Overseas in 2000 - 2019

####  [live site](https://devneolee.github.io/DataVisualization4/): http://devneolee.github.io/DataVisualization4/
-----
## Technology
- d3.js 
- JavaScript
- HTML
- CSS
- Webpack
-----
## Raw Data Used
1. Travelers to each province in CSV file from Statistics Canada on Jan 2000 - Dec 2019
2. Province map Json file from Statistics Canada
3. Canadian cities CSV file

## Motivation
Data is the greatest power in the era of big data and AI.

This project aims to show meaninful graphical visualizations intuitively from large volume of complicated data sets. JavaScript and its library d3 are used to express interactively and dynamically.

> Data Interpretation is the process of making sense out of a collection of data that has been processed. This collection may be present in various forms like bar graphs, line charts and tabular forms and other similar forms and hence needs an interpretation of some kind.

1. Where was the most popular Canadian province to travel for oversea visitors last 20 Years?

1. Is there any popularity trend change?

1. Are total travelers increasing on each provinces or on the nation?

1. Which month or season are busier than others?

1. Which city is the most visited, on which month ,and in which year?

1. Which graphical chart, form, or method are appropriate to maximize the specific meaning from the the data set provided.

-----
## Features:

## Three different scales on the same data set

>Scales are a convenient abstraction for a fundamental task in visualization: mapping a dimension of abstract data to a visual representation.

Three different scale functions from d3 are used to represent specific needs of visualization forms.

- ### Threshold Scale

After through observation of data sets over 20 years, visitor amount gaps between most popular and least provinces are were too significant as 0 to about 1.7 million. Threshold scale is selected to represent inbetween cut values directly in colors. 

<img src="image/screenshot1.png" alt="map_chart" width="500" />

```javascript
const visitorFormat = [0, 500, 5000, 10000, 50000, 100000, 300000, 700000, 1000000, 1300000, 1700000];

const colorScale = d3.scaleThreshold()
    .domain(visitorFormat)
    .range(["#ffffff", "#f7fbff", "#e3eef9", "#cfe1f2", "#b5d4e9", "#93c3df", "#6daed5", "#4b97c9", "#2f7ebc", "#1864aa", "#0a4a90", "#08306b"]);
```
The `d3.scaleThreshold()` method is called for the variable `colorScale` to group variable `visitorFormat` array representing  the precise cut values with the appropriate range of blue color intensities.

```javascript
d3.selectAll('.path')
    .data(dataSorted)
    .style("fill", function (d) { return colorScale(parseInt(d.VALUE)) })
```
The `colorScale` was used to fill the specific colors for different province regions on the map.

 - ### Square-Root Scale
 `d3.scaleSqrt()` method creates a square-root based scale. 

 <img src="image/screenshot4.png" alt="map_chart" width="150" />

In order to represent such a great gap between the min to max values of real life event visually on the same chart, square-root scale is chosen to lower the larger value and scale up the smaller graphically.

```javascript
const yScale = d3.scaleSqrt()
    .domain([0, 1700000]) 
    .range([0, height]);
const yAxisScale = d3.scaleSqrt()
    .domain([1700000, 0]) 
    .range([0, height]);
```
Variables `yScale` and `yAxisScale` are declared by calling `d3.scaleSqrt()` with its domain and range values.

```javascript
    .attr('y', d => height - yScale(parseInt(d.VALUE)) + 10)
    .attr('height', d => yScale(parseInt(d.VALUE)));
```

```javascript
 canvas1.append('g')
        .attr('class', 'y_axis')
        .attr('transform', 'translate(65, 10)')
        .call(yAxisScale);
```
`yScale` and `yAxisScale` are each called to represent the scaled values of the visitor values from the data sets on the bar chart.

- ### Linear Scale

For series of categirical unordered data, a linear scale, `d3.scaleLinear()` method is used.

<img src="image/screenshot5.png" alt="map_chart" width="400" />

```javascript
 const xScale = d3.scaleLinear()
        .rangeRound([0, width])
        .domain([0, data.length]);
```
Continuous Linear scale in their domain and range typically produces a piecewise scale for each entry province equally.

---
## Tootips for Detail Info on Various Parts of the Graphics 
<img src="image/screenshot3.png" alt="map_chart" width="300" />
<img src="image/screenshot2.png" alt="map_chart" width="250" />

Detail informations of each specific data sets on different charts or map graphics are interactively and dynamically presented with JavaScript functions.

``` javascript
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
    d3.selectAll('div.tooltip').style('opacity', 0);
}
```
Various parts of the graphics are added with tooltips using
`d3.selection.on('action', function(){})` method

```javascript
  d3.selectAll('.path')
                .data(dataSorted)
                .on("mouseover", onMouseOver) 
                .on("mouseout", onMouseOut);
```
---
## Data distribution to different charts or map 
```javascript
       const monthlyData = [];
        for(let ele = 0; ele < data.length; ele ++ ) {
            if ((parseInt(data[ele]['REF_DATE'].slice(2, 4)) == year) &&
                (parseInt(data[ele]['REF_DATE'].slice(5, 7)) == month))
            {
                monthlyData.push(data[ele]);
            }
            if (monthlyData.length == 12 ) { break }
        }
```
Specific narrow-down data parts are collected and organized.
 
 ```javascript
    mapChart(monthlyData); 
  
    const sortedMonthlyData = [...monthlyData]; 
    sortedMonthlyData.sort(function(b, a){ return parseInt(a.VALUE) - parseInt(b.VALUE)}); 
    
    const totalVisitor = sortedMonthlyData.reduce((a, b) => (a + parseInt(b.VALUE)), 0);

    barChart(sortedMonthlyData);
    pieChart(sortedMonthlyData, totalVisitor);
```
And they are sent through calling map or chart build methods with appropriate data.

---

## Locating Canadian cities on the map with their latitude and longitude
```javascript
const projection = d3.geoMercator()
        .scale([410])
        .translate([980, 770]);
```
The 3-D earth was projected on 2d map using `d3.geoMercator()` scaling function.

```javascript
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
```
 And the cities latitude and longitude circle points are also needed to be projected through the same funcion.

 ```javascript
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
```
And the city name labels needed to be applied to the same process

## Future Features to Come

- Further Details on Each Canadian Cities
- Interconnected actions of different charts to each other
- Combine additionally related data sets from other data files 
- Develope more insight and meaning from data sets and graphically represent.
- Use other tech tools run concurrently with D3.
- Updating automatically with newly updated data sets from api sources.
- API Reference

## License ##
MIT © Justin K Lee
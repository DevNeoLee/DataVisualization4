
import { barChart } from './bar_chart.js';
import { pieChart } from './pie_chart.js';
import { mapChart } from './map_chart.js';

//organize specific monthly data
//call bar, pie, map chart
export const feedData = (data, year = 10, month = 7) => {
    const monthlyData = [];
        for(let ele = 0; ele < data.length; ele ++ ) {
            if ((parseInt(data[ele]['REF_DATE'].slice(2, 4)) == year) &&
                (parseInt(data[ele]['REF_DATE'].slice(5, 7)) == month))
            {
                monthlyData.push(data[ele]);
            }
            if (monthlyData.length == 12 ) { break }
        }
 
    mapChart(monthlyData); 
  
    const sortedMonthlyData = [...monthlyData]; 
    sortedMonthlyData.sort(function(b, a){ return parseInt(a.VALUE) - parseInt(b.VALUE)}); // sort data in order according to the value amount
    
    const totalVisitor = sortedMonthlyData.reduce((a, b) => (a + parseInt(b.VALUE)), 0);

    barChart(sortedMonthlyData);
    pieChart(sortedMonthlyData, totalVisitor);

    d3.selectAll('.info').remove();
    d3.select('.infoWrap').append('g')
        .data(sortedMonthlyData)
        .append('text')
        .attr('class', 'info')
        .text(d =>  totalVisitor + " Tourists Have Visited Canada" + " on " + d.REF_DATE );
}

export const provinces = [
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Nova Scotia",
    "New Brunswick",
    "Quebec",
    "Ontario",
    "Manitoba",
    "Saskatchewan",
    "Alberta",
    "British Columbia",
    "Yukon",
    "Nunavut"
]



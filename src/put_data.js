
import { barChart } from './bar_chart.js';
import { pieChart } from './pie_chart.js';
import { mapChart } from './map_chart.js';

//organize specific monthly data
//call bar, pie, map chart drawing methods with organized data
export const putData = (data, year = 10, month = 7) => {
    let monthlyData = [];
        for(let ele = 0; ele < data.length; ele ++ ) {
            if ((parseInt(data[ele]['REF_DATE'].slice(2, 4)) == year) &&
                (parseInt(data[ele]['REF_DATE'].slice(5, 7)) == month))
            {
                monthlyData.push(data[ele]);
            }
            if (monthlyData.length == 12 ) { break }
        }
    const sortedMonthlyData = monthlyData.sort(function(b, a){ return parseInt(a.VALUE) - parseInt(b.VALUE)});
    
    // calculate the total # of visitors to Canada on the month data
    const totalVisitor = sortedMonthlyData.reduce((a, b) => (a + parseInt(b.VALUE)), 0);

    //call charts drawing with sorted monthly data
    barChart(sortedMonthlyData);
    pieChart(sortedMonthlyData, totalVisitor);
    mapChart(sortedMonthlyData);
    
   
    // write site main title with specific visitor info for the month
    d3.selectAll('.spanText').remove();
    d3.select('span.info').append('g')
        .data(sortedMonthlyData)
        .append('text')
        .attr('class', 'spanText')
        .text(d => 'Total ' + totalVisitor + " Tourists Have Visited Canada" + " on " + d.REF_DATE );
}






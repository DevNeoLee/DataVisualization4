import { barChart } from './barChart.js';
import { pieChart } from './pieChart.js';
import { mapChart } from './mapChart.js';

export const travelData = (data, year = 19, month = 1) => {

    let newArr = [];
        for(let ele = 0; ele < data.length; ele ++ ) {
            if ((parseInt(data[ele]['REF_DATE'].slice(2, 4)) == year) &&
                (parseInt(data[ele]['REF_DATE'].slice(5, 7)) == month))
            {
                newArr.push(data[ele]);
            }
            if (newArr.length == 12 ) { break }
        }
        const sort_by_value = newArr.sort(function(b, a){ return parseInt(a.VALUE) - parseInt(b.VALUE)});
        
        barChart(sort_by_value);
        pieChart(sort_by_value);
        mapChart(sort_by_value);
        
        // calculating the total # of visitors to Canada each specific input month
        const totalVisitor = sort_by_value.reduce((a, b) => (a + parseInt(b.VALUE)), 0);
     
        d3.selectAll('.spanText').remove();
        d3.select('span.info').append('g')
            .data(sort_by_value)
            .append('text')
            .attr('class', 'spanText')
            .text(d => 'Total ' + totalVisitor + " tourists have visited Canada" + " on " + d.REF_DATE );
}






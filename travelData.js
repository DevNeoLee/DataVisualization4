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
        
}






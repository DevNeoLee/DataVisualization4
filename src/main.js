
//load raw CSV, travel_province_data 
//feed only relavant data set 
//add event listeners for user click
import { feedData } from './feedData.js';
import { provinces } from './feedData.js'

d3.csv('data/travel_province_data.csv', function(data) {
    const initialDataCut = [];
        data.forEach((ele) => {
            if ((provinces.includes(ele.GEO)) &&
                (ele['Traveller characteristics'] == "Total non resident tourists") &&
                (ele['Seasonal adjustment'] == "Unadjusted") &&
                (ele.REF_DATE[0] == '2'))
             {
                initialDataCut.push(ele);
            }
        });

    feedData(initialDataCut); 

    //eventListener for 'year' data input
    document.querySelector('.select').addEventListener("change", function () {  
        d3.selectAll("svg").remove();
        feedData(initialDataCut, document.querySelector('.select').value, document.querySelector('.slider').value);
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //eventListner for 'month' data input
    document.querySelector('.slider').addEventListener("change", function () {
        const value = document.querySelector('.slider').value;
        document.querySelector('.monthDisplay').innerText = months[value - 1];

        d3.selectAll("svg").remove();
        feedData(initialDataCut, document.querySelector('.select').value, value);
    });
});


//load raw CSV data, and call travelData method
import { travelData } from './travelData.js';

d3.csv('data/travel_to_canada_province.csv', function(data) {
    const newArr = [];

        data.forEach((ele) => {
            if ((ele.GEO == "Newfoundland and Labrador" ||
                ele.GEO == "Prince Edward Island" ||
                ele.GEO == "Nova Scotia" ||
                ele.GEO == "New Brunswick" ||
                ele.GEO == "Quebec" ||
                ele.GEO == "Ontario" ||
                ele.GEO == "Manitoba" ||
                ele.GEO == "Saskatchewan" ||
                ele.GEO == "Alberta" ||
                ele.GEO == "British Columbia" ||
                ele.GEO == "Yukon" ||
                ele.GEO == "Nunavut") &&
                (ele['Traveller characteristics'] == "Total non resident tourists") &&
                (ele['Seasonal adjustment'] == "Unadjusted") &&
                (ele.REF_DATE[0] == '2'))
             {
                newArr.push(ele);
            }
        });

        //selection input value eventlistener for 'change'
document.querySelector('.select').addEventListener("change", function () {
    
    // current canvas2 delete first
    d3.selectAll("svg")
        .remove();
    //current canvas3 delete before next 
   
    travelData(newArr, document.querySelector('.select').value, document.querySelector('.slider').value);

});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//range slider input
document.querySelector('.slider').addEventListener("change", function () {
    const value = document.querySelector('.slider').value;
    document.querySelector('.monthDisplay').innerText = months[value - 1];

    d3.selectAll("svg")
        .remove();

    travelData(newArr, document.querySelector('.select').value, value);
});

// //default value with the data of 2019 Jan when the webpage initializes
// displayOnMap(monthlyData(17, 1));//////////testing///////////

       travelData(newArr);
       
});

    
// };

// console.log(newArray());

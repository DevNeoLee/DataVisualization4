
//load raw CSV, travel_province_data using D3.js
//prepare only relavant data set array of objects
//initiate putting minimized data cut with default or listened event input
import { putData } from './put_data.js';

d3.csv('data/travel_province_data.csv', function(data) {
    const initialDataCut = [];
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
                initialDataCut.push(ele);
            }
        });

//eventListener for 'year' data input
//send data to 'putData' method
document.querySelector('.select').addEventListener("change", function () {  
    
    //firstly delete previous data 
    d3.selectAll("svg")
        .remove();
    
    //call putData method
    putData(initialDataCut, document.querySelector('.select').value, document.querySelector('.slider').value);
});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//eventListner for 'month' data input
//send dat to 'putData' method
document.querySelector('.slider').addEventListener("change", function () {
    const value = document.querySelector('.slider').value;
    document.querySelector('.monthDisplay').innerText = months[value - 1];
    
    //firstly delete previous data 
    d3.selectAll("svg")
        .remove();
    
    //call putData method
    putData(initialDataCut, document.querySelector('.select').value, value);
});
    
    //call initial default drawing with default data 
    putData(initialDataCut); 
});


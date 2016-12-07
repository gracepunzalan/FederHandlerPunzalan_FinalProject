// DUMMY DATA:
var dummydata = [
{
"class": "1",
"values": [{
"month": "01",
"year" : "2016",
"totM": "50",
"totG": "43"
}, {
"month": "02",
"year" : "2016",
"totM": "51",
"totG": "27"
}, {
"month": "03",
"year" : "2016",
"totM": "100",
"totG": "44"
}]
},
{
"class": "03",
"values": [{
"month": "01",
"year" : "2016",
"totM": "122",
"totG": "80"
}, {
"month": "02",
"year" : "2016",
"totM": "67",
"totG": "110"
}, {
"month": "03",
"year" : "2016",
"totM": "20",
"totG": "22"
}]
},
{
"class": "3",
"values": [{
"month": "01",
"year" : "2016",
"totM": "74",
"totG": "39"
}, {
"month": "02",
"year" : "2016",
"totM": "38",
"totG": "33"
}, {
"month": "03",
"year" : "2016",
"totM": "26",
"totG": "25"
}]
},
{
"class": "4",
"values": [{
"month": "01",
"year" : "2016",
"totM": "11",
"totG": "15"
}, {
"month": "02",
"year" : "2016",
"totM": "17",
"totG": "19"
}, {
"month": "03",
"year" : "2016",
"totM": "21",
"totG": "24"
}]
},
{
"class": "5",
"values": [{
"month": "01",
"year" : "2016",
"totM": "23",
"totG": "10"
}, {
"month": "02",
"year" : "2016",
"totM": "30",
"totG": "12"
}, {
"month": "03",
"year" : "2016",
"totM": "31",
"totG": "13"
}]
}];

var month = [new Date(2015, 07), new Date(2015, 08),new Date(2015, 09),new Date(2015, 10),new Date(2015, 11),
new Date(2016, 00),new Date(2016, 01),new Date(2016, 02),new Date(2016, 03),new Date(2016, 04),new Date(2016, 05),new Date(2016, 06),
new Date(2016, 07),new Date(2016, 08),new Date(2016, 09)]

console.log(month);

var vis = d3.select("#visualisation"),
  WIDTH = 1000,
  HEIGHT = 500,
  MARGINS = {
    top: 50,
    right: 20,
    bottom: 50,
    left: 50,
  },
  // NEED TO INCLUDE THE ARRAYS FROM THE DATA PARSING TO USE THIS!
  // For the y-scale, max # of words any line will reach cannot be more than all moral W or all general W.
//   maxWordCount = fuction(){ if (generalWords.length >moralWords.length) {
//     return generalWords.length;
//   }
//   else {
//     return moralWords.length;
//   }
// }
  minDate = new Date(2015, 08-1), // new Date function counts Jan as 0 and Dec as 11
  maxDate = new Date(2016, 10-1),
  xScale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([minDate, maxDate]), //Left the domain unset b/c its fn of time
  yScale = d3.scale.linear().range([HEIGHT- 2.5*MARGINS.bottom, MARGINS.top]).domain([0, 124]), //Not Dynamic :: use maxWordCount instead

//////////////////////////
//X AND Y AXES//

  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")//Plan to have a tick for each month (tick centered on Hover-Bar)
    .tickFormat(d3.time.format("%Y-%B")),  // tickFormat
  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

  // Append X-AXIS to svg
  vis.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - 2.5*MARGINS.bottom) + ")")
    .attr('class', 'axis')
    .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")
      .on("mouseover", textmouseover)
      .on("mouseout", textmouseout)
      .on("mousemove", mousemove);
// ADD FN TO SEE MONTH'S BUBBLE CHART HERE!
      // .on("click", function(){
      //
      // })

    //Append Y-AXIS to svg
    vis.append("svg:g")
              .attr("transform", "translate(" + (MARGINS.left) + ",0)")
              .attr("class", "axis")
              .call(yAxis);

    //X-axis title
    vis.append("text").text("Month")
      .attr("x", WIDTH/2)
      .attr("y", HEIGHT -MARGINS.bottom)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold");
    // Y-axis title
    vis.append("text").text("Number of Words")
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .attr("transform","translate("+ MARGINS.left/4 + ","+ HEIGHT/3+ ") rotate(270)");

// Define AXIS TICK Mouseover and Mouseout Functions for tooltip
//resource: http://bl.ocks.org/mbostock/1087001
function textmouseover(){
d3.select(this)
  .attr("fill", "red");
// Show the tooltip (anywhere!)
d3.select("#tooltip").classed("hidden", false);
}
function textmouseout(){
d3.select(this)
  .attr("fill", "black");
//Hide the tooltip
d3.select("#tooltip").classed("hidden", true);
}
// Define BAR Mouseover & Mouseout Functions for tooltip
function barmouseover(){
d3.select(this)
  .attr("opacity", "0");
// Show the tooltip (anywhere!)
d3.select("#tooltip").classed("hidden", false);
}
function barmouseout(){
d3.select(this)
  .attr("opacity", "0");
//Hide the tooltip
d3.select("#tooltip").classed("hidden", true);
}
//Define MOUSEMOVE function
function mousemove(){
d3.select("#tooltip")//.text(d3.event.pageX + ", " + d3.event.pageY)
.style("left", (d3.event.pageX+10) + "px")
.style("top", (d3.event.pageY+10) + "px");

}

////////////////////////
// Creating the lines//

  // Line Generation function
  // takes an array of objects called values: [{"month": "01", "totM": "", "totG": ""}, {"month": "02"...}, etc.]
  var moralLineGen = d3.svg.line() // need to change the x & y-vals for each Month
    .x(function(d){
      console.log(new Date(d.year, d.month-1));
      console.log("date scaled:")
      console.log(xScale(new Date(d.year, d.month-1)));
      var date = new Date(d.year, d.month-1); // new Date function counts Jan as 01 and Dec as 11
      return xScale(date);
    })
    .y(function(d){
      console.log(d.totM);
      console.log("y-val scaled:")
      console.log(yScale(d.totM));
      return yScale(d.totM);
    })
    .interpolate("basis");

    // takes an array of objects called values: [{"month": "01", "totM": "", "totG": ""}, {"month": "02"...}, etc.]
    var generalLineGen = d3.svg.line() // need to change the x & y-vals for each Month
      .x(function(d){
        return xScale(new Date(d.year, d.month-1)); // new Date function counts Jan as 01 and Dec as 11
      })
      .y(function(d){
        return yScale(d.totG);
      })
      .interpolate("basis");

  // Add Color code: (reference: http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d)
  var c10 = d3.scale.category10();
//////////////////////////////////////////////////
// Draw lines (Moral and General for each class)//
  // If data is set up with [{"key": "class#1", "values": [{"month": "01", "totM": "", "totG": ""}, {"month": "02"...}, etc.]}, {"key": "class#2", "values": [{"month": "01", "totM": "", "totG": ""}, {"month": "02"...}, etc.]}
  // For each CLASS...
  dummydata.forEach(function(d,i){

    // Create the moral line
    vis.append('svg:path')
      .attr('d', moralLineGen(d.values))
      .attr('stroke', c10(d.class))
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      // .attr("data-legend", function(d){
      //   return d.class;})
      .attr('id', 'Moral_'+d.class); // ID for future use w/ clicks

    // Create the legend for the moral line

    // vis.append("g")
    //   .attr("class", "legend")
    //   .attr("transform", "translate(" + WIDTH - MARGINS.right + "," + MARGINS.top")")
    //   .attr("font-size", "12px")
    //   .call(d3.legend);

    // Create the general line
    vis.append('svg:path')
        .attr('d', generalLineGen(d.values))
        .attr('stroke', c10(d.class))
        .style("stroke-dasharray", ("3, 3")) // from: http://www.d3noob.org/2013/01/making-dashed-line-in-d3js.html
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('id', 'General_'+d.class); //ID for future use with clicks
  });
/////////////////////////////
// Create Hover-Bar graph //
  vis.selectAll("rect")
    .data(month)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
      var scale = (WIDTH)/month.length;
      var pos = MARGINS.left+(i*scale);
      if (i==0) {
        return pos;
      }
      else {
        return pos-25;
      }
    })
    .attr("y", MARGINS.top)
    .attr("height", HEIGHT - 2.5*MARGINS.bottom - MARGINS.top)
    .attr("width", function(d,i){
      if (i == 0) {
        return 25;
      } else {
        return 50;
      }
    })
    .attr("fill", "gray")
    .attr("opacity", "0")
    .on("mouseover", barmouseover)
    .on("mouseout", barmouseout)
    .on("mousemove", mousemove);

//Create button at top
//Resource: https://www.dashingd3js.com/lessons/d3-and-html-forms

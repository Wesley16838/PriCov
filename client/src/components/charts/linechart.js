import React, {createRef} from 'react';
import * as d3 from 'd3';

class LineChart extends React.Component{
    constructor(props){
    console.log('in constructure')
        super();
        this.ref = createRef();
        this.state={
            // data:props.data//fake data
        }
     
    }
    componentDidMount(){
        console.log('bf in  componentDidMount')
        this.draw();
        console.log('af in  componentDidMount')
    }

    draw() {
        //temp static data
        var obj = [
            {
                group:'18 Aug',
                Amazon:700
            },
            {
                group:'18 Sep',
                Amazon:700
            },
            {
                group:'18 Oct',
                Amazon:650
            },
            {
                group:'18 Nov',
                Amazon:450
            },
            {
                group:'18 Dec',
                Amazon:650
            },
            {
                group:'19 Jan',
                Amazon:650
            },
            {
                group:'19 Feb',
                Amazon:600
            },
            {
                group:'19 Mar',
                Amazon:600
            },
            {
                group:'19 Apr',
                Amazon:600
               
            },
            {
                group:'19 May',
                Amazon:600
                
            }
        ]
       // List of subgroups = header of the csv files = soil condition here
       var subgroups = ['Amazon']
       // List of groups = species here = value of the first column called group -> I show them on the X axis
       var groups = d3.map(obj, function(d){return(d.group)}).keys()
       
       var margin = {top: 30, right: 30, bottom: 90, left: 60},
       width = 460 - margin.left - margin.right,
       height = 400 - margin.top - margin.bottom;
       var svg = d3.select(this.ref.current)
       // Add X axis
       var x = d3.scaleBand()
           .domain(groups)
           .range([0, width])
           .padding([0.2])
        svg.append("g")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(x))
           .selectAll("text")
               .attr("transform", "translate(-10,0)rotate(-45)")
               .style("text-anchor", "end");
     
       // Add Y axis
       var y = d3.scaleLinear()
         .domain([0, 1000])
         .range([ height, 0 ]);
       svg.append("g")
         .call(d3.axisLeft(y));
     
       // Another scale for subgroup position?
       var xSubgroup = d3.scaleBand()
         .domain(subgroups)
         .range([0, x.bandwidth()])
         .padding([0.05])
     
       // color palette = one color per subgroup
       var color = d3.scaleOrdinal()
         .domain(subgroups)
         .range(['#e41a1c'])
     
       // Show the bars
       svg.append("g")
         .selectAll("g")
         // Enter in data = loop group per group
         .data(obj)
         .enter()
         .append("g")
           .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
         .selectAll("rect")
         .data(function(d) { return subgroups.map(function(key) {
             console.log({key: key, value: d[key]})
              return {key: key, value: d[key]}; }); })
         .enter().append("rect")
           .attr("x", function(d) { return xSubgroup(d.key); })
           .attr("y", function(d) { return y(d.value); })
           .attr("width", xSubgroup.bandwidth())
           .attr("height", function(d) { return height - y(d.value); })
           .attr("fill", function(d) { return color(d.key); });
    }
    
    render() {
        
        return  <section className="history">
        <h2>Samsung Galaxy s9 History from Amazon</h2>
        <svg width="700" height="350" viewBox="-130 -10 600 350" preserveAspectRatio="xMidYMid meet" ref={this.ref} />
    </section>
    }
}

export default LineChart;
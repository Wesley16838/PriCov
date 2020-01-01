import React, {createRef} from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component{
    constructor(props){
        super(props);
        this.ref = createRef();

        this.state={
            // data:{CellPhone:50,Laptop:40,PhoneCase:30}//fake data
            data:props.data,
            max:props.max
        }
    }
    componentDidMount(){
        
        this.draw();
    }

    draw(){
     
        var margin = {top: 20, right: 30, bottom: 100, left: 150},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        var data = this.state.data
        
        for(var l = 0; l<data.length; l++){
          data[l].title = data[l].title.slice(0,30) + " Num." + (l+1)  
        }
   
        var max = Math.ceil(this.state.max.replace(',',''))
        var str_max = max.toString()
        var len = max.toString().length 
        for(var j=len-1;j>0;j--){
          
          max = max - (parseInt(str_max[j])*Math.pow(10, len-j-1));
    
        }
        max = max + Math.pow(10, len-1)
     
    // append the svg object to the body of the page
    var svg = d3.select(this.ref.current)
    //   .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    
    var colorRange = ['#0073C7', '#00FFF5']
    var color = d3.scaleLinear().range(colorRange).domain([1, 2]);
      // Add X axis
      var x = d3.scaleLinear()
        .range(colorRange)
        .domain([0, max])
        .range([ 0, 400]);
     
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
      
      // Y axis
      var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.title; }))
        .padding(.5);
      svg.append("g")
        .call(d3.axisLeft(y).ticks(8, "$.0f"))
        .call(g => g.select(".domain").remove())
        .selectAll("text")
        .style("text-anchor", "end")
        
    
    var linearGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "linear-gradient");
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color(1));

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color(2));
      //Bars
      svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) {return y(d.title); })
        .attr("width", function(d) {return x(Math.round(d.price.replace(',',''))); })
        .attr("height", 15 )
        .attr("fill", "url(#linear-gradient)")



    }
    render() {
      
       return <div className="barchart">
         <svg width="700" height="350" viewBox="0 0 600 350" preserveAspectRatio="xMidYMid meet" ref={this.ref} />
          </div>
    }
}

export default BarChart;
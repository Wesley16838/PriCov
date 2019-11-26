import React, {createRef,Component} from 'react';
import * as d3 from 'd3';

class DonutChart extends React.Component{
    constructor(props){
        super(props);
        this.ref = createRef();
        // console.log('props.data',props.data)
        this.state={
            // data:{CellPhone:50,Laptop:40,PhoneCase:30}//fake data
            data:props.data
        }
    }
    componentDidMount(){
        console.log('in componentdid mount')
        this.draw();
    }

    draw(){
        // set the dimensions and margins of the graph
        var width = 350
        var height = 350
        var margin = 40

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin
       
        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select(this.ref.current)
        
        
        // .append("g")
        
        // Create dummy data
        var data = this.state.data

        // set the color scale
        var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#98abc5", "#8a89a6", "#7b6888"])

        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(data))

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
        .innerRadius(100)         // This is the size of the donut hole
        .outerRadius(170)
        )
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
 
    }
    render() {
       return <section>
        <div className="landing-body-third-part1">
            <svg width="350" height="350" viewBox="0 0 350 350" preserveAspectRatio="xMidYMid meet" ref={this.ref} />
        </div>
        <div className="landing-body-third-part2">
           <h2>Top 3 Product</h2>
           <div className="landing-body-second-part1-status">
               <div className="product-list">
                   <h4>{Object.keys(this.state.data)[0]}</h4>
                   <span>
                       <svg width="85" height="40">
                           <rect width="85" height="40" fill='#98abc5' />
                       </svg>
                   </span>
               </div>
               <div className="product-list">
                   <h4>{Object.keys(this.state.data)[1]}</h4>
                   <span>
                       <svg width="85" height="40">
                           <rect width="85" height="40" fill='#8a89a6' />
                       </svg>
                   </span>
               </div>
               <div className="product-list">
                   <h4>{Object.keys(this.state.data)[2]}</h4>
                   <span>
                       <svg width="85" height="40">
                           <rect width="85" height="40" fill='#7b6888' />
                       </svg>
                   </span>
               </div>  
           </div>
        </div>
   </section>
    }
}

export default DonutChart;
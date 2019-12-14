import React, { createRef, Component } from 'react';
import * as d3 from 'd3';

class UprightBarChart extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.state = {
            data: props.data
        }
        
    }
    componentDidMount() {
       
        this.draw();
    }
    draw() {
        //temp static data
        const new_data = this.state.data;
        console.log('new-data,',new_data);
        var arr = []
        var tmp_obj = {
            group:'',
            origin:0,
            sale:0
        }
        for(let i=0;i<new_data.length;i++){
            tmp_obj = {
                group:new_data[i]['Product Name'],
                origin:new_data[i]['Price'],

                
            }
            if(new_data[i]['Special Offer']=='NA'){
                tmp_obj['sale'] = new_data[i]['Price']
            }else{
                tmp_obj['sale'] = new_data[i]['Special Offer']
            }
            arr.push(tmp_obj)
        }
 
        var max = Math.ceil(arr[arr.length-1].origin.replace(',',''))
        var str_max = max.toString()
        var len = max.toString().length 
        for(var j=len-1;j>0;j--){
          
          max = max - (parseInt(str_max[j])*Math.pow(10, len-j-1));
    
        }
        max = max + Math.pow(10, len-1)
        
       // List of subgroups = header of the csv files = soil condition here
       var subgroups = ['origin','sale']
       // List of groups = species here = value of the first column called group -> I show them on the X axis
       console.log('arr,',arr)
       for(var k=0;k<arr.length; k++){
        arr[k].group=arr[k].group.slice(0,20) + ' Num.' + (k+1)
       }
       var groups = d3.map(arr, function(d){return(d.group)}).keys()
     
       var margin = {top: 30, right: 30, bottom: 120, left: 60},
       width = 460 - margin.left - margin.right,
       height = 400 - margin.top - margin.bottom;
       var svg = d3.select(this.ref.current)
       // Add X axis
       var x = d3.scaleBand()
           .domain(groups)
           .range([0, 1500])
           .padding([0.2])
        svg.append("g")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(x))
           .selectAll("text")
               .attr("transform", "translate(-10,0)rotate(-45)")
               .style("text-anchor", "end");
     
       // Add Y axis
       var y = d3.scaleLinear()
         .domain([0, max])
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
         .range(['#e41a1c','#377eb8'])
     
       // Show the bars
       svg.append("g")
         .selectAll("g")
         // Enter in data = loop group per group
         .data(arr)
         .enter()
         .append("g")
           .attr("transform", function(d) { console.log('d.group,',d.group); return "translate(" + x(d.group) + ",0)"; })
         .selectAll("rect")
         .data(function(d) { return subgroups.map(function(key) {
              return {key: key, value: d[key]}; 
            }); 
        })
         .enter().append("rect")
           .attr("x", function(d) { return xSubgroup(d.key); })
           .attr("y", function(d) { return y(Math.ceil(d.value.replace(',',''))); })
           .attr("width", xSubgroup.bandwidth())
           .attr("height", function(d) { return height - y(Math.ceil(d.value.replace(',',''))); })
           .attr("fill", function(d) { return color(d.key); });
    }
    render() {
        
        return  <section className="productCompare">
        <h3>Each Product Comparison</h3>
        <div className="tableStatus">
           <span>
              <svg width="70" height="40">
                  <rect width="70" height="40" fill='#e41a1c' />
              </svg>
              <h4>Original Price</h4>
          </span>
          
          <span>
              <svg width="70" height="40">
                  <rect width="70" height="40" fill='#377eb8' />
              </svg>
              <h4>Special Offer</h4>
          </span>
         
        </div>
         
          
        <div className="barchart">
            <svg width="1600" height="450" viewBox="-20 -30 1500 450" preserveAspectRatio="xMidYMid meet" ref={this.ref} />
        </div></section>
    }
}
export default UprightBarChart;


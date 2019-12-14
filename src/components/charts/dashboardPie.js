import React, {createRef} from 'react';
import * as d3 from 'd3';

class DashboardPie extends React.Component{
    constructor(props){
    console.log('in constructure')
        super();
        this.ref = createRef();
        this.state={
            data:props.data//fake data
        }
    }
    componentDidMount(){
        
        this.draw();
    }

    draw(){
        
       
        const svg = d3.select(this.ref.current);
        const data = this.state.data;
        
        const width = 350;
        const height = 350;
        const margin = 20;
        

        var radius = Math.min(width, height) / 2 - margin
      
        var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#F57A1F", "#FCF43C", "#D30000"])
        
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(data))

        svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('transform', 'translate(175, 175)')
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
       
    }
    render() {
        return  <section>
                    <div className="Dashboard-body-second-part1">
                        <h3>Website Proportion</h3>
                        <div className="Dashboard-body-second-part1-status">
                            <div className="status-list">
                                
                                <span>
                                    <svg width="70" height="40">
                                        <rect width="70" height="40" fill='#F57A1F' />
                                    </svg>
                                </span>
                                <h4>{Object.keys(this.state.data)[0]}</h4>
                            </div>
                            <div className="status-list">
                                
                                <span>
                                    <svg width="70" height="40">
                                        <rect width="70" height="40" fill='#FCF43C' />
                                    </svg>
                                </span>
                                <h4>{Object.keys(this.state.data)[1]}</h4>
                            </div>
                            <div className="status-list">
                               
                                <span>
                                    <svg width="70" height="40">
                                        <rect width="70" height="40" fill='#D30000' />
                                    </svg>
                                </span>
                                <h4>{Object.keys(this.state.data)[2]}</h4>
                            </div>  
                        </div>
                    </div>
                    <div className="Dashboard-body-second-part2">
                        <svg width="350" height="350" viewBox="0 0 350 350" preserveAspectRatio="xMidYMid meet" ref={this.ref} />
                    </div>
                </section>
    }
}

export default DashboardPie;
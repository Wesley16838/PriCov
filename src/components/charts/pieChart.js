import React, {createRef} from 'react';
import * as d3 from 'd3';

class PieChart extends React.Component{
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
                    <div className="landing-body-second-part1">
                        <h3>Searching Status</h3>
                        <div className="landing-body-second-part1-status">
                            <div className="status-list">
                                <h4>{Object.keys(this.state.data)[0]}</h4>
                                <span>
                                    <svg width="85" height="40">
                                        <rect width="85" height="40" fill='#F57A1F' />
                                    </svg>
                                </span>
                            </div>
                            <div className="status-list">
                                <h4>{Object.keys(this.state.data)[1]}</h4>
                                <span>
                                    <svg width="85" height="40">
                                        <rect width="85" height="40" fill='#FCF43C' />
                                    </svg>
                                </span>
                            </div>
                            <div className="status-list">
                                <h4>{Object.keys(this.state.data)[2]}</h4>
                                <span>
                                    <svg width="85" height="40">
                                        <rect width="85" height="40" fill='#D30000' />
                                    </svg>
                                </span>
                            </div>  
                        </div>
                    </div>
                    <div className="landing-body-second-part2">
                        <svg width="350" height="350" viewBox="0 0 350 350" preserveAspectRatio="xMidYMid meet" ref={this.ref} />
                    </div>
                </section>
    }
}

export default PieChart;
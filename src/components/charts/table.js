import React, {createRef} from 'react';
import * as d3 from 'd3';

import DashboardPie from './dashboardPie'
import noImage from './../../Assets/img/dashboardpage/1x/noImage1.png'
import CompareBar from './compareBar'
class Table extends React.Component{
    constructor(props){
  
        super();
        this.ref = createRef();
       
        this.state={
            status:props.data[0].stastistic,
            data:props.data[0].result_new,//fake data
            title:props.data[0].productName
        }
    }
    componentDidMount(){
       
        this.draw(this.state.data);
    }

    draw(data){
        
        
        const svg = d3.select(".dashboard_table");
      
         
        const table = svg.append('table')
        const tbody = table.append('tbody')
        const thead = table.append('thead')
       
        thead.append('tr')
             .selectAll('th')
             .data(Object.keys(data[0]))
             .enter()
             .append('th')
             .text(function(column){
                 return column
             });
       
        var rows = tbody.selectAll('tr')
             .data(data)
             .enter()
             .append('tr');
        
             var cells = rows.selectAll('td')
             .data(function(row){
                 return Object.keys(data[0]).map(function(column){
                    
                     return {column: column, value:row[column]}
                 })
             })
             .enter()
             .append('td')
            //  .each(function(d){
            //      if(d.column == 'Url'){
            //         var self = d3.selectAll(this);
            //         self
            //         // .append("a")
            //         // .attr("href", d.value)
            //         // .text('link')
            //         .append("image")
            //         .attr("x", "0px")
            //         .attr("y", "0px")
            //         .attr('width', "20px")
            //         .attr('height', "20px")
            //         .attr("xlink:href", urlimage)
            //      }else{
            //         var self = d3.select(this);
            //         self
            //         .text(d.value)
            //      }
            //  })
             .html(function(d){
                 
                
                
                
                if(d.column == 'Url'){
                    
                   
                    return "<a target=\"_blank\" href="+ d.value +"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADOUlEQVRIDZ1WzVXbQBDeWSQnt9BBdIi5xh3gDlAHMZcAp5gOSAU4JyAXnAoQFQAdcMa8F7mCkBuRhCbfrLOKtPqz2ffs0fzsfprfFak1VnDGgU/pnlIUijmRGgtlpZ7wdw/+CdIoGWxdx/uE5+5FXerhdx6pPDu1IF22VsfM85T9r/ERxVbm0lbQ4Xk6A9gXd8M6vIlATseLI2/eZF8DDS552/+TXZW9wyG/EcyIlI6SfOveerEKezZteznxenE42HeBK6AGMElvSNHIGjKrb+kb76QtVx/O0rHW6sbau7QJWJeN/CSDN/8Bc8XHi0N/2gYoe2EfgLQuIppIqsoGBajJoVK7VomQ3j0eDCrGVlehOh9X+AZGwr9zkYVWZUClSmt5yWlujdqopAO+opX6Fyu+XNkrtfKUs5pH6dutqO8o7zkboSgA3L/EbpBkU7HUUoEQFGG127vyaG0ej/xbDIdry/dRpMy0oPZ0GvYZu3p50UJG/WmwtuKtpFKj+hpBy4m3m4QOL5L5QGc/h+eJyVGu8qCs73smzsKiel1j9FfjNMJLfhJbaQXk6JdWdOru7eLR99vwtJ7P1aFqPDzLJu4BMixc2UY8qRHtXKTIb/vinPbdGSo5HeiXEUYjfquFlgjgfwgn3llZEwXYHUCTGMbvmwysDN7dsqLZ46HXWamm3/N0jth/tHtdKqAah8WuwuVl+GviSKKC34mrt/ziM90n7Ic4GBdEy8L9i0LiuEX9KvHqBuKobTMTxygk3WrQtBG522uSl2Wo8LjMl5+z3I/0w4EXdYajvAPPOHAkPeqI12R5KZEwfYqKm625y5hJjyK3V5XJVD6AVVHVFXGuT4Q3oA8HPhheimCDFWIyTVx7uUmYmnqfl7b1ShNJT90DXsP7zy/Sq9vuXiY/tLICVHIrXwpW8Rpq7kvNtbFoBgzayZ5ZgIpAvhRQnT+schMqgL75vqp62TTREIn62uDzE1+H3jFG4i5eduaGtQlQ0BpBRSFXGw6aw6BzloptffEyz2liLvm6sh1UbCVk8omBPp6uB85LRlvYKm3AM6JWT90NZpjjAob3AQKE37+FWSqjTSaN/Qi3qjb6F5tIVD8T3j+SAAAAAElFTkSuQmCC\"/></a>"
                    
                }else if(d.column == 'Price'){
                    
                    
                    return "<p>"+d.value+" US$</p>"
                }else if(d.column == 'Special Offer'){    
                   
                    if(d.value == 'NA'){
                       
                        return "<p class=\"notsale\">"+'Not on sale'+"</p>"
                    }else{
                       
                        return "<p class=\"sale\">"+d.value+" US$</p>"
                    }
                    
                }else if(d.column == 'Product Image'){
                    if(d.value == 'NA'){
                        return "<img style=\"width:150px; height:150px\" src =\"" + noImage + "\">"
                    }else{

                    }
                    
                }else{
                    return "<p>"+d.value+"</p>"
                }
             })
             
    
       
         return table;
       
    }
    render() {
        return <div>
                    <div className="dashboard_title">
                        <h1>
                            Dashboard<span>{this.state.title}</span>

                        </h1>
                    </div>
                    <div className="dashboard_body">
                        <div className="dashboard_table">
                    
                                <h3>Product Summary (Top9)</h3>
                    
                        </div> 
                        <div className="bottomPieGroup">
                            <DashboardPie data={this.state.status}/>
                            <CompareBar data={this.state.data}/>
                        </div>
                       
                    </div>
            </div>
        
        
    }
}

export default Table;
import React, { createRef, Component } from 'react';
import * as d3 from 'd3';

class priceTable extends Component{
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.state = {
            data: props.data
        }
    }
    componentDidMount() {
        console.log('in bar componentdid mount')
        this.draw();
    }
    draw(){
        var columns = ["Product Image", "Product Name", "Price" ,"Website" ,"On Sale" ,"Url"];
        var productList = [
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"],
            ["phone image", "Samsung - Galaxy A10e with 32GB Memory Cell Phone (Unlocked) Black", "$79.99" , "Best buy", "On Sale","url"]
        ];
    
    
    var table = d3.select(this.ref.current).append("table");
    console.log(table);

    var thead = table.append("thead");
    var tbody = table.append("tbody")
    
    
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(d){
            return d;
        })
    
    var rows = tbody.selectAll("tr")
        .data(productList)
        .enter()
        .append("tr");
    
    var cells = rows.selectAll("td")
                .data(function(d,i){
                    return d;
                })
                .enter()
                .append("td")
                .text(function(d){
                    return d;
                });
    }
    render(){
        return <table className="priceTable" ref={this.ref}>
        </table>
    }
}
export default priceTable;
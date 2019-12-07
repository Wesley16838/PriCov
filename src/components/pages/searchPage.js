import React, {Component} from 'react';

import {
    withRouter
  } from 'react-router-dom'

import arrow from './../../Assets/img/searchpage/Forward_arrow.png'
class Searchpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: 'Mobile Phone',
      brand:'iPhone',
      nextchoices:['iPhone', 'Samsung'],
      websites:{
        amazon:false,
        bestbuy:false,
        target:false
      },
      choices: [ // name of associated select box
        
        // names match option values in controlling select box
        {mobile_phone: {
            name:'Mobile Phone',
            value:'mobile phone',
            text: ['iPhone', 'Samsung'],
            value: ['iphone', 'samsung']
        }},
        {laptop: {
            name:'Laptop',
            value:'laptop',
            text: ['Apple','Dell','Lenovo','HP'],
            value: ['apple','dell','lenovo','HP']
        }},
        {tv: {
          name:'TV',
          value:'tv',
          text: ['Samsung', 'LG', 'Sony', 'VIZIO','Insignia','Toshiba'],
          value: ['samsung', 'lg', 'sony', 'vizio','insignia','toshiba']
        }},
        {game_console: {
            name:'Game Console',
            value:'game console',
            text: ['PS4', 'Switch', 'xbox'],
            value: ['ps4', 'switch', 'xbox']
        }}
      ]
    
    };
   
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNext = this.handleChangeNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goback = this.goback.bind(this);
  }
  componentWillMount(){
    console.log("in homepage componentWillMount!!!")
  }
  componentDidMount(){
    console.log("in homepage componentDidMount!!!")
  }
  renderCheckBox(){///
    const websites = ['Amazon','BestBuy','Target']
    return websites.map((website,i)=>{
      return(
        <label key={i}>
          
          <input 
          type="checkbox"
          name={website.toLowerCase()}
          onChange={this.onWebsiteChange.bind(this)}
          value={this.state.websites[website]}
          />
          {website}
        </label>
      )
    })
  }
  onWebsiteChange(e){////
    const val = e.target.checked;
    const name = e.target.name;
    let updateWebsite = Object.assign({},this.state.websites,{[name]:val})
    this.setState({
      'websites':updateWebsite
    })
  }
  handleChange(event) {
 
    const target = event.target;
    const value = target.value;
    // const name = target.name;

    if(value === 'mobile phone'){
      this.setState({
      department:event.target.value,
      brand:'iPhone',
      nextchoices: ['iPhone', 'Samsung']
      });
    }else if(value === 'laptop'){
      this.setState({
        department:event.target.value,
        brand:'Apple',
        nextchoices: ['Apple','Dell','Lenovo','HP']
         
        });
    }else if(value === 'tv'){
      this.setState({
        department:event.target.value,
        brand:'Samsung',
        nextchoices: ['Samsung', 'LG', 'Sony', 'VIZIO','Insignia','Toshiba']
        });
    }else if(value === 'game console'){
      this.setState({
      department:event.target.value,
      brand:'PS4',
      nextchoices: [ 'PS4', 'Switch', 'xbox']
      });
    }
    
  }
  handleChangeNext(event) {
    

    this.setState({
    brand:event.target.value,
    })
  }
  handleSubmit(event) {
    console.log('this.state.websites',this.state.websites)
    // alert('Your favorite flavor is: ' + this.state.brand + this.state.department);
    event.preventDefault();
    this.props.history.push('/dashboard');
  }
  goback(e) {
    this.props.history.goBack();
  }
  // goNext(e) {
  //   this.props.history.push('/dashboard');
  // }
  render() {
  
    const choice = this.state.choices;
    const nextchoice = this.state.nextchoices
    console.log('arrow,',arrow)
    return(
        
          <div className="search-bg-l">
            <div className="search-bg">
               
            </div>
            <div className="search-body">
            <button onClick={this.goback}><img src={arrow}/></button>
            <form onSubmit={this.handleSubmit} className="search_form">
            
              <h1>Create New Panel</h1>
              <label className='choices'>
                <h3>Department</h3>
                <select placeholder="Department" name="department" onChange={this.handleChange}>
                  {choice.map((item,i)=>{
                    
                    return(
                      <option key={i} value={item[Object.keys(item)].name.toLowerCase()}>{item[Object.keys(item)].name}</option>
                    )
                  })}
                </select>
              </label>
              <label className='choices'>
                <h3>Brand</h3>
                <select placeholder="Brand" name="brand" onChange={this.handleChangeNext}>
                {nextchoice.map((item,i)=>{
                    return(
                      <option key={i} value={item}>{item}</option>
                    )
                  })}
                </select>
              </label>
              
                <h3>Choose Website:</h3>
                {this.renderCheckBox()}
              <input className="basicBtn" type="submit" value="Submit" />
            </form>
            </div>
      
          </div>
            
      

    )
  }
}

export default withRouter(Searchpage);
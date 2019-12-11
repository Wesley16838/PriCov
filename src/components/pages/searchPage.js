import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom"
import {
    withRouter
  } from 'react-router-dom'

import arrow from './../../Assets/img/searchpage/Forward_arrow.png'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ADD_ITEM = gql`
mutation PostMutation($email: String!, $keyword: String!, $website: [String]!) {
  webmine(email: $email, keyword: $keyword, website: $website) {
      _id
      email
      History{
          title
          price
          sale
          img
          url
      }
  }
}
`;
class Searchpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:props.email,
      department: 'Phone',
      brand:'iPhone',
      nextchoices:['iPhone', 'Samsung'],
      websites:{
        amazon:false,
        bestbuy:false,
        ebay:false
      },
      website:[],
      choices: [ // name of associated select box
        
        // names match option values in controlling select box
        {mobile_phone: {
            name:'Phone',
            value:'phone',
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
  componentDidMount() {
    document.title = this.props.title
  }
  renderCheckBox(){///
    const websites = ['Amazon','BestBuy','Ebay']
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
    console.log('updateWebsite,',updateWebsite)
    var arr = []
    if(updateWebsite['amazon']==true){
      arr.push('amazon')
    }
    if(updateWebsite['bestbuy']==true){
      arr.push('bestbuy')
    }
    if(updateWebsite['ebay']==true){
      arr.push('ebay')
    }
    // console.log('this.state.website,',this.state.website)
    this.setState({
       websites:updateWebsite,
       website:arr 
    })
  }
  handleChange(event) {
 
    const target = event.target;
    const value = target.value;
    // const name = target.name;
    console.log('aff,',this.state.website)
    if(value === 'phone'){
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
  handleSubmit() {
    
    // alert('Your favorite flavor is: ' + this.state.websites);
    
    this.props.history.push('/dashboard/'+this.state.brand+'+'+this.state.department);
  }
  goback(e) {
    this.props.history.goBack();
  }
  // goNext(e) {
  //   this.props.history.push('/dashboard');
  // }
  render() {
  
    const choice = this.state.choices;
    const nextchoice = this.state.nextchoices;
    const {  website } = this.state;
    
    const isInvalid = website.length == 0
 
    console.log('arrow,',arrow)
    return(
      
          <div className="search-bg-l">
            <div className="search-bg">
               
            </div>
            <div className="search-body">
            {/* <button className="arrowSearchBtn" onClick={this.goback}></button> */}
            <Link to='/home' className="arrowSearchBtn"><img src={arrow}/></Link>
            <Mutation mutation={ADD_ITEM} onCompleted={(data) => this.handleSubmit()}>
            {(webmine, { loading, error }) => (
              <div>
            <form onSubmit={e => {
              e.preventDefault();
              webmine({ variables: { email:this.state.email,keyword:this.state.brand+'+'+this.state.department, website:this.state.website } });
            }} className="search_form">
           
              <h1>Create New Panel</h1>
              <label className='choices'>
                <h3>Department<span>(Require)</span></h3>
                <select placeholder="Department" name="department" onChange={this.handleChange}>
                  {choice.map((item,i)=>{
                    
                    return(
                      <option key={i} value={item[Object.keys(item)].name.toLowerCase()}>{item[Object.keys(item)].name}</option>
                    )
                  })}
                </select>
              </label>
              <label className='choices'>
                <h3>Brand<span>(Require)</span></h3>
                <select placeholder="Brand" name="brand" onChange={this.handleChangeNext}>
                {nextchoice.map((item,i)=>{
                    return(
                      <option key={i} value={item}>{item}</option>
                    )
                  })}
                </select>
              </label>
              
                <h3>Choose Website<span>(Require)</span></h3>
                {this.renderCheckBox()}
                <button className="basicBtn" type="submit" disabled={isInvalid}>Submit</button>
                {/* <input type="submit" value="Submit" /> */}
              {/* <Mutation mutation={ADD_ITEM} variables={{ email:this.state.email,keyword:this.state.brand+'+'+this.state.department, website:this.state.websites }}> */}
                    {/* {PostMutation => 
                     <div className="form-group">
                        <button onClick={PostMutation} type="submit" className="basicBtn" value="Submit">Submit</button>
                     </div>
                    
                    } */}
              {/* </Mutation> */}
              </form>
               {loading && <p>Loading...</p>}
               {error && <p>Error :( Please try again</p>}
                </div>
              )}
            </Mutation>
            </div>
      
          </div>
            
      

    )
  }
}

export default withRouter(Searchpage);
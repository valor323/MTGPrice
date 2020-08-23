import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
import {TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import List from './list';
import Bearer from './bearer.js'
import PricePage from './PricePage'


export default class TcgPlayer extends Component {
  
  constructor(props){
    super(props);
    // this.receiveBearer.bind(this);
    this.state = {
      access: null,
      searchText: " ",
      infoResponse : null,
      bearer : "",
      haveBearer: false,
      price: null,
      clickForPrice: false
    }
  }  
  async componentDidMount(){
  }

  async componentDidUpdate(){
  

  }
  async handleSubmit(event){
    event.preventDefault();
    const axiosResponse = await axios.request({
      method: 'GET',
      url: 'http://api.tcgplayer.com/v1.36.0/catalog/products?categoryId=1&productTypes=Cards',
      params: {
        "productTypes" : "Cards",
        "productName" : this.state.searchText
      },
      headers: {
            "Authorization": this.state.bearer,
            "Accept": "application/json",
            "Content-Type": "application/json",
      },
    })
    console.log(axiosResponse)
  }

  askForBearer(){
    // if (this.state.haveBearer !== true){
    //   <Bearer receiveBearer = {this.receiveBearer}></Bearer>
    // }else{
    //   this.receiveBearer(this.state.bearer)
    // }
    // this._b.supplyBearer();
    
  }

  receiveBearer = (bearerReceived) => {
    console.log('propsTCG', bearerReceived)
    console.log('thisTCG', this)
    this.setState({
      bearer: bearerReceived,
      haveBearer: true
    })
    console.log('TCGBearer', this.state.bearer)
  }

  async handleChange(text){
    console.log('Text', text);
    console.log('searchText', this.state.searchText);
    const bearerKey = this.state.bearer;
    console.log('bearerTCG', bearerKey);
    const iDResponse = await axios.request({
      method: 'POST',
      url: 'https://api.tcgplayer.com/catalog/categories/1/search',
      data : {
        "sort": "name",
        "limit": 10,
        "filters": [
    	    { "name": "ProductName", "values": [ text ] }
    ]    
      },
      headers: {
            "Authorization": bearerKey,
            "Accept": "application/json",
            "Content-Type": "text/json",
      },
    })
    console.log('IDResponse', iDResponse);
    let idResponseUrl= ["https://api.tcgplayer.com/catalog/products/"];
    // let iDResponsePriceUrl = ["https://api.tcgplayer.com/pricing/product/"]
    for(let i = 0; i < iDResponse.data.results.length; i++){
      idResponseUrl.push(iDResponse.data.results[i] + '%2C')
      // iDResponsePriceUrl.push(iDResponse.data.results[i] + '%2C')
    }
    let iDResponseUrlString = idResponseUrl.join('');
    // let iDResponsePriceUrlString = iDResponsePriceUrl.join('');
    console.log('idResponseUrlString', iDResponseUrlString);
    // console.log('price string', iDResponsePriceUrlString);
    const infoResponse = await axios.request({
      method: "GET",
      url: iDResponseUrlString,
      headers: {
        "Authorization": bearerKey,
        "Accept": "application/json",
      },
    })

    // const priceResponse = await axios.request({
    //   method: 'GET',
    //   url: iDResponsePriceUrlString,
    //   headers:{
    //     "Authorization": bearerKey,
    //     "Accept": "application/json",
    //   }
    // });


    this.setState({
      infoResponse: infoResponse
    })
    console.log('state', infoResponse);
    // console.log('price', priceResponse);
   
}

gettingPrice = (index) => {
  this.setState({
    index: index,
    clickForPrice: true
  })
  console.log('index', index)
}

makeRow = (infoResponse) => {
  let row = infoResponse.data.results.map((item,index) => (
    <Text key = {index} style ={styles.row} onPress={() => {
      this.gettingPrice(index);
    }}>{this.state.infoResponse.data.results[index].name}</Text>
  ));
    return row;
    
}
    render() {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Search For A Card!!!</Text>
          <TextInput key = {1}
            style={styles.input} 
            onChangeText={this.handleChange.bind(this)}
          />
          <TouchableOpacity key={2}
              style = {styles.submitButton}
               onPress = {
                  this.handleSubmit.bind(this)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
              {(this.state.infoResponse) ? 
              this.makeRow(this.state.infoResponse) 
              : (null)} 
              {/* <Bearer ref={ref => (this._b = ref)} /> */}
              {this.state.haveBearer !== true ? 
              <Bearer receiveBearer = {this.receiveBearer}></Bearer>
              : null
              }
              {this.state.clickForPrice !== false ? 
              <PricePage index = {this.state.index} infoResponse = {this.state.infoResponse}></PricePage>
              : null
              }
              

        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    input: {
      height: 40, 
      width:150, 
      borderColor: 'gray', 
      borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    },
    row: {
      borderWidth: 2,
      borderColor: 'black',
      alignSelf : 'stretch',
      textAlign: 'center'
    }
 })


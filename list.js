import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import axios from 'axios';
// import {TextInput, TouchableOpacity, StyleSheet} from 'react-native';


export default class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      access: null,
      searchText: " ",
      infoResponse: null,
    }
  }  

  componentDidMount(){
    let carInformation = [...this.props.information];
    this.setState({
        infoResponse: carInformation
    })
    console.log(carInformation)

  }
  makeRow(){
    let cardInformation = [...this.props.information];
    const row = cardInformation.map((item, index) => (
    <View key = {index}>{item.data.results.name}</View>
    ))
    console.log('lis', cardInformation)
    return row
  }
  render(){
      return (
          <View>
              {this.makeRow()}
          </View>
          
      )
  }
}
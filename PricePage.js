import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
import {TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Bearer from './bearer.js'

class PricePage extends Component{
    state = {

    }

    render(){
        let index = [this.props.index]
        console.log('indexPrice', index)
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image style={styles.cardImage}></Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    cardImage:{
        width:50,
        height: 50
    }
})

export default PricePage
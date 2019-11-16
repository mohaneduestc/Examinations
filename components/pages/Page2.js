import React, {Component} from 'react';
import {View, TextInput, Text,StyleSheet, ImageBackground} from 'react-native';
import HeaderAr from '../headers/HeaderAr';
import Chapters from './Chapters';
import Buttons from '../common/Buttons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class Page2 extends Component {
  state = {  }
  _onLoginPressed=([ii,iii])=>{
    // console.log(iii)
    AsyncStorage.getItem('app_year')
    .then(yearInfo=>{
        this.props.navigation.navigate('Page3', {name:ii, id:iii, year:yearInfo});          
      })
  };
  

  componentDidMount(){
    AsyncStorage.getItem('app_token')
    .then(token =>{
        // Call back-end
        const url = `http://165.22.31.142/exams/api/v1/years`; 
        const config ={
            headers: {'Authorization': ` ${token}`}
        };
        axios.get(url, config)
        .then(resp => 
            AsyncStorage.setItem('app_year',JSON.stringify(resp.data.data)))
        .catch(error => console.log(error));
    });
}

  render() { 
    const { navigation } = this.props;
    
    return ( 
      <ImageBackground 
      source={require('../common/backgroundImage.jpg')}
      style={styles.background}>
        <HeaderAr title={JSON.stringify(navigation.getParam('name', 'default value'))}/>
        <Chapters 
          chaptersDetails={JSON.stringify(navigation.getParam('chapters', 'default value'))}
          iconStyle={(navigation.getParam('icon', 'default value'))}
          idType={(navigation.getParam('id', 'default value'))}
          onPress={([ii,iii])=>this._onLoginPressed([ii,iii])}  />
                  
        
        </ImageBackground >
     );
  }
}
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  }
});
export default Page2;
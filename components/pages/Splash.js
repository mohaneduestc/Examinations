import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, ImageBackground, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {loginUser} from '../actions';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId,getSerialNumber } from 'react-native-device-info';

class Splash extends Component {
   state={
    phoneSerial:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 
    deviceId:DeviceInfo.getUniqueId(),
    guid:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
   }
    componentDidMount(){
        // console.log(this.state.deviceId)
        const {phoneSerial, deviceId, guid}= this.state;
        this.props.loginUser({phoneSerial,deviceId, guid})
        // AsyncStorage.getItem('SubjInfo').then(name=>{
        //     console.log(name)
        // })
        // const key1 = AsyncStorage.getItem('SubjIcon');
        // const key2 = AsyncStorage.getItem('SubjId');
        AsyncStorage.getItem('SubjInfo')
        .then(SubjectInfo=>{
            if (SubjectInfo.length>2) {
                this.props.navigation.navigate('First',{SubjectInfo:SubjectInfo})
                
            }
        });
    }
  render() {
    return (
        <ImageBackground 
        source={require('../common/backgroundImage.jpg')}
         style={styles.header}>
            <ActivityIndicator size={'small'} />
            <Text style={styles.text}>Splash Screen</Text>
        </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
    header:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    text:{
      fontSize:20,
      color:'#fff',
      paddingTop:10
    }
  })

  const mapStateToProps = state =>{
    return(
        {
            error:state.auth.error,
            loading:state.auth.loading,
            user:state.auth.user
            
        }
  
    )
  }
  export default connect(mapStateToProps, {loginUser})(Splash)

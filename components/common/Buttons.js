import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';

 const Buttons =(props) =>{
    return(
        <TouchableOpacity 
            onPress={props.onPress}
            style={styles.button} >
            <Image
                source={{ uri: 'https://pbs.twimg.com/profile_images/1089419424862519297/eQww9Udq_400x400.jpg' }}
                style={{ width: 50, height: 50 }}
                />
            <Text style={styles.textStylee}>
                {props.children}
            </Text >
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        height:30,
        width:120,
        marginHorizontal:70,
        marginVertical:50,
        backgroundColor:'#fff',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical:0
        

        
    },
    textStylee:{
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        paddingRight:20
       
    }
});
export default Buttons;
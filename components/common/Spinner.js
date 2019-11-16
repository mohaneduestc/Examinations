import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';


const Spinner =() =>{
    return(
        <View style={styles.spinner}>
            <ActivityIndicator size={'large'}/>
        </View>
    );
}
const styles = StyleSheet.create({
    spinner:{
        justifyContent:'center',
        alignItems:'center',
        height: 500
    }
});

export {Spinner};
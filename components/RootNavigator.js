import React, { Component } from 'react';
import { View, Text } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Splash from './pages/Splash';




const RootNavigator = createStackNavigator({
  
  Splash: {
    screen: Splash,
    navigationOptions:{
      header: null
    }
    
  },

  First: {
    screen: Page1,
    navigationOptions:{
      header: null
    }
    
  },
  
  Page2: {
    screen: Page2,
    navigationOptions:{
      header: null
    }
    
    
  },
  
  Page3: {
    screen: Page3,
    navigationOptions:{
      header: null
    }
    
  },
  
});

export default createAppContainer(RootNavigator);
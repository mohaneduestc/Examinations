/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './components/reducers';
import reduxThunk from 'redux-thunk';


export default class rnredux extends Component {
    render() {
        
    return (
     
        <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk) )} >
          <App/>
        </Provider>
     

    );
  }
}


AppRegistry.registerComponent(appName, () => rnredux);

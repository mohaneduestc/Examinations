import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import { Button,Header, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons';

class Header1 extends Component {
    state = {  
        title:'يلا نتعلـم',
        
     }
    renderLeftComponent=()=>{
        return <Button  icon={{name: "menu" , color: '#fff'}} />
    }

   renderRightComponent=()=>{
            return <Button  icon={{name: "share" , color: '#fff'}}  />
        }

    render() { 
        return ( 
            <ThemeProvider>
                <Header
                        
                        leftComponent={this.renderLeftComponent()}
                        centerComponent={{ text: this.state.title, style: { color: '#fff',fontSize:25 } }}
                        rightComponent={this.renderRightComponent()}
/>
      </ThemeProvider>
         );
    }
}
 
export default Header1;

import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import { Button,Header, ThemeProvider,Icon} from 'react-native-elements';

class HeaderAr extends Component {
    state = { 
        title:this.props.title
     }
    renderLeftComponent=()=>{
        return <Button  icon={{name: "menu" , color: '#fff'}} />
    }

   renderRightComponent=()=>{
            return <Button  icon={{name: "share" , color: '#fff'}}  />
        }

    render() { 
        let newSubjectName = JSON.parse( this.state.title );
        return ( 
            <ThemeProvider>
                <Header
                        
                        leftComponent={this.renderLeftComponent()}
                        centerComponent={{ text: newSubjectName, style: { color: '#fff',fontSize:20 } }}
                        rightComponent={this.renderRightComponent()}
/>
      </ThemeProvider>
         );
    }
}
 
export default HeaderAr;

import React, { Component } from 'react';
import {Avatar,Image, Button,Header, Text, ThemeProvider, Icon, ListItem } from 'react-native-elements';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

class Subjects extends Component {
    state = { 
        title:this.props.CoursesName
     }
   
    render() { 
        let dataa = JSON.parse("[" +this.state.title+ "]" );
        // console.log(this.state.title)
        // console.log((dataa))
        
        let myData = dataa[0];
        let DefaultChaptersIcon =myData[0].chapters[0].icon;
        // console.log(myData[3].chapters)
        // console.log(myData[4].chapters)
        
        return ( 

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', marginTop:30 }}>
            
            <View style={{ flexDirection: 'row',flexDirection: 'row-reverse',flexWrap:'wrap', justifyContent: 'center', marginTop:70}}>
            {myData.map((l, i) => (
                    <TouchableOpacity  key={i} 
                        onPress={()=>this.props.onPress([l.name,l.chapters, DefaultChaptersIcon,l._id])}>
                        <View style={{ flexDirection: 'column', padding:15, }}>
                            <Image
                                
                                borderRadius={50}
                                // source={require('../common/React.png')}
                                source={{ uri: l.icon }}
                                style={{ width: 100, height: 100,  }}
                                PlaceholderContent={<ActivityIndicator />}
                                />
                            <Text style={{
                                color:'black',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'column',
                                fontSize:20,}}>
                                    {l.name}
                                </Text>

                        </View>
                    </TouchableOpacity>
                ))
            }
                    
            </View>
        </View>




         );
    }
}
 
export default Subjects;
import React, { Component } from 'react';
import {Avatar,Image, Button,Header, Text, ThemeProvider, Icon, ListItem } from 'react-native-elements';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';


class Chapters extends Component {
    state = { 
        title:this.props.chaptersDetails,
        icons:this.props.iconStyle,
        id:this.props.idType,
     }
   
    render() { 
        // console.log(this.state.icons);
        let defaultIcon = this.state.icons;
        let chapterdata = JSON.parse("[" +this.state.title+ "]" );
        let newChapterdata =chapterdata[0];
        // console.log(newChapterdata)
        return ( 

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', marginTop:90 }}>
            
            <View style={{ flexDirection: 'row',flexDirection: 'row-reverse',flexWrap:'wrap', justifyContent: 'center', marginTop:60}}>
            {newChapterdata.map((l, i) => (
                
                    <TouchableOpacity  key={i} 
                        onPress={()=>this.props.onPress([l.name, l._id])}>
                        <View style={{ flexDirection: 'column', padding:15, }}>
                            
                            <Image
                                
                                borderRadius={50}
                                
                                // source={import(imim)}
                                source={{ uri: defaultIcon }}
                                style={{ width: 100, height: 100,  }}
                                PlaceholderContent={<ActivityIndicator />}
                                />
                                
                            <Text style={{
                                color:'black',
                                alignItems:'center',
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
 
export default Chapters;
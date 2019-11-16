import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Video from 'react-native-video';
import VideoStudy from '../VideoStudy';
import HeaderArExaminations from '../headers/HeaderArExaminations';
import CheckQues from '../questions/CheckQues';
import TrueQues from '../questions/TrueQues';
import PickerInputExample from '../questions/PickerInputExample';
import MatchQuestion from '../questions/MatchQuestion';




class Page3 extends Component {
    state = { }

render() { 
    const { navigation } = this.props;
        let chaptersId= JSON.stringify(navigation.getParam('id', 'default value'))
        let chaptersYear= (navigation.getParam('year', 'default value'))
        let newchaptersYear = JSON.parse("[" +chaptersYear+ "]" );
        let newYearInfo = Object.values(newchaptersYear[0]);

        return ( 
            <ScrollView>
                {newYearInfo.map((l, i) => (
                    <ScrollView  key={i} >
                <HeaderArExaminations title={JSON.stringify(navigation.getParam('name', 'default value'))}/>
                
                <Card title={`إمتحانات الشهادة لعام ${l.name}`}>
                  
                    <View style={styles.user}>
                        <VideoStudy chaptId={chaptersId} year={l.name}/>
                    </View>
                        <CheckQues chaptId={chaptersId} year={l.name} /> 
                        <TrueQues chaptId={chaptersId} year={l.name}/>
                        <PickerInputExample chaptId={chaptersId} year={l.name}/>
                        
              
                </Card>
                             
            </ScrollView>    
                ))}
             
            </ScrollView>  
         );
    }         
}

const styles = StyleSheet.create({
  user:{
    backgroundColor:'white',
    height:300,
    padding:10
  }

  ,
  image:{
    flex:1,
    
  }

  ,
  name:{ 
    fontSize:20
  },
  
})
 
export default Page3;

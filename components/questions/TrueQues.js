import React, { Component } from 'react';
import {View, TextInput, Alert, StyleSheet} from 'react-native';
import { CheckBox , CardItem , Card,  Button, Content, Text, Body } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
 

class CheckQues extends Component {
    state = { 
        Results:'',
        numbering:[false,false],
        one:false,
        two:false,
        option:'',
        Error:'',
        Explain:'',
        Explaination:'',
        value:'',
        disabled:true
     }
     onePressed=([option,value,Explaination])=>{
       
        if (option == 0) {
           this.setState({numbering:[false ,true,false, false],disabled:false, option,value,Explaination}); 
        } else{
           this.setState({numbering:[ true, false,false,false],disabled:false, option,value,Explaination});
       }
        
}
    
  _onPress=()=>{
        
    const {option, Error,value,Explaination} = this.state;
    console.log(Explaination)
     if (option === "") {
       alert('اختر الاجابة الصحيحة');     
     }else if  (option === value) {
        return  this.setState({Error:"إجابة صحيحة",Explain:Explaination})
    }else{
        return this.setState({Error:"إجابة خاطئة",Explain:Explaination})
     }
   }

   componentDidMount(){
    AsyncStorage.getItem('app_Ques')
    .then(ques=>
        this.setState({Results:(ques)})
     
 )
   }
   
    render() { 
        if (this.state.Results.length <1) {
            return null;
        } else {
            let dataa =(this.state.Results );
            let dataa1 = JSON.parse("[" +dataa+ "]" );
            let newQuesInfo = dataa1[0][0];
            let value = newQuesInfo.correctAnswer[0].value;
            let Explaination=  newQuesInfo.answerExplanation;
            
            // console.log(newQuesInfo.correctAnswer[0].value)
            // console.log(newQuesInfo)
            
        return ( 
            <Content>
                <Card>
                    <CardItem header style={{flexDirection: 'row-reverse'}}>
                        <Text style={styles.paragraph}>  أجب ب (لا)أو (نعم)</Text>
                    </CardItem>
                    <CardItem body style={{flexDirection: 'row-reverse'}}>
                        <Text>{newQuesInfo.contentTxt}</Text>
                    </CardItem>
                    {newQuesInfo.answerOptions.map((l, i) => ( 
                  
                  <CardItem body key={i} style={{flexDirection: 'row-reverse'}}>
                      <CheckBox  checked={this.state.numbering[i]}
                      
                          onPress={()=> this.onePressed([l.value, value,Explaination])}
                          
                          />
                          <Body style={{flexDirection: 'row-reverse'}}>
                              <Text style={{paddingRight:21}}>{l.label}</Text>
                            
                           </Body>
                           <Body style={{flexDirection: 'row-reverse'}}>
                              
                              
                           </Body>
                  </CardItem >
          ))}

                    
                    <Button style={{flex:1,justifyContent: "center",alignItems: "center"}}
                             onPress={this._onPress}
                             disabled={this.state.disabled}>
                        <Text style={{fontSize:20, fontWeight: 'bold'}}>إرســـــال</Text>
                    </Button>
                    <CardItem footer style={{flexDirection: 'row-reverse'}}>
                        <Text style={{color:'red', fontSize:21}}>{this.state.Error}</Text>
                    </CardItem>
                    <CardItem footer>
                        <Text style={{color:'red', fontSize:21}}>{this.state.Explain}</Text>
                    </CardItem>

                </Card>
            </Content>
        
         );
        }
    }
}
const styles = StyleSheet.create({
    
    paragraph: {
        // paddingLeft:120,
        margin: 15,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },

  });
export default CheckQues;
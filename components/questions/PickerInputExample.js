import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Card,Button, CardItem ,Container, Header, Content, Form, Item, Body , Icon, Picker, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


export default class PickerInputExample extends Component {
    
    state = {
      Results:'',
      selected0: '',
      selected1: '',
      fristOpt:'',
      secOpt:'',
      answer:'',
      Explain:'',
      disabled:true,
      // Explaination:'',
     

    };
  
    onValueChange0=(itemValue, itemIndex)=> {
      this.setState({
        selected0: itemValue,
        disabled:false,
        
      });
    }
    onValueChange1=(itemValue, itemIndex)=>{
     
      this.setState({
        selected1: itemValue,
        disabled:false,
      });
  
  }



    _onPress=()=>{
      // console.log(this.Explaination)
        const {selected0, selected1,Explain} = this.state;
        if (selected0 === '' ||selected1=== '' ) {
            alert('pls fill the BLANK!');    
        }else if  (selected0 == 0 && selected1 == 1) {
       return  this.setState({answer:"إجابة صحيحة",Explain:this.Explaination})
    }else{
        return this.setState({answer:"إجابة خاطئة",Explain:this.Explaination})
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
      let newQuesInfo = dataa1[0][2];
      let value = newQuesInfo.correctAnswer;
      this.Explaination=  newQuesInfo.answerExplanation;
      // this.setState({Explaination:Explaination});
      let Questions = newQuesInfo.contentTxt.trim().split("_،");
      // let Questions1 = Questions[0];
      // let Questions2 = Questions[1];
      let answerOptions = newQuesInfo.answerOptions;
      let correctAnswer = newQuesInfo.correctAnswer;
      // console.log(newQuesInfo.correctAnswer[0].value)
      // console.log(newQuesInfo)
 
    return (
      <Content>
        <Card>
            <CardItem header style={{flexDirection: 'row-reverse'}}>
                <Text style={styles.paragraph}>أكمل الفراغات</Text>
            </CardItem>
          
          <CardItem body  style={{flexWrap: 'wrap', flexDirection: 'row-reverse'}}>
          
            <Text style={{fontSize: 18, marginTop:10}} >{Questions[0]}</Text><Text >  </Text>
            <Item picker style={{ width: 150, color:'green',
                    backgroundColor:"gainsboro",flexWrap: 'wrap', marginTop:10 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined, }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected0}
                onValueChange={this.onValueChange0}
                
              >
                <Picker.Item label="" value=""  />
                <Picker.Item label={answerOptions[0].label} value={answerOptions[0].value}  color='green'  />
                <Picker.Item label={answerOptions[1].label} value={answerOptions[1].value}  color='green'  />
                <Picker.Item label={answerOptions[2].label} value={answerOptions[2].value}  color='green'  />
                <Picker.Item label={answerOptions[3].label} value={answerOptions[3].value}  color='green' />
                
              </Picker>
            </Item>

            <Text style={{fontSize: 18, marginTop:10}} >{Questions[1]}</Text><Text >  </Text>
            <Item picker style={{ width: 150, color:'green',
                    backgroundColor:"gainsboro",flexWrap: 'wrap', marginTop:10 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined, }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange1}
               
              >
                <Picker.Item label="" value=""  />
                <Picker.Item label={answerOptions[0].label} value={answerOptions[0].value}  color='green' />
                <Picker.Item label={answerOptions[1].label} value={answerOptions[1].value}  color='green'  />
                <Picker.Item label={answerOptions[2].label} value={answerOptions[2].value}  color='green'  />
                <Picker.Item label={answerOptions[3].label} value={answerOptions[3].value}  color='green' />
                
              </Picker>
            </Item>
 
          </CardItem>
          

          <Button style={{flex:1,justifyContent: "center",alignItems: "center"}}
                             onPress={(Explaination)=>this._onPress()}
                             disabled={this.state.disabled}>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>إرســـــال</Text>
        </Button>

        <CardItem footer style={{flexDirection: 'row-reverse'}}>
            <Text style={{color:'red', fontSize:20}}>{this.state.answer}</Text>
        </CardItem>
        <CardItem footer>
            <Text style={{color:'red', fontSize:20}}>{this.state.Explain}</Text>
        </CardItem>
  </Card>
      </Content>
    );
  }
  }
}

const styles = StyleSheet.create({
    
    paragraph: {
        
        margin: 15,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    para:{
        
        fontSize: 18,
        
        
    }
  });
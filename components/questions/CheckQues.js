import React, { Component } from 'react';
import {View, TextInput, Alert, StyleSheet} from 'react-native';
import { CheckBox , CardItem , Card,  Button, Content, Text, Body } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
// import { exportDefaultSpecifier } from '@babel/types';
 

class CheckQues extends Component {
    state = { 
        Results:'',
        numbering:[false,false,false,false],
        option:'',
        Error:'',
        Explain:'',
        Explaination:'',
        value:'',
        disabled:true,
        
     }
     onePressed=([option,value,Explaination])=>{
       
            if (option == 0) {
               this.setState({numbering:[true, false,false, false],disabled:false, option,value,Explaination}); 
            } else if (option == 1) {
                this.setState({numbering:[false, true,false, false],disabled:false, option,value,Explaination});    
            }else if (option == 2) {
                this.setState({numbering:[false, false,true, false],disabled:false, option,value,Explaination});
           }else{
               this.setState({numbering:[false, false,false,true ],disabled:false, option,value,Explaination});
           }
            
    }
      
             
        
    _onPress=()=>{
        
         const {option, Error,value,Explaination} = this.state;
        if (option === "") {
            alert('اختر الاجابة الصحيحة');     
    }else if  (option === value) {
        return  this.setState({Error:"إجابة صحيحة",Explain:Explaination})
     }else{
         return this.setState({Error:"إجابة خاطئة",Explain:Explaination})
     }
    }
   componentDidMount(){
        let year=this.props.year;
       let chaptId =JSON.parse(this.props.chaptId);
       AsyncStorage.getItem('app_token')
       .then(token =>{
           const url = `http://165.22.31.142/exams/api/v1/questions?chapter=${chaptId}&year=${year}`; 
           // Call back-end
           const config ={
               headers: {'Authorization': ` ${token}`}
           };
           axios.get(url, config)
           .then(resp =>
            AsyncStorage.setItem('app_Ques',(resp.data.data)))
            // this.setState({Results:JSON.stringify(resp.data.data)}))
           
       });
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
        let newQuesInfo = dataa1[0][1];
        let value = newQuesInfo.correctAnswer[0].value;
        let Explaination=  newQuesInfo.answerExplanation;
        
        // console.log(newQuesInfo.correctAnswer[0].value)
        // console.log(newQuesInfo)
        return ( 
         
            <Content>
                
                <Card>
                <CardItem header style={{flexDirection: 'row-reverse'}}>
                        <Text style={styles.paragraph}>اختر الاجابة الصحيحة</Text>
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
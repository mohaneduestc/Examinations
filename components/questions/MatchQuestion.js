import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Text, FlatList, View,Switch } from 'react-native'
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist'
import SortableList from 'react-native-sortable-list'
import { Card,Button, CardItem ,Container, Header, Body, Content, Icon } from 'native-base';


class MatchQuestion extends Component {
 
  state = {
    // switchValue:this.props.scroll,
    answer:'',
    data: ['Mother','color', 'film','food'].map((d, index) => ({
      key:index,
      label: d,
      backgroundColor: `green`,
    })),
    data1: ['junk','Green','Father','horror'].map((d, index) => ({
      key: index,
      label: d,
      backgroundColor: `red`,
    }))
  }
 
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      
      <TouchableOpacity
      
        
        delayLongPress={0}
        style={{ 
          height: 50,  width:120,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center', 
          justifyContent: 'center' ,

          
        }}
        activeOpacity={0.02}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{ 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 20,
        }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  _onPress=()=>{
    const {data}=this.state;
    const ans0 = (/true/i).test(JSON.stringify(data[0].key == 3)) ;
    const ans1 = (/true/i).test(JSON.stringify(data[1].key == 1)) ;
    const ans2 = (/true/i).test(JSON.stringify(data[2].key == 0)) ;   
    const ans3 = (/true/i).test(JSON.stringify(data[3].key == 2)) ;   
    
    if( ans0 && ans1 && ans2 && ans3 ) {  
       return  this.setState({answer:"Good!, All RIGHT"})
      }else{
        return this.setState({answer:`Sorry!, Not all answers are right, you get ${ans0 + ans1 + ans2 + ans3}/4`})
      }
    
  
}


 
  render() {
    return (
      <Content>
      <Card>
          <CardItem header >
                <Text style={styles.paragraph}>Match the RIGHT list to the corrosponding Left by Long pressing 
                 to the word in RIGHT list and then drag it the correcr place</Text>
          </CardItem>
            <Text >press the button to stop scrolling of page </Text>
            <Switch value={this.props.scroll}  
                    onValueChange ={this.props.onValueChange}/>  
            <CardItem body >
            
          <ScrollView keyboardShouldPersistTaps="always" 
            style={{ paddingHorizontal: '15%', alignSelf: 'center'}} horizontal={true}>
          
          <FlatList
            data={this.state.data1}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `flatlist-item-${item.key}`}
          />
          
          <DraggableFlatList
            
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            scrollPercent={500}
            onMoveEnd={({ data }) => this.setState({ data })}
          />

        </ScrollView>
     

      </CardItem>

      <Button style={{flex:1,justifyContent: "center",alignItems: "center"}}
                             onPress={this._onPress}>
          <Text style={{fontSize:17, fontWeight: 'bold'}}>Submit your Answer</Text>
      </Button>

        <CardItem footer>
            <Text style={{color:'red', fontSize:20}}>{this.state.answer}</Text>
        </CardItem>

      </Card>

      </Content>
    )
  }
}

const styles = StyleSheet.create({
    
  paragraph: {
      
      margin: 15,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
  },
});
 
export default MatchQuestion
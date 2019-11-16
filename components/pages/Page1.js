import React, {Component} from 'react';
import {View, StyleSheet,TextInput, Text, ImageBackground } from 'react-native';
import Header1 from '../headers/Header1';
import Subjects from './Subjects';
import Buttons from '../common/Buttons';
import AsyncStorage from '@react-native-community/async-storage';
// import {AsyncStorage} from 'react-native';
// import {fetchTasks} from '../actions';
// import {connect} from 'react-redux';



class Page1 extends Component {
    
  componentDidMount() {
    // this.props.fetchTasks();
  }
  // //   // const {username, password}= this.state;
  // //   // this.props.loginUser({username,password})
  //   AsyncStorage.getItem('app_token')
  //   .then(token =>{
  //       console.log(token)
  //   });
  // }
  _onLoginPressed=([ii,iii,iiii,iiiii])=>{
    this.props.navigation.navigate('Page2', {name:ii, chapters:iii, icon:iiii, id:iiiii});
    // console.log(`Subject Name ${ii}`)
    // console.log(`icon Name ${iiii}`)
    
  }
  render() { 
    const { navigation } = this.props;
    return ( 
      <ImageBackground 
      source={require('../common/backgroundImage.jpg')}
      style={styles.background}>
        <Header1 />
        
        <Subjects  
          CoursesName={(navigation.getParam('SubjectInfo'))}
          onPress={([ii,iii,iiii,iiiii])=>this._onLoginPressed([ii,iii,iiii,iiiii])} />
        
      </ImageBackground >
     );
  }
}
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  }
});

// const mapStateToProps = state =>{
//   return(
//       {
//         error:state.taskList.error,
//         loading:state.taskList.loading,
//         tasks:state.taskList.tasks
          
//       }

//   )
// }
// export default connect(mapStateToProps, {fetchTasks})(Page1);
// onPress={()=>this._onLoginPressed(this.props.key)}
export default Page1

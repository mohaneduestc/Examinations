import {LOGIN_ATTEMPT,LOGIN_SUCCESS,LOGIN_FAILED} from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode'; 



export const loginUser = ({phoneSerial, deviceId, guid})=>{
   
    return (dispatch)=> {
        dispatch({type: LOGIN_ATTEMPT});
        
        // call back-end
        axios.post('http://165.22.31.142/exams/api/v1/clients/register',
    {phoneSerial: phoneSerial, deviceId:deviceId, guid:guid})
    .then(resp=>handleResponse(dispatch, resp.data))
    
    .catch(error => console.error(error));
    };
}

const handleResponse =(dispatch, data) =>{
    // console.log(data)
    if(data.message === 'OK'){
         onLoginSuccess(dispatch, data.message, data.token)
    }else{
       onLoginFailed(dispatch,data.message);
    }
}

const onLoginSuccess =(dispatch, message, token)=>{
    AsyncStorage.setItem('app_token',token)
    .then(()=>{
    dispatch({type:LOGIN_SUCCESS, message})
});
// decode the token and store the subject promise
    AsyncStorage.getItem('app_token')
    .then(token =>{
        var clientId = jwt_decode(token.substring(4)).id;
        // Call back-end
        const url = `http://165.22.31.142/exams/api/v1/clients/${clientId}`; 
        const config ={
            headers: {'Authorization': ` ${token}`}
        };
        axios.get(url, config)
        .then(resp => AsyncStorage.setItem('app_subject',JSON.stringify(resp.data.data)))
        .catch(error => console.log(error));
    });

    // decode the token and store the subject promise
    AsyncStorage.getItem('app_token')
    .then(token =>{
        // Call back-end
        const url = `http://165.22.31.142/exams/api/v1/subjects`; 
        const config ={
            headers: {'Authorization': ` ${token}`}
        };
        axios.get(url, config).then(resp => {
            let subjectResp = resp.data.data;
            AsyncStorage.setItem('SubjInfo', JSON.stringify(subjectResp))
        })
        
    });

};


const onLoginFailed =(dispatch, errorMessage)=>{
    dispatch({type:LOGIN_FAILED, error:errorMessage})
    // console.log(errorMessage)
}
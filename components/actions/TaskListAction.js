import {LOADING_TASKS,LOADING_SUCCESS,LOADING_FAILED} from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';


const handleResponse = (dispatch,data)=>{
    if (data.message === 'OK'){
        dispatch({type:LOADING_SUCCESS, tasks:data})
    }else{
        dispatch({type:LOADING_FAILED, error:data})
    }
}



export const fetchTasks =() =>{
    return (dispatch) =>{
        dispatch({type:LOADING_TASKS});

        // Get Token from local storage
        
        AsyncStorage.getItem('app_token')
        .then(token =>{
            var clientId = jwt_decode(token.substring(4)).id;
            // Call back-end
            const url = `http://165.22.31.142/exams/api/v1/clients/${clientId}`; 
            const config ={
                headers: {'Authorization': ` ${token}`}
            };
            axios.get(url, config)
            .then(resp => console.log(JSON.stringify(resp.data.data)))
                // handleResponse(dispatch,resp.data))
            .catch(error => console.log(error));
        });
    }
}
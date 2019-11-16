import {LOADING_TASKS,LOADING_SUCCESS,LOADING_FAILED} from '../actions/types';

const INITIAL_STATE = {tasks:[], loading:false, error:''}


export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case LOADING_TASKS:
           return {...INITIAL_STATE, loading:true}
        case LOADING_SUCCESS:
           return {...INITIAL_STATE, loading:false, tasks:action.tasks}
        case LOADING_FAILED:
           return {...INITIAL_STATE, loading:false, error:action.error}
        default:
           return state;
    }
}
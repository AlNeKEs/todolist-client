import { INIT_STATE_TODO } from './state';
import {produce} from "immer";
import { SET_LOADING, SAVE_TODO } from './contants';

export default function todoReducer(state = INIT_STATE_TODO, action){
    return produce(state, (draf)=>{
        switch (action.type){
            case SET_LOADING:
                draf.isLoading = action.payload;
                break;
            case SAVE_TODO:
                draf.isLoading = false;
                draf.todoList = action.payload;
                break;
            default:
                return state;
        }
    })
}
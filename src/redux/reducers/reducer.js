import { combineReducers } from "redux";
import todoReducer from './../../page/home/store/reducer';
export default function createReducer() {
  const rootReducer = combineReducers({
    todoReducer
  });
  return rootReducer;
}

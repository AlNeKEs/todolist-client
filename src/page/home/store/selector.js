import {createSelector} from "reselect";
import { INIT_STATE_TODO } from "./state";

const selectTodo = (state) => state.todoReducer || INIT_STATE_TODO;

const selectSetLoading = createSelector(selectTodo, (state)=> state.isLoading);
const selectTodoList = createSelector (selectTodo, (state)=> state.todoList);

export {selectSetLoading, selectTodoList}
import {takeLatest, all, put, call } from "redux-saga/effects";
import { GET_TODOLIST, UPDATE_TODO, DEL_TODO, CREATE_TODO, SEARCH_TODO } from "./contants";
import { getAll, updateTodo ,delTodo, createTodo, searchTodo} from "../../../services";
import { setLoading, saveTodo} from "./action";

function* getTodoSaga (){
    try{
        yield put(setLoading(true));
        const respone = yield call(getAll);
        yield all([put(setLoading(false)), put(saveTodo(respone.data.allData))]);
    }catch(e){
        yield put(setLoading(false));
    }
}

function* createTodoSaga ({payload, resolve}){
    try{
        yield put(setLoading(true));
        const respone = yield call(createTodo,payload);
        resolve(respone.data)
        yield put(setLoading(false));
    }catch(e){
        console.log(e);
        yield put(setLoading(false));
    }
}

function* updateTodoSaga ({payload, resolve}){
    try{
        yield put(setLoading(true));
        const respone = yield call(updateTodo,payload);
        resolve(respone.data)
        yield put(setLoading(false));
    }catch(e){
        console.log(e);
        yield put(setLoading(false));
    }
}

function* deleteTodoSaga ({payload, resolve}){
    try{
        yield put(setLoading(true));
        const respone = yield call(delTodo,payload);
        resolve(respone.data)
        yield put(setLoading(false));
    }catch(e){
        console.log(e);
        yield put(setLoading(false));
    }
}

function* searchTodoSaga ({payload}){
    try{
        yield put(setLoading(true));
        const respone = yield call(searchTodo,payload);
        yield all([put(setLoading(false)), put(saveTodo(respone.data.searchData))]);
    }catch(e){
        yield put(setLoading(false));
        console.log(e)
    }
}

export function* todoList (){
    yield takeLatest(GET_TODOLIST, getTodoSaga);
    yield takeLatest(UPDATE_TODO, updateTodoSaga);
    yield takeLatest(DEL_TODO, deleteTodoSaga);
    yield takeLatest(CREATE_TODO, createTodoSaga);
    yield takeLatest(SEARCH_TODO, searchTodoSaga);
}
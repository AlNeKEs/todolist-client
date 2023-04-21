import {
  SET_LOADING,
  SEARCH_TODO,
  GET_TODOLIST,
  UPDATE_TODO,
  CREATE_TODO,
  DEL_TODO,
  SAVE_TODO,
} from "./contants";

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const getTodolist = () => {
  return {
    type: GET_TODOLIST,
  };
};

export const saveTodo = (payload) => {
  return {
    type: SAVE_TODO,
    payload,
  };
};

export const searchTodoAction = (payload) => {
  return {
    type: SEARCH_TODO,
    payload
  };
};

export const createTodo = (payload, resolve) =>{
  return {
    type: CREATE_TODO,
    payload,
    resolve
  }
}

export const asyncCreateTodo = (dispatch)=>{
  return function returnAsync(payload) {
    return new Promise((resolve) =>
        dispatch(createTodo(payload, resolve))
    );
};
}

export const updateTodo = (payload, resolve) =>{
  return {
    type: UPDATE_TODO,
    payload,
    resolve
  }
}

export const asyncUpdateTodo = (dispatch)=>{
  return function returnAsync(payload) {
    return new Promise((resolve) =>
        dispatch(updateTodo(payload, resolve))
    );
};
}

export const deleteTodo = (payload, resolve) =>{
  return {
    type: DEL_TODO,
    payload,
    resolve
  }
}

export const asyncDeleteTodo = (dispatch)=>{
  return function returnAsync(payload) {
    return new Promise((resolve) =>
        dispatch(deleteTodo(payload, resolve))
    );
};
}
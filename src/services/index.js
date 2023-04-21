import request from "../utils/request";

// login
export const authLogin = (payload) => {
  return request(`${process.env.REACT_APP_API}/api/user/login`, {
    method: "POST",
    data: payload,
  });
};

//register
export const authRegister = (payload) => {
  return request(`${process.env.REACT_APP_API}/api/user/register`, {
    method: "POST",
    data: payload,
  });
};

//authUser
export const authUser = (payload) => {
  return request(`${process.env.REACT_APP_API}/api/user/auth`, {
    method: "GET"
  });
};

// todolist
// getAll
export const getAll = () => {
  return request(`${process.env.REACT_APP_API}/api/todolist/getAll`, {
    method: "GET",
  });
};

// search
export const searchTodo = (payload) => {
  return request(`${process.env.REACT_APP_API}/api/todolist/search`, {
    method: "POST",
    data: payload
  });
};

// create todo
export const createTodo = (payload) => {
  return request(`${process.env.REACT_APP_API}/api/todolist/create`, {
    method: "POST",
    data: payload,
  });
};

// update todo
export const updateTodo = (payload) => {
  return request(`${process.env.REACT_APP_API}/api/todolist/update`, {
    method: "PUT",
    data: payload,
  });
};

// delete todo
export const delTodo = (id) => {
  return request(`${process.env.REACT_APP_API}/api/todolist/delete/${id}`, {
    method: "DELETE",
  });
};

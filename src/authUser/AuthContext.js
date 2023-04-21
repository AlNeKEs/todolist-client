// eslint-disable-next-line
import { createContext, useReducer, useEffect } from "react";
import { authUser, authLogin } from "../services";
import { setAuthToken, getCookie } from "../utils";
import React from "react";
export const AuthContext = createContext();

const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }) => {
  // eslint-disable-next-line
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //   Authenticate user
  const loadUser = async () => {
    const token = getCookie("token");
    if (token) {
      setAuthToken(token);
    }
    try {
      const response = await authUser();
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      } else {
        console.log(response);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: false,
            user: null,
            authLoading: false,
          },
        });
      }
    } catch (e) {
      console.log(e);
      document.cookie = `token = `;
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
          authLoading: false,
        },
      });
    }
  };

  // Login user/
  const loginUser = async (data) => {
    try {
      const response = await authLogin(data);
      if (response.data.success) {
        document.cookie = `token = ${response.data.access_token}`;
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            authLogin: false,
            user: response.data.username,
          },
        });
        return response.data;
      } else {
        return response.data;
      }
    } catch (e) {
      if (e.response.data) return e.response.data;
      else return { success: false, message: e.message };
    }
  };

  //Logout
  const logoutUser = () =>{
    document.cookie = `token = `;
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: {},
      },
    });
  }

  useEffect(() => {
    loadUser();
  }, []);
  const authContextData = { loadUser, authState, loginUser, logoutUser };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

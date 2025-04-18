/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';
// import * as auth from '../utils/api/local/authData.js';
import * as authAPI from "../utils/api/axios/authApi";
export const UserContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN-IN":
      return { ...state, user: action.payload };
    case "SIGN-OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authCheck = await authAPI.checkTokens();
      if (authCheck.status === 200) {
        const uuid = authCheck.data.uuid;
        const userResponse = await authAPI.getUser(uuid);
        const userObject = {
          uuid: uuid,
          userId: userResponse.User_ID,
        };
        dispatch({ type: "SIGN-IN", payload: userObject });
      } else if (
        authCheck.status === 401 &&
        authCheck.message === "Refresh token expired"
      ) {
        console.log("token expired");
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

import { useEffect, useReducer, ReactNode } from "react";

import { ActionMap, AuthResponse, AuthState, AuthUser } from "../types/auth";

//import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

import AuthContext from "./JWTContext";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axios";
import { Modal } from "react-bootstrap";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://localhost:5001/auth"
    : "https://localhost:5001/auth";

type AuthActionTypes = {
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [SIGN_IN]: {
    user: AuthUser;
  };
  [SIGN_OUT]: undefined;
  [SIGN_UP]: {
    user: AuthUser;
  };
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (
  state: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        let accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          setSession(accessToken);
          const userResponse = await axiosInstance.get(`${API_URL}/me`);
          const user: AuthUser = userResponse.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          signOut();
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/login`, {
        username,
        password,
      });
      const data = response.data;

      if (data.Error) {
        throw new Error(data.Error);
      }
      const accessToken = data.accessToken;
      const user = data.userDetails;

      setSession(accessToken);
      dispatch({
        type: SIGN_IN,
        payload: {
          user,
        },
      });
    } catch (error) {
      console.log("catchblockerror", error);
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
    navigate("/");
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    companyName: string,
    companyCode: string,
    companyType: number,
    userNameWithoutCompanyCode: string
  ) => {
    const response = await axiosInstance.post(`${API_URL}/register`, {
      email,
      password,
      firstName,
      lastName,
      companyName,
      companyCode,
      companyType,
      userNameWithoutCompanyCode,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: SIGN_UP,
      payload: {
        user,
      },
    });
  };

  const resetPassword = (email: string) => console.log(email);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
      <Modal />
    </AuthContext.Provider>
  );
}

export default AuthProvider;

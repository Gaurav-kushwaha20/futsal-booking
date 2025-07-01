"use client";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearAllCookies, getCookie, setCookie } from "./cookie";
import { COOKIE_CONFIG } from "@/constant/cookie.constant";
import { apiSlice } from "./api";
import { RootState } from "@/store/store";

interface User {
 id: string;
}

interface IAuthStateReturn {
 userId: string | null;
 isLoggedIn: boolean;
}

interface LoginPayload {
 accessToken: string;
 refreshToken: string;
 userId: string;
 isUserLoggedIn: boolean;
}

interface AuthState {
 user: User | null;
 isLoggedIn: boolean;
}

const initialAuthState: AuthState = {
 user: null,
 isLoggedIn: false,
};

const getInitialState = (): AuthState => {
 if (typeof window === "undefined") {
  return initialAuthState;
 }

 try {
  const userId = localStorage.getItem("userId");
  const refreshToken = getCookie(COOKIE_CONFIG.refresh);
  if (userId && refreshToken) {
   return {
    user: { id: userId },
    isLoggedIn: true,
   };
  } else {
   clearAllCookies();
   return {
    user: null,
    isLoggedIn: false,
   };
  }
 } catch (e) {
  console.error(e);
  return {
   user: null,
   isLoggedIn: false,
  };
 }
};

const authSlice = createSlice({
 name: "auth",
 initialState: getInitialState(),
 reducers: {
  loginUser: (state, action: PayloadAction<LoginPayload>) => {
   state.user = { id: action.payload.userId };
   state.isLoggedIn = true;

   localStorage.setItem("userId", action.payload.userId);
   setCookie({
    cookieName: COOKIE_CONFIG.access,
    value: action.payload.accessToken,
    expiresIn: action.payload.isUserLoggedIn === false ? 0 : COOKIE_CONFIG.accessTime,
   });
   setCookie({
    cookieName: COOKIE_CONFIG.refresh,
    value: action.payload.refreshToken,
    expiresIn: action.payload.isUserLoggedIn === false ? 0 : COOKIE_CONFIG.refreshTime,
   });
  },

  logoutUser: (state) => {
   state.user = null;
   state.isLoggedIn = false;
   clearAllCookies();
   apiSlice.util.resetApiState();
  },

  setUser: (state, action: PayloadAction<User>) => {
   state.user = action.payload;
   state.isLoggedIn = true;
  },
 },
});

export const getAuthState = createSelector(
 (state: RootState) => state.auth,
 (authState: AuthState): IAuthStateReturn => ({
  userId: authState?.user?.id || null,
  isLoggedIn: authState?.isLoggedIn,
 })
);

export const { loginUser, logoutUser, setUser } = authSlice.actions;
export default authSlice;

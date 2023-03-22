import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "session",
  initialState: {
    Login: null,
    isAdmin:false
  },
  reducers: {
    login: (state, action) => {
      // console.log(action.payload.Login)
      
      state.Login = action.payload.Login; 
      console.log("login",state.Login)
    },
    logout: (state) => {
      state.Login = null;
      state.isAdmin=false;
    },
    isAdmin: (state, action) => {
      console.log(action.payload)
      if(action.payload.Login.email=="shreenidhitl.is20@rvce.edu.in")
        state.isAdmin=true;
      else  
        state.isAdmin=false;
    },
  },
});

export const { login, logout, isAdmin } = userSlice.actions;

export const selectUser = (state) => 
{
  console.log(state)
  return "ab";
  
};

export default userSlice.reducer;
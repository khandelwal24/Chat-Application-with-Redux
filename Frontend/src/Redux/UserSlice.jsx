import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser: null,
        OtherUsersss:[],
        SelectedUser:null,
        OnlineUsers:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsersss:(state,action)=>{
            state.OtherUsersss = action.payload
        },
        setSelectedUser:(state,action)=>{
            state.SelectedUser = action.payload
        },
        setOnlineUsers:(state,action)=>{
                state.OnlineUsers = action.payload   
        },
    }
})

export const {setAuthUser, setOtherUsersss, setSelectedUser, setOnlineUsers} = userSlice.actions
export default userSlice.reducer;
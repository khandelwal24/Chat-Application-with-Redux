import {createSlice} from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name:'Mesa',
    initialState:{
        Messages:[],
    },
    
    reducers:{
        setMessages:(state,action) =>{
            state.Messages = action.payload
        },
    }
})
export const {setMessages} = messageSlice.actions
export default messageSlice.reducer;
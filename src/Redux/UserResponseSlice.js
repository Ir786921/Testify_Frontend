import { createSlice } from "@reduxjs/toolkit";
const UserResponseSlice = createSlice({
    name:"userResponse",
    initialState: {
        item : [],
        
    },
    reducers:{
         addResponse: (state,action)=>{
            state.item.push(action.payload);
         }
    }

})

export const {addResponse} = UserResponseSlice.actions;
export default UserResponseSlice.reducer; 
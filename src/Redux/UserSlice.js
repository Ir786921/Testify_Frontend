import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name:"User",
        initialState:{
            item : [],
            IsLogin:false
        } ,
        reducers :{
            IsAuthenticate:(state)=>{
                 state.IsLogin = true
            },
            addUser: (state, action) => {
                state.item = action.payload; // Store the entire array
            },
            removeUser: (state) => {
                state.item = [];
            },
          updateUser: (state, action) => {
            
            state.item = action.payload;
}
            
           
        }
    }

    
)
export const{addUser,removeUser,updateUser,IsAuthenticate} = UserSlice.actions
export default UserSlice.reducer;
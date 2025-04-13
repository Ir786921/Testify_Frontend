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
                state.item = action.payload; 
            },
            removeUser: (state) => {
                state.item = [];
                state.IsLogin = false;
            },
          updateUser: (state, action) => {
            
            state.item = action.payload;
}
            
           
        }
    }

    
)
export const{addUser,removeUser,updateUser,IsAuthenticate} = UserSlice.actions
export default UserSlice.reducer;
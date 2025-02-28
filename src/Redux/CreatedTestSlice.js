import { createSlice } from "@reduxjs/toolkit";

const CreateTestSlice = createSlice({
    name : "CreateTest",
    initialState:{
        item : []
    },
    reducers:{
        addTest :(state,action)=>{
            state.item.push(action.payload);
        }
    }
})

export const {addTest} = CreateTestSlice.actions;
export default CreateTestSlice.reducer;
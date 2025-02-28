const { createSlice } = require("@reduxjs/toolkit");

const librarySlice = createSlice({
    name:"library",
    initialState:{
        item:[],
        testID:null
    },
    reducers:{
     showlibrary: (state,action)=>{
             state.item.push(...action.payload)
        },
     setTestId:(state,action)=>{
          state.testID = action.payload
     }
    }
})

export const {showlibrary,setTestId} = librarySlice.actions;
export default librarySlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import UserResponseSlice from "./UserResponseSlice";
import UserSlice from "./UserSlice";
import NetworkSpeedSlice from "./WebCamPermissionSlice.js"
import librarySlice from "./librarySlice.js"
import CreateTestSlice from "./CreatedTestSlice.js"
import storage from "redux-persist/lib/storage"; // LocalStorage
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage, // Stores data in localStorage
  };
  
  const persistedReducer = persistReducer(persistConfig, UserSlice);

const Store = configureStore({
    reducer:{
        userResponse:UserResponseSlice,
        User:persistedReducer,
        networkSpeed:NetworkSpeedSlice,
        library:librarySlice,
        CreateTest:CreateTestSlice
        


    }
});
export const persistor = persistStore(Store);
export default Store;
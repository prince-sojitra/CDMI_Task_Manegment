import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./Slices/userSlice";
import alertReducer from "./Slices/alertSlice";
import spinnerReducer from "./Slices/spinnerSlice";
import boardsReducer from "./Slices/boardsSlice";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import cardReducer from "./Slices/cardSlice";

const Store = configureStore({
    reducer : {
        spinner: spinnerReducer,
        user: userReducer,
        alert: alertReducer,
        boards: boardsReducer,
        board: boardReducer,
        list: listReducer,
        card: cardReducer,
    },
}) 
export default Store;
import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from './slice/menuSlice'
import ToolBox from "@/component/ToolBox";
import ToolBoxReducer from '@/Redux/slice/toolboxSlice'

export const store = configureStore({
    reducer:{
        menu:MenuReducer,
        toolbox:ToolBoxReducer
    }
})
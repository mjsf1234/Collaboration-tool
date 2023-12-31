import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS, COLOURS } from "@/constant";
import { create } from "domain";

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    color: COLOURS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    color: COLOURS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
};

export const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColour: (state, action) => {
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].size = action.payload.size;
    },
  },
});

export const { changeColour, changeBrushSize } = toolboxSlice.actions;

export default toolboxSlice.reducer;

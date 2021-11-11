import { createSelector, createSlice } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

const initialState: { style: {}; disableDrag: boolean } = {
  style: {},
  disableDrag: false,
};

const placeholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {
    setStyle(state, action) {
      const style = action.payload;
      if (!isEqual(state.style, style)) {
        state.style = style;
      }
    },
    setDisableDrag(state, action) {
      const disableDrag = action.payload;
      state.disableDrag = disableDrag;
    },
  },
});
export const { setStyle, setDisableDrag } = placeholderSlice.actions;

export default placeholderSlice.reducer;

export const getStyle = createSelector(
  (state: any) => state.editor.placeholder,
  (state: any) => state.style
);
export const getDisableDrag = createSelector(
  (state: any) => state.editor.placeholder,
  (state: any) => state.disableDrag
);

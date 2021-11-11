import { combineReducers } from "@reduxjs/toolkit";
import placeholderReducer from "./placeholderSlice";
import actionDataReducer from "./actionDataSlice";
import layoutDataReducer from "./layoutDataSlice";
import layoutActiveReducer from "./layoutActiveSlice";
export * from "./layoutDataSlice";
export * from "./placeholderSlice";
export * from "./actionDataSlice";

const editorReducer = combineReducers({
  placeholder: placeholderReducer,
  layoutData: layoutDataReducer,
  layoutActive: layoutActiveReducer,
  actionData: actionDataReducer,
});
export default editorReducer;

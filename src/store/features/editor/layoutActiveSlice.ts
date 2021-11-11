import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getEntityById, ROOT_ID } from "./layoutDataSlice";

const initialState: { activeId?: string } = {
  // activeId: "d6b062da-69e6-4d3e-be3d-d3c15e271219",
};

const layoutActiveSlice = createSlice({
  name: "layoutActive",
  initialState,
  reducers: {
    setActiveId(state, action) {
      const layoutId = action.payload;
      if (layoutId === ROOT_ID) {
        return;
      }
      state.activeId = layoutId;
    },
  },
});
export const { setActiveId } = layoutActiveSlice.actions;

export default layoutActiveSlice.reducer;

export const getLayoutActiveId = createSelector(
  (state: any) => state.editor.layoutActive,
  (state: any) => state.activeId
);
export const getLayoutActiveData = createSelector(
  (state: any) => state.editor.layoutActive,
  (state: any) => state.editor.layoutData,
  (state: any, layoutData) => {
    const activeId = state.activeId;
    // 如果没有点击页面元素，则返回false
    if(!activeId) {
      return false;
    }
    return getEntityById(layoutData, activeId);
  }
);

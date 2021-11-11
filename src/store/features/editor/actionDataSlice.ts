import { guid } from "@components/utils";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getEntityById, updateEntityById } from "./layoutDataSlice";

export type ActionType =
  | "sqlAction"
  | "jsAction"
  | "ajaxFetchAction"
  | "toggleVisibleAction";

export interface Action {
  id: string;
  type: ActionType;
  name: string;
  onSuccessActionId?: string;
  onFailedActionId?: string;
}

export interface IAjaxFetchAction extends Action {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  query?: [];
  data?: [];
  headers?: [];
  result: {};
}
export interface IJsAction extends Action {
  js: string;
}
export interface ISqlAction extends Action {
  sql: string;
}
export interface IToggleVisibleAction extends Action {
  component: string;
}

export type IStoreAction =
  | IAjaxFetchAction
  | IJsAction
  | ISqlAction
  | IToggleVisibleAction
  | Action;

const actionAdapter = createEntityAdapter<IStoreAction>();

const initialState = actionAdapter.getInitialState({
  status: "idle",
});
const filledState = actionAdapter.upsertMany(initialState, [
  {
    type: "toggleVisibleAction",
    id: "c459fec1-4d2c-492c-9fdd-c45bae7f544f",
    name: "toggleVisibleActionc459fec1-4d2c-492c-9fdd-c45bae7f544f",
    component: "ROOTID_d855c85e-aaa8-449a-8bb2-4754a24dc5c7",
  },
]);

const actionDataSlice = createSlice({
  name: "actionData",
  initialState: filledState,
  reducers: {
    actionDataRemove: actionAdapter.removeOne,
    actionDataRemoveMany: actionAdapter.removeMany,
    actionDataRemoveAll: actionAdapter.removeAll,
    actionDataAddOne: (
      state,
      action: {
        type: string;
        payload: Omit<Action, "id" | "name"> & { id?: string; name?: string };
      }
    ) => {
      action.payload.id = action.payload.id || guid();
      action.payload.name =
        action.payload.name || action.payload.type + action.payload.id;
      actionAdapter.addOne(state, action as any);
    },
    actionDataAddMany: actionAdapter.addMany,
    actionDataSetAll: actionAdapter.setAll,
    actionDataUpdateOne: actionAdapter.updateOne,
    actionDataUpdateMany: actionAdapter.updateMany,
    actionDataUpsertOne: actionAdapter.upsertOne,
    actionDataUpsertMany: actionAdapter.upsertMany,
  },
});
export const {
  actionDataRemove,
  actionDataRemoveMany,
  actionDataRemoveAll,
  actionDataAddOne,
  actionDataAddMany,
  actionDataSetAll,
  actionDataUpdateOne,
  actionDataUpdateMany,
  actionDataUpsertOne,
  actionDataUpsertMany,
} = actionDataSlice.actions;

export default actionDataSlice.reducer;
export const {
  selectAll: selectActionAll,
  selectById: getActionDataById,
  selectEntities: getActionEntities,
} = actionAdapter.getSelectors((state: any) => {
  return state.editor.actionData;
});

// export const getLayoutActiveData = createSelector(
//   // First, pass one or more "input selector" functions:
//   getLayoutDataEntities,
//   (state) => state.editor.layoutActive.activeId,
//   // Then, an "output selector" that receives all the input results as arguments
//   // and returns a final result value
//   (entities, activeId) => {
//     return entities[activeId];
//   }
// );

export const fireAction = (actionId: string) => (
  dispatch: any,
  getState: () => any
) => {
  const state = getState();
  const currentAction = state.editor.actionData.entities[
    actionId
  ] as IStoreAction;

  const toggleVisibleActionHandler = () => {
    const componentId = (currentAction as IToggleVisibleAction).component;
    const entity = getEntityById(state.editor.layoutData, componentId);
    if (!entity) {
      return;
    }
    const visible = !entity.visible;
    dispatch(
      updateEntityById({
        id: componentId,
        payload: {
          visible,
        },
      })
    );
  };
  switch (currentAction.type) {
    case "sqlAction":
      break;
    case "jsAction":
      break;
    case "ajaxFetchAction":
      break;
    case "toggleVisibleAction":
      toggleVisibleActionHandler();
      break;
    default:
      break;
  }
};

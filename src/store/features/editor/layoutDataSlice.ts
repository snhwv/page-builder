import { createSlice, createSelector } from "@reduxjs/toolkit";
import { isArray, mergeWith } from "lodash";
import { guid } from "@components/utils";

export interface BaseLayoutData {
  id: string;
  name: string;
  type: string;
  parentId: string | undefined;
  width: number;
  height: number;
  colIndex: number;
  rowIndex: number;
  tempData: any;
  data: any;
  currentId: string;
  children: { [key: string]: ILayoutData };
  zIndex?: string;
  // 所有的容器都是一个类型插件:container，无法固定指出container类型应包含的类型
  // 所以只有在插件中指定
  accept?: string[];
  visible?: boolean;
  // 自身的子元素
  // 如table的操作列，无法使用children+container表示，使用subChildren表示
  subChildren?: { [key: string]: ILayoutData };
}
export interface IContainerLayoutData {
  cols: number;
  unitHeight: number;
  margin: number[];
  containerWidth: number;
}
export type ContainerLayoutData = IContainerLayoutData & BaseLayoutData;

export type ILayoutData = BaseLayoutData & Partial<IContainerLayoutData>;
export const ROOT_ID = "ROOTID";

const initialState: ILayoutData = {
  id: ROOT_ID,
  name: "page",
  type: "page",
  containerWidth: 1440,
  unitHeight: 60,
  margin: [10, 10],
  cols: 12,
  tempData: {},
  width: 0,
  height: 0,
  colIndex: 0,
  rowIndex: 0,
  data: {},
  currentId: ROOT_ID,
  children: {
    // "e1455377-1d54-4cc3-b31b-ee2efbdf0f11": {
    //   id: "ROOTID_e1455377-1d54-4cc3-b31b-ee2efbdf0f11",
    //   currentId: "e1455377-1d54-4cc3-b31b-ee2efbdf0f11",
    //   parentId: "ROOTID",
    //   name: "buttone1455377-1d54-4cc3-b31b-ee2efbdf0f11",
    //   colIndex: 3,
    //   rowIndex: 0,
    //   data: {},
    //   children: {},
    //   width: 1,
    //   height: 1,
    //   tempData: {
    //     text: '8989',
    //     canOperation: true,
    //     action: 'c459fec1-4d2c-492c-9fdd-c45bae7f544f',
    //     color: 'secondary',
    //     variant: 'outlined',
    //     size: 'large',
    //     startIcon: 'search'
    //   },
    //   type: "button",
    // },
    // "d855c85e-aaa8-449a-8bb2-4754a24dc5c7": {
    //   id: "ROOTID_d855c85e-aaa8-449a-8bb2-4754a24dc5c7",
    //   currentId: "d855c85e-aaa8-449a-8bb2-4754a24dc5c7",
    //   parentId: "ROOTID",
    //   name: "drawerd855c85e-aaa8-449a-8bb2-4754a24dc5c7",
    //   colIndex: 3,
    //   rowIndex: 1,
    //   data: {},
    //   children: {},
    //   width: 5,
    //   height: 5,
    //   visible: true,
    //   tempData: {},
    //   cols: 6,
    //   unitHeight: 50,
    //   margin: [10, 10],
    //   type: "drawer",
    //   containerWidth: 590,
    // },
  },
  parentId: undefined,
};

const divider = "_";

// Thunk functions
// export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
//   const response = await client.get("/fakeApi/todos");
//   return response.todos;
// });

export const getEntityById = (tree: ILayoutData, idStr: string) => {
  let entity = tree;
  if (!idStr || idStr === ROOT_ID) {
    return entity;
  }
  const idArr = idStr.split(divider).filter((item) => item !== ROOT_ID) || [];
  for (let i = 0; i < idArr.length; i++) {
    // 希望children元素与subChildren元素行为一致
    // 如在SelectProps配置时，也要能够获取到store中对应的subChildren的数据，达到配置的功能
    if (entity.children[idArr[i]]) {
      entity = entity.children[idArr[i]];
    } else if (entity?.subChildren?.[idArr[i]]) {
      entity = entity?.subChildren?.[idArr[i]];
    }
  }
  return entity;
};
function customizer(objValue: any, srcValue: any) {
  if (isArray(objValue)) {
    return srcValue;
  }
}

const generateChild = (
  child: any,
  parentId: string,
  type: string
): ILayoutData => {
  const id = guid();
  const name = `${type}${id}`;
  const obj = {
    id: parentId ? `${parentId}${divider}${id}` : id,
    currentId: id,
    parentId,
    name,
    ...child,
  };
  return obj;
};
const layoutDataSlice = createSlice({
  name: "layoutData",
  initialState,
  reducers: {
    addChildById(state, action) {
      const { parentId, child, childContainerQty, childData } = action.payload;

      const entity = getEntityById(state, parentId);
      const newChild = generateChild(child, parentId, child?.type);

      // 配置有childContainerQty时，表示有子container，其个数等于childContainerQty
      if (typeof childContainerQty === "number" && childContainerQty) {
        for (let i = 0; i < childContainerQty; i++) {
          const subChild = generateChild(childData, newChild.id, "container");
          newChild.children[subChild.currentId] = subChild;
        }
      }

      entity.children[newChild.currentId] = newChild;
    },
    // 增加自身子元素，区别于children
    addSubChildById(state, action) {
      const { parentId, child } = action.payload;
      const entity = getEntityById(state, parentId);
      const id = guid();
      const name = `${child?.type}${id}`;
      if (!entity.subChildren) {
        entity.subChildren = {};
      }
      entity.subChildren[id] = {
        id: parentId ? `${parentId}${divider}${id}` : id,
        currentId: id,
        parentId,
        name,
        ...child,
      };
    },
    addTableColumnById(state, action) {
      const { id = "", payload } = action.payload;
      const table = getEntityById(state, id);
      const { data } = table;
      const { columns } = data;
      if (!columns) {
        data.columns = [payload];
        return;
      }
      columns.push(payload);
    },
    addTableColumnLeftById(state, action) {
      const { id = "", index, payload } = action.payload;
      const table = getEntityById(state, id);
      const { data } = table;
      const { columns } = data;
      if (!columns) {
        data.columns = [payload];
        return;
      }
      columns.splice(index, 0, payload);
    },
    addTableColumnRightById(state, action) {
      const { id = "", index, payload } = action.payload;
      const table = getEntityById(state, id);
      const { data } = table;
      const { columns } = data;
      if (!columns) {
        data.columns = [payload];
        return;
      }
      columns.splice(index + 1, 0, payload);
    },
    updateTableColumnById(state, action) {
      const { id = "", index, payload } = action.payload;
      const table = getEntityById(state, id);
      const { data } = table;
      const { columns } = data;
      if (!columns) {
        return;
      }
      mergeWith(columns[index], payload, customizer);
    },
    deleteTableColumnById(state, action) {
      const { id = "", index } = action.payload;
      const table = getEntityById(state, id);
      const { data } = table;
      const { columns } = data;
      if (!columns) {
        return;
      }
      columns.splice(index, 1);
      // Reflect.deleteProperty(columns, index);
    },
    deleteEntityById(state, action) {
      const { id } = action.payload;
      const entity = getEntityById(state, id);
      const parentEntity = getEntityById(state, entity.parentId!);
      Reflect.deleteProperty(parentEntity.children, entity.currentId);
    },
    updateEntityById(state, action) {
      const { id, payload } = action.payload;
      const entity = getEntityById(state, id);
      mergeWith(entity, payload, customizer);
    },
    updateChildrenContainerWidthById(state, action) {
      const { id, payload } = action.payload;
      const entity = getEntityById(state, id);
      entity.containerWidth = payload;
    },
    // layoutDataRemove: layoutsAdapter.removeOne,
    // layoutDataRemoveMany: layoutsAdapter.removeMany,
    // layoutDataRemoveAll: layoutsAdapter.removeAll,
    // layoutDataAddOne: layoutsAdapter.addOne,
    // layoutDataAddMany: layoutsAdapter.addMany,
    // layoutDataSetAll: layoutsAdapter.setAll,
    // layoutDataUpdateOne: layoutsAdapter.updateOne,
    // layoutDataUpdateMany: layoutsAdapter.updateMany,
    // layoutDataUpsertOne: layoutsAdapter.upsertOne,
    // layoutDataUpsertMany: layoutsAdapter.upsertMany,
  },
});
export const {
  addChildById,
  addSubChildById,
  updateEntityById,
  deleteEntityById,
  updateChildrenContainerWidthById,
  addTableColumnById,
  updateTableColumnById,
  deleteTableColumnById,
  addTableColumnLeftById,
  addTableColumnRightById,
} = layoutDataSlice.actions;

export default layoutDataSlice.reducer;

export const getLayoutDataById = createSelector(
  (state: any) => state.editor.layoutData,
  (state: any, id: string) => id,
  (state: any, id: string) => getEntityById(state, id)
);
export const getPageOptionsById = createSelector(
  (state: any) => state.editor.layoutData,
  (state: any, id: string) => id,
  (state: any, id: string) => {
    const entity = getEntityById(state, id);
    return entity.data.pageOptions;
  }
);
const getCanToggleVisibleData = (
  entity: ILayoutData,
  holder: ILayoutData[] = []
) => {
  if (Reflect.has(entity, "visible")) {
    holder.push(entity);
  }
  Object.values(entity.children).forEach((child) => {
    getCanToggleVisibleData(child, holder);
  });
  return holder;
};
export const getCanToggleVisible = createSelector(
  (state: any) => state.editor.layoutData,
  (state: any) => {
    const holder = getCanToggleVisibleData(state);
    return holder;
  }
);
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

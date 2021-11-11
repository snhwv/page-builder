import {
  addChildById,
  ILayoutData,
  updateEntityById,
} from "@store/features/editor";
import { Dispatch } from "redux";
import WithDragContainer from "../dragAndDrop/withDragContainer";
import { IconMapper } from "./IconMapper";
import { IPlugin, PluginHookMethod } from "./types";
export class BaseEditor {
  static IconMapper = IconMapper;
  plugins: IPlugin[] = [];
  private dispatch!: Dispatch;

  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  canvasComponentNodeMapper: {
    [key: string]: React.FC<any>;
  } = {};

  sideBarComponentNodeMapper: {
    [key: string]: React.FC<any>;
  } = {};

  propComponentNodeMapper: {
    [key: string]: React.FC<any>;
  } = {};

  defaultStoreData: {
    [key: string]: Partial<ILayoutData>;
  } = {};

  onUpdatorMapper: {
    [key: string]: PluginHookMethod;
  } = {};
  onAfterAddedMethodMapper: {
    [key: string]: PluginHookMethod;
  } = {};

  containerAccept: {
    [key: string]: string[];
  } = {};
  childContainerQtyMapper: {
    [key: string]: number;
  } = {};
  canOperationMapper: {
    [key: string]: boolean;
  } = {};
  register(plugin: IPlugin) {
    this.plugins.push(plugin);
    // 在画布区域展示的组件
    this.canvasComponentNodeMapper[plugin.name] = plugin.canvasComponent;
    // 在页面左侧区域展示的组件
    this.sideBarComponentNodeMapper[plugin.name] = plugin.sideBarComponent;
    // 在页面右侧区域展示的配置项
    this.propComponentNodeMapper[plugin.name] = plugin.propsComponent;
    // 组件默认数据
    this.defaultStoreData[plugin.name] = plugin.defaultData;

    // 组件增加后调用的钩子方法,未完善,todo
    if (plugin.onUpdate) {
      this.onUpdatorMapper[plugin.name] = plugin.onUpdate;
    }
    // 组件增加后调用的钩子方法,未完善,todo
    if (plugin.afterAdded) {
      this.onAfterAddedMethodMapper[plugin.name] = plugin.afterAdded;
    }
    // 子container个数
    if (plugin.childContainerQty) {
      this.childContainerQtyMapper[plugin.name] = plugin.childContainerQty;
    }
    // 组件是否可操作
    if (plugin.canOperation) {
      this.canOperationMapper[plugin.name] = plugin.canOperation;
    }
  }
  setAcceptMap(mapper: { [key: string]: string[] }) {
    this.containerAccept = mapper;
  }

  getIconByType = (type: string) => {
    return BaseEditor.IconMapper[type];
  };
  getIconTypes = () => {
    return (
      Object.keys(BaseEditor.IconMapper).map((item) => ({
        value: item,
        label: item,
      })) || []
    );
  };

  getCanvasComponentNode = (type: string): React.FC<any> => {
    return this.canvasComponentNodeMapper[type];
  };
  getCanOperation = (type: string): boolean => {
    return this.canOperationMapper[type];
  };
  getChildContainerQtyMapper = (type: string): number => {
    return this.childContainerQtyMapper[type];
  };
  getDefaultStoreDataByType = (type: string) => {
    return (
      { data: {}, children: {}, ...this.defaultStoreData[type], type } || {}
    );
  };

  getContainerAccept = (containerType: string) => {
    return this.containerAccept[containerType];
  };

  getSideBarComponentNode = (type: string): React.FC<any> => {
    return this.sideBarComponentNodeMapper[type];
  };
  getPropComponentNodeMapper = (type: string): React.FC<any> => {
    return this.propComponentNodeMapper[type];
  };

  SideBarDragComponentNode: React.FC<{
    type: string;
  }> = ({ type }) => {
    const deafultData = this.getDefaultStoreDataByType(type);
    const Comp = WithDragContainer(this.getSideBarComponentNode(type));
    return <Comp {...deafultData}></Comp>;
  };

  onUpdateEntity = (item: { type: string }, entity: any) => {
    const { dispatch } = this;
    dispatch(updateEntityById(entity));
  };
  onAddEntity = (item: { type: string }, entity: any) => {
    const { dispatch } = this;
    const { type } = item;

    const childContainerQty = this.getChildContainerQtyMapper(type);
    if (childContainerQty) {
      entity.childContainerQty = childContainerQty;
      entity.childData = this.getDefaultStoreDataByType("container");
    }

    dispatch(addChildById(entity));

    const onAfterTypeNodeAdded = this.onAfterAddedMethodMapper?.[type];
    // after
    if (!!onAfterTypeNodeAdded) {
      onAfterTypeNodeAdded({ item, entity, dispatch, context: this });
    }
  };
}

import { Dispatch } from "@reduxjs/toolkit";
import { ILayoutData } from "@store/features/editor";
import { BaseEditor } from "./BaseEditor";

export interface XYCoord {
  x: number;
  y: number;
}
export interface DragItem {
  type: string;
  width: number;
  height: number;
  parentId?: string;
  id: string;
}

export type PluginHookMethod = <T>(args: {
  item: { type: string };
  entity: any;
  dispatch: Dispatch;
  context?: BaseEditor;
}) => T | void;

export interface IPlugin {
  name: string;
  canOperation?: boolean;
  childContainerQty?: number;
  accept?: string[];
  defaultData: Partial<ILayoutData>;
  sideBarComponent: React.FC<any>;
  canvasComponent: React.FC<any>;
  propsComponent: React.FC<any>;
  onUpdate?: PluginHookMethod;
  afterAdded?: PluginHookMethod;
}

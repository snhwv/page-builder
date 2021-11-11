import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const IconButton: IPlugin = {
  name: "iconButton",

  canOperation: true,
  defaultData: {
    width: 1,
    height: 1,
    tempData: {
      color: "inherit",
      edge: "false",
      size: "medium",
      action: "",
      icon: "add",
    },
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default IconButton;

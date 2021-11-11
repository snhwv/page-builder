import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Line: IPlugin = {
  name: "line",
  
  defaultData: {
    width: 1,
    height: 1,
    tempData: {
      name: "checkbox",
      placeholder: "多选",
      defaultValue: "",
    },
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Line;

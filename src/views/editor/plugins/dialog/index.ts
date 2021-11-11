import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Dialog: IPlugin = {
  name: "dialog",
  
  defaultData: {
    width: 1,
    height: 1,
    tempData: {
      name: "checkbox",
      placeholder: "多选",
      defaultValue: "",
    },
    cols: 6,
    unitHeight: 50,
    margin: [10, 10],
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Dialog;

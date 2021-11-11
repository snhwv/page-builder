import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent, tempData } from "./SideBarComponent";

const Textarea: IPlugin = {
  name: "textarea",
  
  defaultData: {
    width: 2,
    height: 2,
    tempData,
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Textarea;

import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent, tempData } from "./SideBarComponent";

const Range: IPlugin = {
  name: "range",
  
  defaultData: {
    width: 2,
    height: 1,
    tempData,
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Range;

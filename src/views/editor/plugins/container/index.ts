import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Container: IPlugin = {
  name: "container",

  defaultData: {
    width: 1,
    height: 1,
    tempData: {},
    cols: 12,
    unitHeight: 50,
    margin: [10, 10],
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Container;

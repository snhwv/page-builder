import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Button: IPlugin = {
  name: "button",

  canOperation: true,
  defaultData: {
    width: 1,
    height: 1,
    tempData: {
      text: "ddd",
    },
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Button;

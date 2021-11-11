import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent,tempData } from "./SideBarComponent";

const Password: IPlugin = {
  name: "password",
  
  defaultData: {
    width: 1,
    height: 1,
    tempData,
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Password;

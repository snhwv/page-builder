import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent, tempData } from "./SideBarComponent";

// abstract class Plugin {
//   abstract name: string;
//   abstract defaultData: {};
//   abstract sideBarComponent: React.FC<any>;
//   abstract canvasComponent: React.FC<any>;
//   abstract propsComponent: React.FC<any>;
//   onUpdate: 
// }

// class Input extends Plugin {
//   name = "input";

//   defaultData = {
//     width: 1,
//     height: 1,
//     tempData,
//   };
//   sideBarComponent = SideBarComponent;
//   canvasComponent = CanvasComponent;
//   propsComponent = PropsComponent;
// }

const Input: IPlugin = {
  name: "input",

  defaultData: {
    width: 1,
    height: 1,
    tempData,
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Input;

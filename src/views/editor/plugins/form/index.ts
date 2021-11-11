import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Form: IPlugin = {
  name: "form",
  childContainerQty: 1,

  canOperation: true,
  defaultData: {
    width: 4,
    height: 4,
    tempData: {
      cols: 6,
      unitHeight: 60,
    },
    cols: 6,
    unitHeight: 50,
    margin: [10, 10],
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Form;

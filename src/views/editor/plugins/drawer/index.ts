import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Drawer: IPlugin = {
  name: "drawer",
  childContainerQty: 2,
  canOperation: true,
  defaultData: {
    width: 5,
    height: 5,
    visible: true,
    tempData: {},
    cols: 6,
    unitHeight: 50,
    margin: [10, 10],
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
  afterAdded: ({ dispatch, context, entity }) => {},
};

export default Drawer;

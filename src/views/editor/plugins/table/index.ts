import { IPlugin } from "@editor/constants/types";
import { CanvasComponent } from "./CanvasComponent";
import { PropsComponent } from "./PropsComponent";
import { SideBarComponent } from "./SideBarComponent";

const Table: IPlugin = {
  name: "table",

  canOperation: true,
  defaultData: {
    width: 4,
    height: 4,
    data: {
      isPaging: true,
      selectType: "No",
      tableType: "Normal",
      dataSource: '',
      columns: [
        { title: "表头1", field: "name" },
        { title: "表头2", field: "surname" },
        { title: "表头3", field: "birthYear" },
      ],
      pageOptions: [
        { value: "1", label: 5 },
        { value: "2", label: 10 },
        { value: "3", label: 15 },
      ],
    },
    tempData: {
      cols: 4,
      unitHeight: 40,
    },
    subChildren: {},
  },
  sideBarComponent: SideBarComponent,
  canvasComponent: CanvasComponent,
  propsComponent: PropsComponent,
};

export default Table;

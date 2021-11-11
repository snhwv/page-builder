export interface IRoutes {
  title: string;
  path: string;
  icon: string;
  children?: IRoutes[];
}
const routes: IRoutes[] = [
  {
    title: "销售管理",
    path: "/sale",
    icon: "",
    children: [
      {
        title: "销售管理1",
        path: "order",
        icon: "",
        children: [
          {
            title: "销售管2",
            path: "recive",
            icon: "",
          },
        ],
      },
      {
        title: "销售管理3",
        path: "invoice",
        icon: "",
      },
    ],
  },
  {
    title: "销售管理4",
    path: "/catalog",
    icon: "",
    children: [
      {
        title: "销售管理5",
        path: "poster",
        icon: "",
      },
      {
        title: "销售管理6",
        path: "category",
        icon: "",
      },
    ],
  },
];
export default routes;

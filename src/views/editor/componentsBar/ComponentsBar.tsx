import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEditorContext } from "../constants/EditorContext";
import { getCompId } from "../utils";

// 组件类数据
export const componentOriginData: {
  formField: string[];
  commonField: string[];
  containerField: string[];
} = {
  formField: [
    "range",
    "input",
    "select",
    "multipleSelect",
    "radio",
    "checkbox",
    "date",
    "password",
    "number",
    "textarea",
  ],
  commonField: ["text", "button", "line", "icon", "iconButton"],
  containerField: ["form", "subform", "drawer", "dialog", "table"],
};
// 组件分类
export const orginCategory: {
  [key: string]: { name: string; field: string };
} = {
  commonField: {
    name: "常用项",
    field: "commonField",
  },
  containerField: {
    name: "容器项",
    field: "containerField",
  },
  formField: {
    name: "表单项",
    field: "formField",
  },
};
const useStyle = makeStyles((theme: Theme) => ({
  accordionDetail: {
    flexWrap: "wrap",
    textAlign: "left",
    justifyContent: "space-between",
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 33.33%)",
    gridColumnGap: 10,
    "& > div > div": {
      width: 100,
      height: 100,
      display: "flex",
      // background: "red",
    },
  },
  form: {
    "& > div": {
      width: "100%",
      marginTop: "4px",
    },
  },
}));

const nameMpper: { [key: string]: string } = {
  number: "",
  button: "",
  checkbox: "",
  radio: "",
  textarea: "",
  text: "",
  icon: "",
  iconButton: "",
  range: "",
  input: "",
  select: "",
  multipleSelect: "",
  date: "",
  password: "",
  line: "",
  table: "表格",
  form: "表单",
  subform: "子表单",
  drawer: "抽屉",
  dialog: "弹框",
};

const Inner: React.FC<{ item: string }> = ({ item }) => {
  const context = useEditorContext();
  const DraggableComp = context.SideBarDragComponentNode;
  return (
    <div key={item} data-previewerid={getCompId(item)}>
      <DraggableComp type={item} key={item}></DraggableComp>
    </div>
  );
};
const FormComp: React.FC<any> = ({ propKey }) => {
  const style = useStyle();
  return (
    <div className={style.form}>
      {(componentOriginData as any)[propKey].map((item: string) => {
        return <Inner key={item} item={item}></Inner>;
      })}
    </div>
  );
};
const ContainerComp: React.FC<any> = ({ propKey }) => {
  const style = useStyle();
  return (
    <div className={style.container}>
      {(componentOriginData as any)[propKey].map((item: string) => {
        return (
          <div key={item}>
            <Inner item={item}></Inner>
            {nameMpper[item]}
          </div>
        );
      })}
    </div>
  );
};

const keys = Object.keys(orginCategory);
const expandDatas: {
  name: string;
  field: string;
  render: () => React.ReactElement;
}[] = [];
keys.forEach((key) => {
  expandDatas.push({
    ...orginCategory[key],
    render: () => {
      const obj: { [key: string]: any } = {
        formField: FormComp,
        commonField: FormComp,
        containerField: ContainerComp,
      };
      const Comp = obj[key];
      return (
        <React.Fragment>
          <Comp propKey={key}></Comp>
        </React.Fragment>
      );
    },
  });
});

const DraggableSideBar: React.FC<{}> = React.memo(() => {
  const style = useStyle();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <Box height={"100%"} p={2} width={400} boxSizing={"border-box"}>
        {expandDatas.map((item) => {
          return (
            <Accordion
              key={item.field}
              expanded={expanded === item.field}
              onChange={handleChange(item.field)}
            >
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <Typography>{item.name}</Typography>
              </AccordionSummary>
              <AccordionDetails className={style.accordionDetail}>
                {item.render()}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </React.Fragment>
  );
});

export default DraggableSideBar;

import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActionAll, updateEntityById } from "@store/features/editor";
import Form, { IFormData } from "@components/form";
import { useEditorContext } from "@editor/constants/EditorContext";

const useStyle = makeStyles(() => ({
  propForm: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&  > div": {
      width: "100%",
    },
  },
}));

export const PropsComponent: React.FC<any> = (props) => {
  const style = useStyle();
  const actionAll = useSelector(selectActionAll);
  const { id } = props;
  const { color = "", edge = "", size = "", action = "", icon = "" } =
    props?.tempData || {};
  const dispatch = useDispatch();
  const context = useEditorContext();
  const iconTypes = context.getIconTypes();

  const formData: IFormData[] = [
    {
      name: "color",
      placeholder: "颜色",
      type: "select",
      defaultValue: color,
      options: [
        { value: "inherit", label: "inherit" },
        { value: "primary", label: "primary" },
        { value: "secondary", label: "secondary" },
        { value: "default", label: "default" },
      ],
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                color: e || "inherit",
              },
            },
          })
        );
      },
    },
    {
      name: "edge",
      placeholder: "位置类型",
      type: "select",
      defaultValue: edge,
      options: [
        { value: "start", label: "start" },
        { value: "end", label: "end" },
        { value: "false", label: "false" },
      ],
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                edge: e || "false",
              },
            },
          })
        );
      },
    },
    {
      name: "size",
      placeholder: "大小",
      type: "select",
      defaultValue: size,
      options: [
        { value: "small", label: "small" },
        { value: "medium", label: "medium" },
        { value: "large", label: "large" },
      ],
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                size: e || "medium",
              },
            },
          })
        );
      },
    },
    {
      name: "action",
      placeholder: "动作",
      type: "select",
      defaultValue: action,
      options:
        actionAll.map((item) => ({ value: item.id, label: item.name })) || [],
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                action: e || "",
              },
            },
          })
        );
      },
    },
    {
      name: "icon",
      placeholder: "icon图标",
      type: "select",
      defaultValue: icon,
      options: iconTypes,
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                icon: e || undefined,
              },
            },
          })
        );
      },
    },
  ];
  return (
    <div>
      <Form fields={formData} className={style.propForm}></Form>
    </div>
  );
};
export default PropsComponent;

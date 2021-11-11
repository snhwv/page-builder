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
  const {
    text = "",
    color = "",
    variant = "",
    size = "",
    action = "",
    startIcon = "",
    endIcon = "",
  } = props?.tempData || {};
  const dispatch = useDispatch();
  const context = useEditorContext();
  const iconTypes = context.getIconTypes();
  const formData: IFormData[] = [
    {
      name: "text",
      placeholder: "文案",
      type: "input",
      defaultValue: text,
      onBlur: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                text: e?.target?.value || "",
              },
            },
          })
        );
      },
    },
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
                color: e || "primary",
              },
            },
          })
        );
      },
    },
    {
      name: "variant",
      placeholder: "类型",
      type: "select",
      defaultValue: variant,
      options: [
        { value: "text", label: "text" },
        { value: "contained", label: "contained" },
        { value: "outlined", label: "outlined" },
      ],
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                variant: e || "contained",
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
      name: "startIcon",
      placeholder: "startIcon图标",
      type: "select",
      defaultValue: startIcon,
      options: iconTypes,
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                startIcon: e || undefined,
              },
            },
          })
        );
      },
    },
    {
      name: "endIcon",
      placeholder: "endIcon图标",
      type: "select",
      defaultValue: endIcon,
      options: iconTypes,
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              tempData: {
                endIcon: e || undefined,
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

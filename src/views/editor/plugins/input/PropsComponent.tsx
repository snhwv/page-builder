import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteEntityById, updateEntityById } from "@store/features/editor";
import Form, { IFormData } from "@components/form";

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

export const PropsComponent: React.FC<any> = React.memo((props) => {
  const style = useStyle();
  // const { metaData } = props;
  const {
    id,
    tempData: { helperText, name, placeholder },
  } = props;
  const dispatch = useDispatch();

  const formData: IFormData[] = [
    {
      name: "placeholder",
      placeholder: "占位提示",
      type: "input",
      defaultValue: placeholder,
      onChange: (placeholder) => {
        dispatch(
          updateEntityById({
            id,
            payload: { tempData: { placeholder } },
          })
        );
      },
    },
    {
      name: "fieldKey",
      placeholder: "键值",
      type: "input",
      defaultValue: name,
      onChange: (name) => {
        dispatch(
          updateEntityById({
            id,
            payload: { tempData: { name } },
          })
        );
      },
    },
    {
      name: "helperText",
      placeholder: "描述信息",
      type: "input",
      defaultValue: helperText,
      onChange: (helperText) => {
        dispatch(
          updateEntityById({
            id,
            payload: { tempData: { helperText } },
          })
        );
      },
    },
    {
      name: "defaultValue",
      placeholder: "默认值",
      type: "select",
      defaultValue: "",
      options: [
        { value: "1", label: "自定义" },
        { value: "2", label: "公式编辑" },
        { value: "3", label: "数据联动" },
      ],
    },
    {
      name: "status",
      placeholder: "状态",
      type: "radio",
      defaultValue: "",
      options: [
        { value: "1", label: "普通" },
        { value: "2", label: "禁用" },
        { value: "3", label: "只读" },
        { value: "4", label: "隐藏" },
      ],
    },
    {
      name: "format",
      placeholder: "格式",
      type: "select",
      defaultValue: "",
      options: [
        { value: "1", label: "无" },
        { value: "2", label: "金额" },
        { value: "3", label: "日期" },
      ],
    },
    {
      name: "validate",
      placeholder: "校验",
      type: "select",
      defaultValue: "",
      options: [
        { value: "1", label: "必填" },
        { value: "2", label: "数字" },
        { value: "3", label: "最小长度" },
        { value: "4", label: "最大长度" },
        { value: "5", label: "自定义正则" },
      ],
    },
  ];
  const deleteHander = () => {
    dispatch(
      deleteEntityById({
        id,
      })
    );
  };
  return (
    <div>
      <Button onClick={deleteHander} variant="contained" color="secondary">
        删除
      </Button>
      <Form fields={formData} className={style.propForm}></Form>
    </div>
  );
});
export default PropsComponent;

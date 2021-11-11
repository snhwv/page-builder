import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { updateEntityById } from "@store/features/editor";
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
  const { unitHeight, cols, id } = props;
  const dispatch = useDispatch();

  const formData: IFormData[] = [
    {
      name: "unitHeight",
      placeholder: "单位高度",
      type: "number",
      defaultValue: unitHeight,
      onBlur: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              unitHeight: Number(e.target.value),
            },
          })
        );
      },
    },
    {
      name: "cols",
      placeholder: "列数",
      type: "number",
      defaultValue: cols,
      onBlur: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              cols: Number(e.target.value),
            },
          })
        );
      },
    },
    {
      name: "title",
      placeholder: "标题",
      type: "input",
      defaultValue: "",
      onChange: (title) => {
        // dispatch(
        //   layoutDataUpdateOne({
        //     id: metaData.id,
        //     changes: { tempData: { ...metaData.tempData, title } },
        //   })
        // );
      },
    },
    {
      name: "fieldKey",
      placeholder: "键值",
      type: "input",
      defaultValue: "",
      onChange: (name) => {
        // dispatch(
        //   layoutDataUpdateOne({
        //     id: metaData.id,
        //     changes: { tempData: { ...metaData.tempData, name } },
        //   })
        // );
      },
    },
    {
      name: "placeholder",
      placeholder: "占位提示",
      type: "input",
      defaultValue: "",
      onChange: (placeholder) => {
        // dispatch(
        //   layoutDataUpdateOne({
        //     id: metaData.id,
        //     changes: { tempData: { ...metaData.tempData, placeholder } },
        //   })
        // );
      },
    },
    {
      name: "helperText",
      placeholder: "描述信息",
      type: "input",
      defaultValue: "",
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
  return (
    <div>
      <Form fields={formData} className={style.propForm}></Form>
    </div>
  );
});
export default PropsComponent;

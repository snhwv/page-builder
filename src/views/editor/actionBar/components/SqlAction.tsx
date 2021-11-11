import Form, { IFormData } from "@components/form";
import { ISqlAction } from "@store/features/editor";
import React from "react";
const SqlAction: React.FC<ISqlAction> = ({ id, name, type }) => {
  const formData: IFormData[] = [
    {
      name: "method",
      placeholder: "请求方式",
      type: "select",
      defaultValue: "GET",
      options: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "DELETE", label: "DELETE" },
        { value: "PUT", label: "PUT" },
      ],
      rows: 3,
    },
    {
      name: "url",
      placeholder: "请求地址",
      type: "input",
      defaultValue: "",
      rows: 9,
    },
    {
      name: "query",
      type: "tableInput",
      title: "URL parameters",
      cols: [
        {
          key: "key",
          inputProps: {
            placeholder: "key",
          },
        },
        {
          key: "value",
          inputProps: {
            placeholder: "value",
          },
        },
      ],
      defaultValue: [],
    },
    {
      name: "data",
      type: "tableInput",
      title: "body",
      cols: [
        {
          key: "key",
          inputProps: {
            placeholder: "key",
          },
        },
        {
          key: "value",
          inputProps: {
            placeholder: "value",
          },
        },
      ],
      defaultValue: [],
    },
    {
      name: "headers",
      type: "tableInput",
      title: "Headers",
      cols: [
        {
          key: "key",
          inputProps: {
            placeholder: "key",
          },
        },
        {
          key: "value",
          inputProps: {
            placeholder: "value",
          },
        },
      ],
      defaultValue: [],
    },
    {
      name: "onSuccessActionId",
      placeholder: "成功回调",
      type: "select",
      defaultValue: "",
      options: [
        { value: "1", label: "新建action" },
        { value: "2", label: "aciton1" },
        { value: "3", label: "aciton2" },
      ],
      rows: 6,
    },
    {
      name: "onFailedActionId",
      placeholder: "失败回调",
      type: "select",
      defaultValue: "",
      options: [
        { value: "1", label: "新建action" },
        { value: "2", label: "aciton1" },
        { value: "3", label: "aciton2" },
      ],
      rows: 6,
    },
  ];
  return (
    <div>
      <Form fields={formData}></Form>
    </div>
  );
};
export default SqlAction;

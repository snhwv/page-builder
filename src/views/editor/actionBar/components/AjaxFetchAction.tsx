import React from "react";
import {
  actionDataUpdateOne,
  getActionDataById,
  IAjaxFetchAction,
} from "@store/features/editor";
import Form, { IFormData } from "@components/form";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";

const AjaxFetchAction: React.FC<IAjaxFetchAction> = ({ id, name, type }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) =>
    getActionDataById(state, id)
  ) as IAjaxFetchAction;
  const { method, url = "", query = [] } = cloneDeep(state);
  const formData: IFormData[] = [
    {
      name: "method",
      placeholder: "请求方式",
      type: "select",
      defaultValue: method,
      options: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "DELETE", label: "DELETE" },
        { value: "PUT", label: "PUT" },
      ],
      rows: 3,
      onChange: (e) => {
        dispatch(
          actionDataUpdateOne({
            id,
            changes: {
              method: e,
            },
          })
        );
      },
    },
    {
      name: "url",
      placeholder: "请求地址",
      type: "input",
      defaultValue: url,
      rows: 9,
      onBlur: (e) => {
        dispatch(
          actionDataUpdateOne({
            id,
            changes: {
              url: e.target.value || "",
            },
          })
        );
      },
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
      defaultValue: [...query],
      onChange: (e) => {
        // console.log(e);
        dispatch(
          actionDataUpdateOne({
            id,
            changes: {
              query: e || [],
            },
          })
        );
      },
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
export default AjaxFetchAction;

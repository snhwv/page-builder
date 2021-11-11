import FormField from "@components/form/FormItem";
import React from "react";

export const tempData = {
  name: "range",
  placeholder: "日期范围",
  startPlaceHolder: "开始日期",
  endPlaceHolder: "结束日期",
  defaultValue: [null, null],
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

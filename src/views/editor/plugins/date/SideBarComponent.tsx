import FormField from "@components/form/FormItem";
import React from "react";

export const tempData = {
  name: "birthday",
  placeholder: "日期",
  defaultValue: null,
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

import FormField from "@components/form/FormItem";
import React from "react";

export const tempData = {
  name: "age",
  placeholder: "单选",
  defaultValue: "",
  helperText: "sdafdsafsa",
  options: [{ value: 10, label: "ten" }],
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

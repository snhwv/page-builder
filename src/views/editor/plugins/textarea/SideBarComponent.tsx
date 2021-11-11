import FormField from "@components/form/FormItem";
import React from "react";
export const tempData = {
  name: "longtext",
  placeholder: "长文本",
  defaultValue: "",
  // rows: 2,
  helperText: "sdafdsafsa",
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

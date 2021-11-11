import FormField from "@components/form/FormItem";
import React from "react";


export const tempData = {
  name: "name",
  placeholder: "单行输入框",
  defaultValue: "",
  helperText: "sdafdsafsa",
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

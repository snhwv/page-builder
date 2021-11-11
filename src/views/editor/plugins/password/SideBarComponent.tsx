import FormField from "@components/form/FormItem";
import React from "react";


export const tempData = {
  name: "password",
  placeholder: "密码框",
  defaultValue: "",
  helperText: "sdafdsafsa",
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

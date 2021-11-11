import FormField from "@components/form/FormItem";
import React from "react";


export const tempData = {
  name: "number",
  placeholder: "数字",
  defaultValue: "",
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

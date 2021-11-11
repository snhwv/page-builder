import FormField from "@components/form/FormItem";
import React from "react";

export const tempData = {
  name: "checkbox",
  placeholder: "多选",
  defaultValue: "",
  options: [
    { value: "10", label: "ten" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
  ],
};
export const SideBarComponent: React.FC<{}> = (props) => {
  const defaultProps = tempData;
  return <FormField {...defaultProps} {...props}></FormField>;
};

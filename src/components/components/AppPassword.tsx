import React from "react";
import AppInput from "./AppInput";
const AppNumber: React.FC<any> = (props) => {
  return <AppInput {...props} type="password"></AppInput>;
};

export default AppNumber;

import React from "react";
import AppInput from "./AppInput";
const AppNumber: React.FC<any> = (props) => {
  return <AppInput {...props} type="number"></AppInput>;
};

export default AppNumber;

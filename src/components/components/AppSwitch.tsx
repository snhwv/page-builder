import { FilledInputProps, FormControlLabel, Switch } from "@material-ui/core";
import React from "react";

const IHowSwitch = ({
  onChange,
  placeholder,
  prefix,
  suffix,
  startAdornment,
  endAdornment,
  inputProps,
  placement,
  ...rest
}: FilledInputProps & any) => {
  const onChangeHandler = (e: any, a: any) => {
    onChange && onChange(a);
  };
  return (
    <FormControlLabel
      control={
        <Switch
          onChange={onChangeHandler}
          color="primary"
          {...rest}
          checked={!!rest.value}
        />
      }
      label={placeholder}
      labelPlacement={placement || "start"}
    />
  );
};

const AppSwitch = IHowSwitch;
export default AppSwitch;

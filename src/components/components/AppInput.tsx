import {
  FilledInput,
  FilledInputProps,
  Icon,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import React from "react";
import WithFormControl from "../form/hoc/withFormControl";

export const IHowFilledInput = ({
  inputRef,
  onChange,
  placeholder,
  prefix,
  suffix,
  startAdornment,
  endAdornment,
  inputProps,
  ...rest
}: FilledInputProps & any) => {
  const onChangeHandler = (e: any) => {
    onChange && onChange(e.target.value as any);
  };
  return (
    <FilledInput
      startAdornment={
        startAdornment ||
        (prefix && (
          <InputAdornment position="start">
            <IconButton edge="start">
              <Icon>{prefix}</Icon>
            </IconButton>
          </InputAdornment>
        ))
      }
      endAdornment={
        endAdornment ||
        (suffix && (
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon>{suffix}</Icon>
            </IconButton>
          </InputAdornment>
        ))
      }
      {...rest}
      inputProps={{
        ...(inputProps || {}),
        autoComplete: "new-password",
      }}
      onChange={onChangeHandler}
      ref={inputRef}
    />
  );
};

const AppFilledInput = WithFormControl(IHowFilledInput);
export default AppFilledInput;

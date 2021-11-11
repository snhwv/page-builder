import {
  FilledInput,
  FilledInputProps,
  Icon,
  IconButton,
  InputAdornment,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import WithFormControl from "../form/hoc/withFormControl";

const useStyle = makeStyles((theme: Theme) => {
  return {
    textarea: {
      "& textarea": {
        resize: "vertical",
        minHeight: (theme as any).input.lineHeight,
      },
    },
  };
});
const IHowTextarea = ({
  inputRef,
  onChange,
  placeholder,
  prefix,
  suffix,
  startAdornment,
  endAdornment,
  ...rest
}: FilledInputProps & any) => {
  const onChangeHandler = (e: any) => {
    onChange && onChange(e.target.value as any);
  };
  const style = useStyle();
  return (
    <FilledInput
      multiline
      className={style.textarea}
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
      onChange={onChangeHandler}
      ref={inputRef}
    />
  );
};

const AppTextarea = WithFormControl(IHowTextarea);
export default AppTextarea;

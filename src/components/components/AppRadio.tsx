import {
  FilledInputProps,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from "@material-ui/core";
import React from "react";
import WithFormControl from "../form/hoc/withFormControl";

const useStyle = makeStyles((theme: Theme) => ({
  radio: {
    display: "inline-flex",
    "& > div.MuiFormControl-root": {
      width: "auto",
    },
  },
}));
const IHowRadio = ({
  inputRef,
  onChange,
  placeholder,
  prefix,
  suffix,
  startAdornment,
  endAdornment,
  options,
  hasLabel,
  inputProps,
  ...rest
}: FilledInputProps & any) => {
  const onChangeHandler = (e: any) => {
    onChange && onChange(e.target.value as any);
  };
  return (
    <React.Fragment>
      <FormLabel>{placeholder || "请选择"}</FormLabel>
      <RadioGroup row {...rest} onChange={onChangeHandler} ref={inputRef}>
        {options?.map((item: any) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </React.Fragment>
  );
};

// const AppRadio = WithFormControl(IHowRadio);
const AppRadio = (props: any) => {
  const style = useStyle();
  return (
    <div className={style.radio}>
      {WithFormControl(IHowRadio)({ ...props, hasLabel: false })}
    </div>
  );
};
export default AppRadio;

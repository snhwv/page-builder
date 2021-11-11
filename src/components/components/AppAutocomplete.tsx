import { FilledInputProps, TextField } from "@material-ui/core";
import React from "react";
import WithFormControl from "../form/hoc/withFormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    autoComplete: {
      "& > .MuiFormControl-root.MuiTextField-root": { margin: 0 },
    },
  })
);
const IHowAutocomplete = ({
  inputRef,
  onChange,
  options,
  value,
  ...rest
}: FilledInputProps & any) => {
  const onChangeHandler = (e: any, newValue: any[]) => {
    onChange && onChange(newValue as any);
  };
  const style = useStyles();
  return (
    <Autocomplete
      ref={inputRef}
      multiple
      limitTags={2}
      getOptionSelected={(option, value) => {
        return option.value === value.value;
      }}
      getOptionLabel={(option: any) => {
        return option.label + '';
      }}
      options={options || []}
      className={style.autoComplete}
      value={value}
      onChange={onChangeHandler}
      filterSelectedOptions
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            size="small"
            variant="filled"
            label={rest.label}
          />
        );
      }}
    />
  );
};

const AppAutocomplete = (props: any) => {
  const Comp = WithFormControl(IHowAutocomplete);
  return <Comp {...props} label={props.placeholder} placeholder=""></Comp>;
};
export default AppAutocomplete;

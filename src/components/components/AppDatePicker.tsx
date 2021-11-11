import { TextField } from "@material-ui/core";
import { BasePickerProps, DatePicker } from "@material-ui/pickers";
import { ResponsiveWrapperProps } from "@material-ui/pickers/wrappers/ResponsiveWrapper";
import React from "react";

const IHowDatePicker = (
  props: ResponsiveWrapperProps &
    BasePickerProps & { placeholder?: string; helperText?: string }
) => {
  const { placeholder = "", helperText = "" } = props;
  return (
    <DatePicker
      {...props}
      renderInput={(lprops) => {
        return (
          <TextField
            {...{
              ...lprops,
              inputProps: {
                ...lprops.inputProps,
              },
            }}
            label={placeholder}
            variant="filled"
            helperText={helperText}
            size="small"
          />
        );
      }}
    />
  );
};
const AppDatePicker = IHowDatePicker;
export default AppDatePicker;

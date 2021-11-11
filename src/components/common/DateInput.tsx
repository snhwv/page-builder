import React, { forwardRef } from "react";
import { MuiTextFieldProps } from "@material-ui/pickers/_shared/PureDateInput";
import AppFilledInput from "../components/AppInput";
const DateInput: React.FC<MuiTextFieldProps> = forwardRef(
  ({ inputRef, inputProps, InputProps }, ref) => (
    <AppFilledInput
      endAdornment={InputProps?.endAdornment}
      inputRef={inputRef || ref}
      {...(inputProps as any)}
      suffix="event"
    />
  )
);

export default DateInput;

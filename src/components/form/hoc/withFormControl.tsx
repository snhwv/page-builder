import { FormControl } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import React from "react";

const WithFormControl: (component: React.FC<any>) => React.FC<any> = (
  WrapedComponent
) => (props: {
  options: { value: string; label: string }[];
  hasLabel?: boolean;
  helperText?: string;
  placeholder?: string;
  name: string;
  errors: any;
}) => {
  const {
    hasLabel = true,
    placeholder = "",
    helperText = "",
    errors = {},
    ...rest
  } = props;
  const isError = Object.keys(errors).includes(rest.name);
  let msg = "";
  if (isError) {
    msg = errors[rest.name].message;
  }
  return (
    <FormControl variant="filled" size="small" error={isError}>
      {hasLabel && <InputLabel>{placeholder}</InputLabel>}
      <WrapedComponent {...rest} placeholder={placeholder} />
      {(msg || helperText) && <FormHelperText>{msg || helperText}</FormHelperText>}
    </FormControl>
  );
};
export default WithFormControl;

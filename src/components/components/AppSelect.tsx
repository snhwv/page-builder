import WithFormControl from "../form/hoc/withFormControl";
import {
  Select,
  MenuItem,
  SelectProps,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme: any) => ({
  select: {
    "& .MuiSelect-root": {
      height: theme.input.lineHeight,
    },
  },
}));

const IHowSelect: React.FC<
  SelectProps & { options: { value: string; label: string }[] }
> = ({ options = [], onChange, placeholder, ...rest }) => {
  const onChangeHandler = (e: any) => {
    onChange && onChange(e.target.value as any, {});
  };
  const style = useStyle();
  return (
    <Select
      {...rest}
      className={style.select}
      onChange={onChangeHandler}
      label={placeholder}
    >
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Typography>{item.label}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

const AppSelect = WithFormControl(IHowSelect);

export default AppSelect;

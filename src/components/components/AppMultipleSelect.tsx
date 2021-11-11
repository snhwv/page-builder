import WithFormControl from "../form/hoc/withFormControl";
import {
  Select,
  MenuItem,
  SelectProps,
  Chip,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);
const IHowMultipleSelect: React.FC<
  SelectProps & { options: { value: string; label: string }[] }
> = ({ options = [], onChange, placeholder, ...rest }) => {
  const onChangeHandler = (e: any) => {
    onChange && onChange(e.target.value as any, {});
  };
  const style = useStyles();
  return (
    <Select
      {...rest}
      multiple
      onChange={onChangeHandler}
      label={placeholder}
      renderValue={(selected) => (
        <div className={style.chips}>
          {(selected as string[]).map((value) => (
            <Chip key={value} label={value} className={style.chip} />
          ))}
        </div>
      )}
    >
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

const AppMultipleSelect = WithFormControl(IHowMultipleSelect);

export default AppMultipleSelect;

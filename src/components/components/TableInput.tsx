import { TableInputCol } from "@components/form";
import { FilledInputProps, FormLabel, IconButton } from "@material-ui/core";
import React from "react";
import WithFormControl from "../form/hoc/withFormControl";
import IHowFilledInput from "./AppInput";
import ClearIcon from "@material-ui/icons/Clear";

export const IHowFilledTableInput = ({
  onChange,
  cols,
  defaultValue,
  value,
  name,
  title,
  autoAdd = true,
  hasDelete = true,
  ...rest
}: FilledInputProps & any) => {
  const onChangeHandler = (value: any) => {
    onChange && onChange([...value] as any);
  };

  const cellChangeHandler = (index: number, key: string) => (
    cellVal: string
  ) => {
    value[index][key] = cellVal;
    const hasValue = Object.keys(value[index]).some(
      (item) => value[index][item]
    );
    if (!hasValue && value.length > 1) {
      value.splice(index, 1);
    }
    if (hasValue && value.length - 1 === index) {
      autoAdd && value.push({});
    }
    onChangeHandler(value);
  };
  if (!value.length) {
    autoAdd && value.push({});
  }
  const deleteClickHandler = (index: number) => () => {
    if (value.length <= 1) {
      return;
    }
    value.splice(index, 1);
    onChangeHandler(value);
  };
  return (
    <React.Fragment>
      {title && <FormLabel>{title}</FormLabel>}
      {value?.map((val: { [key: string]: string }, index: number) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            key={index}
          >
            {cols?.map((item: TableInputCol) => {
              return item?.isStatic ? (
                <div>{val?.[item.key] || ""}</div>
              ) : (
                <IHowFilledInput
                  key={index + item.key}
                  onChange={cellChangeHandler(index, item.key)}
                  {...item.inputProps}
                  name={`${name}[${index}].${item.key}`}
                  value={val?.[item.key] || ""}
                ></IHowFilledInput>
              );
            })}
            {hasDelete && (
              <IconButton onClick={deleteClickHandler(index)}>
                <ClearIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};

const AppFilledTableInput = WithFormControl(IHowFilledTableInput);
export default AppFilledTableInput;

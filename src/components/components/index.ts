import React from "react";
import AppCheckbox from "./AppCheckbox";
import AppDatePicker from "./AppDatePicker";
import AppDateRangePicker from "./AppDateRangePicker";
import AppInput from "./AppInput";
import AppSwitch from "./AppSwitch";
import AppAutocomplete from "./AppAutocomplete";
import AppMultipleSelect from "./AppMultipleSelect";
import AppNumber from "./AppNumber";
import AppPassword from "./AppPassword";
import AppRadio from "./AppRadio";
import AppSelect from "./AppSelect";
import AppTextarea from "./AppTextarea";
import TableInput from "./TableInput";

const formItems = {
  date: React.memo(AppDatePicker),
  range: React.memo(AppDateRangePicker),
  input: React.memo(AppInput),
  switch: React.memo(AppSwitch),
  autocomplete: React.memo(AppAutocomplete),
  // input: AppInput,
  select: React.memo(AppSelect),
  textarea: React.memo(AppTextarea),
  number: React.memo(AppNumber),
  radio: React.memo(AppRadio),
  checkbox: React.memo(AppCheckbox),
  multipleSelect: React.memo(AppMultipleSelect),
  password: React.memo(AppPassword),
  tableInput: React.memo(TableInput),
};

export type formItemTypes = typeof formItems;
export type formItemKeys = keyof formItemTypes;
export const getFormByType = (type: formItemKeys) => {
  return formItems[type];
};

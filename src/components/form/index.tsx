import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
} from "react";
import { formItemKeys } from "../components";
import FormField from "./FormItem";
import { FilledInputProps, Grid, makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const getSchema = (fields: IFormData[]) => {
  const obj: {
    [key: string]: any;
  } = {};
  fields.forEach((field) => {
    obj[field.name] = field.validator;
  });
  const schema = yup.object().shape(
    obj
    //   {
    //   firstName: yup.string().required(),
    //   age: yup.number().positive().integer().required(),
    // }
  );
  return schema;
};

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiFormControl-root": {
      margin: theme.spacing(1),
      minWidth: 200,
      textAlign: "left",
      width: "100%",
    },
    "& .MuiFormControlLabel-root": {
      width: "100%",
    },
  },
  gridItem: {
    display: "flex",
    alignItems: "flex-end",
  },
}));

export interface TableInputCol {
  key: string;
  isStatic?: boolean;
  inputProps?: FilledInputProps;
  value?: string;
}

export interface IFormData {
  name: string;
  helperText?: string;
  type: formItemKeys;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  startPlaceHolder?: string;
  endPlaceHolder?: string;
  validator?: any;
  rows?: number;
  disabled?: boolean;
  inputProps?: {
    [key: string]: string | number;
  };
  metaData?: any;
  options?: { value: string | number; label: string | number }[];
  defaultValue?: any | any[];
  value?: any | any[];
  hasDelete?: boolean;
  autoAdd?: boolean;
  title?: string;
  cols?: TableInputCol[];
  onChange?: (value: any) => void;
  onBlur?: (e: any, value: any) => void;
}

const Form: ForwardRefRenderFunction<
  { handleSubmit: any },
  {
    fields: IFormData[];
    className?: string;
    initialValues?: any;
    onValidate?: (v: any) => void;
    onFailed?: (v: any) => void;
  }
> = (
  {
    fields = [],
    className = "",
    onValidate = () => {},
    onFailed,
    initialValues = {},
  },
  ref
) => {
  const { handleSubmit, control, errors, setValue } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(getSchema(fields)),
  });
  useEffect(() => {
    const keys = Object.keys(initialValues);
    keys.map((key) => setValue(key, initialValues[key]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);
  const style = useStyle();
  useImperativeHandle(ref, () => ({
    handleSubmit: () => handleSubmit(onValidate, onFailed)(),
  }));
  return (
    <form className={clsx(style.root, className)}>
      <Grid container>
        {fields.map((item) => {
          return (
            <Grid
              key={item.name}
              item
              xs={(item.rows as any) || 12}
              className={style.gridItem}
            >
              <FormField
                {...item}
                control={control}
                errors={errors}
                setValue={setValue}
              ></FormField>
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};
export default forwardRef(Form);

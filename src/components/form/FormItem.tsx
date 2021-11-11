import React, { useState, useEffect } from "react";
import { getFormByType } from "../components";
import { Controller } from "react-hook-form";

const FormField: React.FC<any> = React.memo((props) => {
  const { type, defaultValue, control, onChange, setValue, ...rest } = props;
  const [data, setData] = useState(defaultValue);
  const handleDataChange = (data: any) => {
    onChange && onChange(data);
    setData(data);
  };
  const Component = React.useMemo(() => {
    return getFormByType(type);
  }, [type]);
  useEffect(() => {
    setValue && setValue(rest.name, defaultValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  return (
    <React.Fragment>
      {control ? (
        <Controller
          control={control}
          defaultValue={defaultValue}
          {...rest}
          render={({ onChange, value }: any) => {
            return (
              <Component
                onChange={(e: any) => {
                  handleDataChange(e);
                  onChange(e);
                }}
                {...rest}
                value={value}
              ></Component>
            );
          }}
        />
      ) : (
        <Component
          value={data}
          onChange={(e: any) => {
            onChange(e);
            handleDataChange(e);
          }}
          {...rest}
        ></Component>
      )}
    </React.Fragment>
  );
});
export default FormField;

import { makeStyles, TextField, Theme } from "@material-ui/core";
import React from "react";
import {
  BasePickerProps,
  DateRangeDelimiter,
  DateRangePicker,
  RangeInput,
} from "@material-ui/pickers";
import { ResponsiveWrapperProps } from "@material-ui/pickers/wrappers/ResponsiveWrapper";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
const useStyle = makeStyles((theme: Theme) => {
  return {
    dataRangeFormControl: {
      // margin: theme.spacing(1),
      display: "inline-block",
      "& .MuiFormControl-root:first-child": {
        marginRight: 0,
      },
      "& .MuiFormControl-root:last-child": {
        marginLeft: 0,
      },
    },
    delimiter: {
      width: theme.spacing(2),
      margin: 0,
      textAlign: "center",
    },
  };
});
const IHowDateRangePicker = (
  props: ResponsiveWrapperProps &
    BasePickerProps<ParsableDate[], any> & {
      value: RangeInput<ParsableDate>;
      startPlaceHolder?: string;
      endPlaceHolder?: string;
    }
) => {
  const { startPlaceHolder = "", endPlaceHolder = "" } = props;
  const style = useStyle();
  return (
    <div className={style.dataRangeFormControl + ' dateRangePicker'}>
      <DateRangePicker
        startText={startPlaceHolder}
        endText={endPlaceHolder}
        {...props}
        renderInput={(startProps, endProps) => {
          return (
            <React.Fragment>
              <TextField
                {...{
                  ...startProps,
                  inputProps: {
                    ...startProps.inputProps,
                    placeholder: undefined,
                  },
                }}
                label={startPlaceHolder}
                variant="filled"
                helperText={undefined}
                size="small"
              />
              <DateRangeDelimiter className={style.delimiter}>
                -
              </DateRangeDelimiter>
              <TextField
                {...{
                  ...endProps,
                  inputProps: {
                    ...endProps.inputProps,
                    placeholder: undefined,
                  },
                }}
                label={endPlaceHolder}
                variant="filled"
                helperText={undefined}
                size="small"
              />
              {/* <DateInput
                {...{
                  ...endProps,
                  inputProps: {
                    ...endProps.inputProps,
                    placeholder: endPlaceHolder,
                  },
                }}
              /> */}
            </React.Fragment>
          );
        }}
      />
    </div>
  );
};
const AppDateRangePicker = IHowDateRangePicker;
export default AppDateRangePicker;

import * as yup from "yup";
export const required = (msg: string = '请填写') => {
  return yup.string().required(msg);
};

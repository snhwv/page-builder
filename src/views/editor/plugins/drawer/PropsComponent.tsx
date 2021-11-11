import {  makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { updateEntityById } from "@store/features/editor";
import Form, { IFormData } from "@components/form";

const useStyle = makeStyles(() => ({
  propForm: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&  > div": {
      width: "100%",
    },
  },
}));

export const PropsComponent: React.FC<any> = (props) => {
  const style = useStyle();
  const {
    id,
    tempData: { zIndex },
  } = props;
  const dispatch = useDispatch();

  const formData: IFormData[] = [
    {
      name: "zIndex",
      placeholder: "zIndex",
      type: "number",
      defaultValue: zIndex || 0,
      onChange: (zIndex) => {
        dispatch(
          updateEntityById({
            id,
            payload: { tempData: { zIndex } },
          })
        );
      },
    },
  ];
  return (
    <div>
      <Form fields={formData} className={style.propForm}></Form>
    </div>
  );
};
export default PropsComponent;

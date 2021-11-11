import React from "react";
import {
  actionDataUpdateOne,
  getActionDataById,
  getCanToggleVisible,
  IToggleVisibleAction,
} from "@store/features/editor";
import Form, { IFormData } from "@components/form";
import { useDispatch, useSelector } from "react-redux";

const ToggleVisibleActionComp: React.FC<IToggleVisibleAction> = ({
  id,
  name,
  type,
}) => {
  const canVisibleComponents = useSelector(getCanToggleVisible) || [];
  const actionData = useSelector((state) =>
    getActionDataById(state, id)
  ) as IToggleVisibleAction;
  const { component = "" } = actionData;
  const dispatch = useDispatch();
  const formData: IFormData[] = [
    {
      name: "component",
      placeholder: "组件",
      type: "select",
      defaultValue: component,
      options: canVisibleComponents.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      rows: 3,
      onChange: (e) => {
        dispatch(
          actionDataUpdateOne({
            id,
            changes: {
              component: e,
            },
            // type,
            // name,
            // id,
            // payload: {
            //   tempData: {
            //     color: e || "primary",
            //   },
            // },
          })
        );
      },
    },
  ];
  return (
    <div>
      <Form fields={formData}></Form>
    </div>
  );
};
export default ToggleVisibleActionComp;

import React from "react";
const Accept = [
  "input",
  "checkbox",
  "date",
  "multipleSelect",
  "number",
  "password",
  "radio",
  "range",
  "select",
  "subform",
  "textarea",
  "button",
];
export const CanvasComponent: React.FC<any> = (props) => {
  const { containerChildrenDataArr, DropTemplate } = props || {};
  return (
    <div style={{ width: "100%", height: "100%", background: "#bdd8a6" }}>
      {containerChildrenDataArr?.[0] && (
        <DropTemplate
          {...containerChildrenDataArr[0]}
          accept={Accept}
        ></DropTemplate>
      )}
    </div>
  );
};

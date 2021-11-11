import FormField from "@components/form/FormItem";
import React from "react";
export const CanvasComponent: React.FC<any> = (props) => (
  <div
    ref={props.getRef}
    style={{ width: "100%", height: "100%", background: "#ecc3f2" }}
  >
    {props.children}
  </div>
);

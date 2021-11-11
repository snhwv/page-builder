import React from "react";
import { IJsAction } from "@store/features/editor";
import CodeEditor from "@components/components/CodeEditor";

const JSAction: React.FC<IJsAction> = (props) => {
  return <CodeEditor></CodeEditor>;
};
export default JSAction;

import React from "react";
import WithDropContainer, {
  InnerDropComponent,
} from "../dragAndDrop/withDropContainer";

export interface ContentProps {}
const bgColor = "#fbfbfb";
const pointColor = "transparent";
const style = {
  width: "100%",
  minHeight: 1500,
  background: "transparent",
  backgroundImage: `linear-gradient(${bgColor} calc(100% - 2px),transparent 0),linear-gradient(90deg,${pointColor} 2px,${bgColor} 0)`,
  backgroundSize: `8.33333% 30px`,
  backgroundPositionX: `-1px`,
};
const CanvasBar: React.FC<any> = (props) => {
  const { getRef } = props;
  return (
    <div ref={getRef} style={style}>
      <InnerDropComponent {...props}></InnerDropComponent>
    </div>
  );
};

export default WithDropContainer(CanvasBar);

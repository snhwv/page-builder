import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { getCompId } from "../utils";

const useStyle = makeStyles((theme: Theme) => ({
  previewCont: {
    "& > div": {
      transform: "none !important",
      position: "static !important",
    },
    "& .MuiFormControl-root": {
      width: "100%",
      minWidth: "100px",
    },
  },
}));
const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  textAlign: "left",
};

function getItemStyles(
  initialOffset: XYCoord | null,
  dOffset: XYCoord | null,
  initialSourceClientOffset: XYCoord | null
) {
  if (!initialOffset || !dOffset || !initialSourceClientOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = initialOffset;
  let { x: dx, y: dy } = dOffset;
  let { x: sx, y: sy } = initialSourceClientOffset;

  const transform = `translate(${dx + x - (x - sx)}px, ${dy + y - (y - sy)}px)`;
  return {
    transform,
    WebkitTransform: transform,
    display: "inline-block",
  };
}

export interface MovePreviewerProps {}

export const MovePreviewer: React.FC<MovePreviewerProps> = (props) => {
  const {
    item,
    isDragging,
    getInitialClientOffset,
    getDifferenceFromInitialOffset,
    getInitialSourceClientOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    getInitialClientOffset: monitor.getInitialClientOffset(),
    getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    getInitialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    getClientOffset: monitor.getClientOffset(),
    getSourceClientOffset: monitor.getSourceClientOffset(),
  }));
  const style = useStyle();
  function renderItem() {
    const { type, id } = item;
    let rId = "";
    if (!id) {
      rId = getCompId(type);
    } else {
      rId = getCompId(id);
    }
    const el = document.querySelector(`div[data-previewerid=${rId}]`)!;
    return (
      <div
        className={style.previewCont}
        // style={{ width: 100, background: "red" }}
        dangerouslySetInnerHTML={{ __html: el?.outerHTML }}
      ></div>
    );
  }

  if (!isDragging) {
    return null;
  }

  // 相对body，开始的位置
  // console.log(getInitialClientOffset);
  // console.log(getDifferenceFromInitialOffset);
  // 相对body, 组件的位置
  // console.log(getInitialSourceClientOffset);
  // console.log(getClientOffset);
  // console.log(getSourceClientOffset);
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          getInitialClientOffset,
          getDifferenceFromInitialOffset,
          getInitialSourceClientOffset
        )}
      >
        {renderItem()}
      </div>
    </div>
  );
};

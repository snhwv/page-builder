import React, { useRef, useState } from "react";
import WithDragContainer from "../dragAndDrop/withDragContainer";
import { Resizable } from "re-resizable";
import { useEditorContext } from "../constants/EditorContext";
import { ILayoutData } from "@store/features/editor";

const style = {
  display: "flex",
  overflow: "visible",
  justifyContent: "center",
};

export type NumberSize = {
  width: number;
  height: number;
};

export const ResizableDragComponentNode: React.FC<{
  type: string;
  id: string;
  width: number;
  height: number;
  parentId: string;
  containerChildren?: ILayoutData;
  onResize?: (delta: NumberSize) => void;
  onResizeStart?: () => void;
  onResizeStop?: (delta: NumberSize) => NumberSize | undefined;
}> = React.memo(({ type, onResize, onResizeStop, onResizeStart, ...rest }) => {
  const resizeRef = useRef<any>(null);
  const context = useEditorContext();
  let Comp = WithDragContainer<{ id: string; type?: string }>(
    context.getCanvasComponentNode(type)
  );

  const [opacity, setOpacity] = useState(1);

  const localOnResize = (
    event: MouseEvent | TouchEvent,
    direction: string,
    elementRef: HTMLElement,
    delta: NumberSize
  ) => {
    onResize && onResize(delta);
  };

  const localOnResizeStop = (
    event: MouseEvent | TouchEvent,
    direction: string,
    elementRef: HTMLElement,
    delta: NumberSize
  ) => {
    const result = onResizeStop && onResizeStop(delta);
    if (result && resizeRef.current) {
      resizeRef.current?.updateSize(result);
      setOpacity(1);
    }
  };

  const localOnResizeStart = () => {
    onResizeStart && onResizeStart();
    setOpacity(0.4);
  };

  const { containerChildren } = rest || {};
  const DropTemplate = context.getCanvasComponentNode("container");
  let newChildren = Object.values(containerChildren || {});
  return (
    <Resizable
      style={{ ...style, opacity }}
      ref={resizeRef}
      defaultSize={{ width: "100%", height: "100%" }}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={localOnResize}
      onResizeStop={localOnResizeStop}
      onResizeStart={localOnResizeStart}
    >
      <Comp
        {...rest}
        type={type}
        containerChildrenDataArr={newChildren}
        DropTemplate={DropTemplate}
      ></Comp>
    </Resizable>
  );
});

import React from "react";
import { IconButton } from "@material-ui/core";
import { fireAction } from "@store/features/editor";
import { useDispatch } from "react-redux";
import { useEditorContext } from "@editor/constants/EditorContext";
export const CanvasComponent: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const context = useEditorContext();
  // 与button组件类似，能fireAction
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const btnClickHandler = () => {
    const { action } = props;
    action && dispatch(fireAction(action));
  };
  const { icon = "add", color = "inherit", edge } = props;
  return (
    <IconButton edge={edge} color={color}>
      {context.getIconByType(icon)}
    </IconButton>
  );
};

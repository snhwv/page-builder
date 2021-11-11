import { Button } from "@material-ui/core";
import { fireAction } from "@store/features/editor";
import React from "react";
import { useDispatch } from "react-redux";
import { useEditorContext } from "@editor/constants/EditorContext";
export const CanvasComponent: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const btnClickHandler = () => {
    const { action } = props;
    action && dispatch(fireAction(action));
  };
  const context = useEditorContext();
  const {
    color = "primary",
    variant = "contained",
    size = "small",
    startIcon,
    endIcon,
  } = props;
  const StartIconComp = context.getIconByType(startIcon);
  const EndIconComp = context.getIconByType(endIcon);
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      startIcon={StartIconComp || undefined}
      endIcon={EndIconComp || undefined}
      style={{ width: "100%", height: "100%" }}
      onClick={btnClickHandler}
    >
      {props?.text || "button"}
    </Button>
  );
};

import { Motion, presets, spring } from "react-motion";
import { Box, Button, Fab, Icon, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLayoutActiveData } from "@store/features/editor/layoutActiveSlice";
import { deleteEntityById } from "@store/features/editor";
import { useEditorContext } from "@editor/constants/EditorContext";
const initWidth = 40;
const paperOpenWidth = 340;

const useStyle = makeStyles(() => ({
  propBar: {
    textAlign: "left",
    height: "100%",
    minWidth: initWidth + "px",
    position: "relative",
    boxSizing: "border-box",
  },
  explanBtn: {
    position: "absolute",
    left: "0",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  panel: {
    "& .MuiFormControlLabel-root": {
      width: "100%",
      margin: "0",
    },
  },
}));

const ComponentSwitcher = React.memo(() => {
  const layoutActiveData: any = useSelector(getLayoutActiveData);
  if (!layoutActiveData?.id) {
    return null;
  }
  return <CacheComp {...layoutActiveData}></CacheComp>;
});

const CacheComp = React.memo(
  (props: any) => {
    const { type, id } = props;
    const context = useEditorContext();
    const Component = context.getPropComponentNodeMapper(type);
    const dispatch = useDispatch();
    const deleteHander = () => {
      dispatch(
        deleteEntityById({
          id,
        })
      );
    };
    return (
      <>
        <Button onClick={deleteHander} variant="contained" color="secondary">
          删除
        </Button>
        <Component {...props}></Component>
      </>
    );
  },
  (prev, next) => prev.id === next.id
);

const PropsBar: React.FC<{
  onWidthChange?: (isOpen: boolean, width: number) => void;
}> = React.memo(({ onWidthChange }) => {
  const expandHandler = () => {
    setOpen(!open);
  };
  const style = useStyle();

  const [open, setOpen] = useState(false);

  const getContent = (interpolatingStyle: any) => {
    if (
      onWidthChange &&
      ((open && paperOpenWidth === interpolatingStyle.width) ||
        (!open && initWidth === interpolatingStyle.width))
    ) {
      setTimeout(() => {
        onWidthChange(open, open ? paperOpenWidth : initWidth);
      }, 0);
    }
    return (
      <Paper className={style.propBar} elevation={3} style={interpolatingStyle}>
        <Fab
          className={style.explanBtn}
          color="secondary"
          onClick={expandHandler}
          aria-label="edit"
          size="small"
        >
          <Icon>edit</Icon>
        </Fab>

        {open && (
          <Box
            pl={2}
            pt={2}
            pr={2}
            overflow={"auto"}
            height={"100%"}
            className={style.panel}
          >
            <ComponentSwitcher></ComponentSwitcher>
          </Box>
        )}
      </Paper>
    );
  };
  return (
    <Motion
      defaultStyle={{ width: initWidth }}
      style={{
        width: spring(open ? paperOpenWidth : initWidth, presets.gentle),
      }}
    >
      {getContent}
    </Motion>
  );
});
export default PropsBar;

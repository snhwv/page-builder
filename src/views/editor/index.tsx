import React from "react";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MovePreviewer } from "./dragAndDrop/MovePreviewer";
import ActionBar from "./actionBar";
import DraggableSideBar from "./componentsBar/ComponentsBar";
import PropsBar from "./propsBar/PropsBar";
import CanvasBar from "./canvasBar/CanvasBar";
import { Resizable } from "re-resizable";
import { ROOT_ID } from "@store/features/editor";
import { EditorContextProvider } from "./constants/EditorContext";
const useStyle = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  full: { width: "100%", height: "100%" },
  fixRight: {
    right: "0",
    height: "100%",
  },
  editorContainer: {
    overflow: "auto",
    height: "100%",
    padding: 10,
  },
  actionBar: {
    maxWidth: "100%",
    // height: 600,
  },
}));

const Editor = () => {
  const style = useStyle();
  return (
    <React.Fragment>
      <EditorContextProvider>
        <DndProvider backend={HTML5Backend}>
          {/* 拖动时显示组件 */}
          <MovePreviewer />
          <Grid container className={style.fullHeight}>
            <Grid item style={{ overflowY: "auto", height: "100%" }}>
              {/* 组件库 */}
              <DraggableSideBar></DraggableSideBar>
            </Grid>
            <Grid
              container
              item
              xs
              direction={"column"}
              style={{ height: "100%" }}
            >
              {/* 画布 */}
              <div style={{ width: "100%", flex: 1, overflowY: "auto" }}>
                <CanvasBar
                  id={ROOT_ID}
                  accept={[
                    "range",
                    "input",
                    "select",
                    "multipleSelect",
                    "radio",
                    "checkbox",
                    "date",
                    "password",
                    "number",
                    "textarea",
                    "form",
                    "table",
                    "button",
                    "drawer",
                    // "iconButton"
                  ]}
                ></CanvasBar>
              </div>
              {/* action配置列表 */}
              <Resizable
                defaultSize={{ width: "100%", height: "400px" }}
                enable={{
                  top: true,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
              >
                <div style={{ height: "100%" }}>
                  <ActionBar></ActionBar>
                </div>
              </Resizable>
            </Grid>
            <Grid item className={style.fixRight}>
              {/* 组件属性配置 */}
              <PropsBar></PropsBar>
            </Grid>
          </Grid>
        </DndProvider>
      </EditorContextProvider>
    </React.Fragment>
  );
};

export default Editor;

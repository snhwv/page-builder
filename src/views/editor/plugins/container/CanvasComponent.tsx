import WithDropContainer, {
  InnerDropComponent,
} from "../../dragAndDrop/withDropContainer";

import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setActiveId } from "@store/features/editor/layoutActiveSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropTemplate: {
      "&:hover": {
        outline: `2px dashed #b0bcff`,
      },
    },
  })
);
const DropTemplate: React.FC<any> = (props) => {
  const { id } = props;
  const style = useStyles();
  const dispatch = useDispatch();
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setActiveId(id));
  };
  return (
    <div
      ref={props.getRef}
      style={{
        overflow: "visible",
        width: "100%",
      }}
      className={style.dropTemplate}
      onClick={onClick}
    >
      {/* 可拖拽组件区域 */}
      <InnerDropComponent {...props}></InnerDropComponent>
    </div>
  );
};

export const CanvasComponent = WithDropContainer(DropTemplate);

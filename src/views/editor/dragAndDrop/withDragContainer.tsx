import { useEditorContext } from "@editor/constants/EditorContext";
import { getDisableDrag, setStyle } from "@store/features/editor";
import { setActiveId } from "@store/features/editor/layoutActiveSlice";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
export interface DraggableInner {
  isDragging: boolean;
}

const WithDragContainer = <T extends {}>(WrapComponent: React.FC<{}>) => {
  const Drag: React.FC<
    T & {
      type: string;
      id?: string;
      width?: number;
      height?: number;
      parentId?: string;
      containerChildrenDataArr?: any[];
      DropTemplate?: React.FC<{ accept: string[]; id: string }>;
    }
  > = (props) => {
    const disableDrag = useSelector(getDisableDrag);
    const { width = 1, height = 1, parentId, type, id } = props;
    const dispatch = useDispatch();

    const context = useEditorContext();
    const canOperation = context.getCanOperation(type);

    const [{ isDragging }, drag, preview] = useDrag({
      item: { type, width, height, parentId, id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      begin: (monitor) => {},
      end: (item, monitor) => {
        if (monitor.didDrop()) {
          // 判断是否被item.type对应的drop target接收
          // const dropResult = monitor.getDropResult();
        } else {
          dispatch(
            setStyle({
              display: "none",
            })
          );
        }
      },
      canDrag: (monitor) => {
        return !disableDrag;
      },
    });
    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(setActiveId(id));
    };
    return (
      <div
        ref={drag}
        unselectable="on"
        style={{
          flex: "1 1 100%",
          opacity: isDragging ? 0 : 1,
          // background: "rgb(241 241 241)",
          // overflow: 'visible'
          // border: "1px solid rgb(63 81 181)",
          // boxShadow: "red 0px 0px 0px 1px",
        }}
        onClick={onClick}
      >
        <div
          style={{
            pointerEvents: canOperation ? "unset" : "none",
            width: "100%",
            height: "100%",
          }}
        >
          <WrapComponent {...props}></WrapComponent>
        </div>
      </div>
    );
  };
  return Drag;
};
export default WithDragContainer;

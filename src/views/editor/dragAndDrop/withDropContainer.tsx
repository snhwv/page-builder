import { makeStyles, Theme } from "@material-ui/core";
import { useDrop } from "react-dnd";
import { DragItem } from "../constants/types";
import React, { CSSProperties, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ContainerLayoutData,
  getLayoutDataById,
  getStyle,
  ILayoutData,
  setDisableDrag,
  setStyle,
  updateChildrenContainerWidthById,
  updateEntityById,
} from "@store/features/editor";
import { getCompId } from "../utils";
import { useEditorContext } from "../constants/EditorContext";
import {
  NumberSize,
  ResizableDragComponentNode,
} from "./ResizableDragComponentNode";
const PLACEHOLDER_COLOR = "#e8e8e8";

const dropDivStyle: CSSProperties = {
  display: "inline-flex",
  width: "100%",
  height: "100%",
  position: "relative",
  boxSizing: "border-box",
};

const useStyle = makeStyles((theme: Theme) => ({
  placeHolder: {},
  dropChild: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .dateRangePicker": {
      width: "100%",
    },
  },
}));

export interface DroppableInner {
  isDragging: boolean;
}

export interface DropContainerOptions {
  type: string;
  canGridLayout?: boolean;
  cols?: number;
}

export const InnerDropComponent: React.FC<any> = (props) => {
  const { id } = props;
  return (
    <>
      <PlaceHolder containerId={id}></PlaceHolder>
      {props.children}
    </>
  );
};

const DropChildElement: React.FC<{
  child: ILayoutData;
  containerWidth: number;
  cols: number;
  unitHeight: number;
  margin: number[];
}> = ({ child, containerWidth, cols, unitHeight, margin }) => {
  // 类型
  const type = child.type;
  const id = child.id;

  // 宽高
  const width = child.width;
  const height = child.height;

  // X、Y坐标
  const colIndex = child.colIndex;
  const rowIndex = child.rowIndex;

  // 展示对应元素所需要的数据
  const tempData = child.tempData;

  // 展示对应元素所需要的数据
  const parentId = child.parentId;
  const zIndex = Number(tempData.zIndex || 0);

  const style = useStyle();

  const DraggableComp = ResizableDragComponentNode;

  const dispatch = useDispatch();
  const onResize = useCallback(
    (delta: NumberSize) => {
      if (!containerWidth) {
        return;
      }
      const widthPX = containerWidth;
      const wper = delta.width / widthPX;
      const offsetX = Math.max(1, width + Math.round(wper / (1 / cols!)));
      const offsetY = Math.max(
        1,
        height + Math.round(delta.height / unitHeight)
      );
      dispatch(
        setStyle({
          containerId: child.parentId,
          width: `${(offsetX / cols!) * (containerWidth || 0) - margin[0]}px`,
          height: unitHeight * offsetY - margin[1],
          transform: `translate(${
            (colIndex! * (containerWidth || 0)) / cols! + margin![0] / 2
          }px,${(rowIndex || 0) * unitHeight + margin![1] / 2}px)`,
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      colIndex,
      rowIndex,
      width,
      containerWidth,
      unitHeight,
      cols,
      height,
      margin,
    ]
  );
  const onResizeStop = useCallback(
    (delta: NumberSize): NumberSize | undefined => {
      dispatch(setDisableDrag(false));
      if (!containerWidth) {
        return;
      }
      const widthPX = containerWidth;
      const wper = delta.width / widthPX;
      const offsetX = Math.max(1, width + Math.round(wper / (1 / cols!)));
      const offsetY = Math.max(
        1,
        height + Math.round(delta.height / unitHeight)
      );
      dispatch(
        updateEntityById({
          id,
          payload: {
            width: offsetX,
            height: offsetY,
          },
        })
      );
      // 组件宽度改为自动检测
      // dispatch(
      //   updateChildrenContainerWidthById({
      //     id,
      //     payload: (offsetX * containerWidth) / cols! - margin[0],
      //   })
      // );
      return {
        width: (widthPX * offsetX) / cols! - margin[0],
        height: offsetY * unitHeight - margin[1],
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      colIndex,
      rowIndex,
      width,
      containerWidth,
      unitHeight,
      cols,
      height,
      margin,
    ]
  );
  const onResizeStart = useCallback(() => {
    dispatch(setDisableDrag(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={style.dropChild}
      style={{
        width: `${(width / cols) * containerWidth - margin[0]}px`,
        transform: `translate(${
          (colIndex * containerWidth) / cols + margin[0] / 2
        }px,${rowIndex * unitHeight + margin[1] / 2}px)`,
        position: "absolute",
        height: unitHeight * height - margin[1] + "px",
        zIndex,
      }}
      data-previewerid={getCompId(id)}
    >
      <DraggableComp
        {...tempData}
        data={child?.data}
        subChildren={child?.subChildren}
        id={id}
        type={type}
        width={width}
        height={height}
        parentId={parentId}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        containerChildren={child?.children}
      ></DraggableComp>
    </div>
  );
};

interface ContainerProps {
  id: string;
  accept: string[];
}

export const PlaceHolder: React.FC<{ containerId: string }> = ({
  containerId,
}) => {
  const { containerId: storeContainerId, ...rest } = useSelector(getStyle);
  return (
    <React.Fragment>
      {storeContainerId === containerId && (
        <div
          style={{
            ...rest,
            background: PLACEHOLDER_COLOR,
            position: "absolute",
            pointerEvents: "none",
          }}
        ></div>
      )}
    </React.Fragment>
  );
};

const WithDropContainer = <T extends {}>(
  WrapComponent: React.FC<T & ContainerProps>
) => {
  const NewComponent: React.FC<
    T &
      ContainerLayoutData & {
        accept: string[];
        doSetPlaceHolderStyle: (entity: any) => void;
      }
  > = React.memo((props) => {
    const { children, containerWidth, cols, unitHeight, margin } = props;
    let newChildren = Object.values(children) || [];
    newChildren = (newChildren as ILayoutData[]).filter(
      (item) => !(Reflect.has(item, "visible") && item.visible === false)
    );

    return (
      <WrapComponent {...props}>
        {newChildren.map((child: any) => (
          <DropChildElement
            key={child.id}
            containerWidth={containerWidth}
            margin={margin}
            unitHeight={unitHeight}
            cols={cols!}
            child={child}
          ></DropChildElement>
        ))}
      </WrapComponent>
    );
  });

  const Inject: React.FC<T & ContainerProps> = (props) => {
    // 容器ID
    const { id, accept = [] } = props;
    // 获取容器model
    const layoutData = useSelector((state) =>
      getLayoutDataById(state, id)
    ) as ContainerLayoutData;
    const dispatch = useDispatch();

    const doSetPlaceHolderStyle = (entity: any) => {
      dispatch(
        setStyle({
          containerId: id,
          ...entity,
        })
      );
    };
    return (
      <Drop
        {...props}
        {...layoutData}
        accept={accept}
        doSetPlaceHolderStyle={doSetPlaceHolderStyle}
      ></Drop>
    );
  };

  const Drop: React.FC<
    T &
      ContainerLayoutData & {
        accept: string[];
        doSetPlaceHolderStyle: (entity: any) => void;
      }
  > = (props) => {
    const {
      // 容器ID
      id,
      // 容器类型
      accept,
      // 列数
      cols,
      // 行高
      unitHeight,
      // 容器宽度，用于计算子组件宽度
      containerWidth,
      margin,
      doSetPlaceHolderStyle,
    } = props;

    const colIndex = useRef<number | null>(null);
    const rowIndex = useRef<number | null>(null);

    const context = useEditorContext();
    const [, drop] = useDrop({
      accept,
      drop(item: DragItem, monitor) {
        if (!monitor.isOver({ shallow: true })) {
          return;
        }
        doSetPlaceHolderStyle({
          display: "none",
        });
        if (item.parentId && item.parentId !== id) {
          return;
        }
        // 通过拖动的对象没有Id来判断是否是新加的
        if (item.id) {
          context.onUpdateEntity(item, {
            id: item.id,
            payload: {
              colIndex: colIndex.current,
              rowIndex: rowIndex.current,
            },
          });
        } else {
          context.onAddEntity(item, {
            parentId: id,
            child: {
              colIndex: colIndex.current,
              rowIndex: rowIndex.current,
              ...context.getDefaultStoreDataByType(item.type as any),
            },
          });
        }
      },
      hover: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          return;
        }
        const clientOffset = monitor.getClientOffset();
        const initialClientOffset = monitor.getInitialClientOffset();
        const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
        if (!initialClientOffset || !initialSourceClientOffset) {
          return;
        }
        const idx = initialSourceClientOffset.x - initialClientOffset.x;
        const idy = initialSourceClientOffset.y - initialClientOffset.y;
        if (dropRef.current && clientOffset) {
          const dropTargetXy = dropRef.current.getBoundingClientRect();

          // 鼠标相对于container的位置
          const dx = clientOffset.x - dropTargetXy.left + idx;
          const dy = clientOffset.y - dropTargetXy.top + idy;

          const dropContainerWidth = dropTargetXy.width;
          const unitWidth = dropContainerWidth / cols;
          const hoverColIndex = Math.min(
            Math.max(Math.round(dx / unitWidth), 0),
            cols - item.width
          );
          const hoverRowIndex = Math.max(Math.round(dy / unitHeight!), 0);

          colIndex.current = hoverColIndex;
          rowIndex.current = hoverRowIndex;

          doSetPlaceHolderStyle({
            width: `${(item.width / cols) * containerWidth - margin[0]}px`,
            height: unitHeight * item.height - margin[1],
            transform: `translate(${
              (hoverColIndex * (containerWidth || 0)) / cols + margin[0] / 2
            }px,${(hoverRowIndex || 0) * unitHeight + margin[1] / 2}px)`,
          });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        currentItem: monitor.getItem(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    });
    const dropRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const getRef = (dom: HTMLDivElement) => {
      dropRef.current = dom;
      drop(dom);
      if (!dom) {
        return;
      }
      // 动态设置容器宽度
      // 由于dropRef改为传入到子组件，由子组件决定dropRef是哪个DIV
      // 所以此上层组件不清楚dropRef对应元素的大小，所以在此处测量再更新
      dispatch(
        updateChildrenContainerWidthById({
          id,
          payload: dom.getBoundingClientRect().width,
        })
      );
    };
    return (
      <div style={dropDivStyle}>
        <NewComponent {...props} getRef={getRef}></NewComponent>
      </div>
    );
  };
  return Inject;
};
export default WithDropContainer;

import React, { useRef, useState } from "react";
import MaterialTable from "material-table";
import { useDispatch } from "react-redux";
import {
  addSubChildById,
  addTableColumnLeftById,
  addTableColumnRightById,
  deleteTableColumnById,
  updateEntityById,
  updateTableColumnById,
} from "@store/features/editor";
import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { cloneDeep, isEqual } from "lodash";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { DragItem } from "@editor/constants/types";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WithDragContainer from "../../dragAndDrop/withDragContainer";
import { useEditorContext } from "@editor/constants/EditorContext";
import { ColDialog } from "../../plugins/table/components/ColDialog";
export const CanvasComponent: React.FC<any> = (props) => {
  const { ...rest } = props;
  return (
    <div>
      <CompTable
        id={rest.id}
        data={rest.data}
        subChildren={rest.subChildren}
      ></CompTable>
    </div>
  );
};

const OperationTableHeader = (props: any) => {
  const { id, index } = props;
  const { title } = props?.item || {};
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const initialValuesRef = useRef({});
  const operationTypeRef = useRef<"edit" | "addLeft" | "addRight">("edit");

  const handleEdit = () => {
    initialValuesRef.current = props?.item || {};
    operationTypeRef.current = "edit";
    setOpen(true);
  };
  const handleAddLeft = () => {
    initialValuesRef.current = {};
    operationTypeRef.current = "addLeft";
    setOpen(true);
  };
  const handleAddRight = () => {
    initialValuesRef.current = {};
    operationTypeRef.current = "addRight";
    setOpen(true);
  };
  const onValidate = (v: any) => {
    const obj = {
      edit: () =>
        dispatch(
          updateTableColumnById({
            id,
            index,
            payload: v,
          })
        ),
      addLeft: () =>
        dispatch(
          addTableColumnLeftById({
            id,
            index,
            payload: v,
          })
        ),
      addRight: () =>
        dispatch(
          addTableColumnRightById({
            id,
            index,
            payload: v,
          })
        ),
    };
    obj[operationTypeRef.current] && obj[operationTypeRef.current]();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(
      deleteTableColumnById({
        id,
        index,
      })
    );
  };
  return (
    <Grid container justify="space-between" alignItems="center" spacing={0}>
      <ColDialog
        open={open}
        handleClose={handleDialogClose}
        submitHandler={onValidate}
        initialValues={initialValuesRef.current}
      ></ColDialog>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={handleOpen} size="small" aria-label="delete">
          <ArrowDropDownCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem>
              <ListItemIcon>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </MenuItem> */}
          <MenuItem
            style={{
              width: "200px",
            }}
            disabled={true}
          >
            {title}
          </MenuItem>
          <MenuItem onClick={handleClose}>固定左</MenuItem>
          <MenuItem onClick={handleClose}>固定右</MenuItem>
          <Divider />
          <MenuItem onClick={handleEdit}>修改</MenuItem>
          <MenuItem onClick={handleAddLeft}>增加列（左）</MenuItem>
          <MenuItem onClick={handleAddRight}>增加列（右）</MenuItem>
          <MenuItem onClick={handleDelete}>删除</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};
const ActionHeader: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const context = useEditorContext();
  const addActionHander = () => {
    dispatch(
      addSubChildById({
        parentId: id,
        child: {
          ...context.getDefaultStoreDataByType("button"),
          colIndex: 1,
          rowIndex: 1,
        },
      })
    );
  };
  return (
    <TableCell style={{}}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ flexWrap: "nowrap" }}
        spacing={0}
      >
        <Grid item>
          <Typography>操作</Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={addActionHander}
            size="small"
            aria-label="delete"
          >
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </TableCell>
  );
};

const DragCol: React.FC<{
  id: string;
  data: any;
  index: number;
  item: any;
  onEnterCol: (index: number) => void;
  beginDrag: () => void;
}> = ({ item, id, data, index, onEnterCol, beginDrag }) => {
  const [, drag] = useDrag({
    item: { type: "tableCol", index, item },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      beginDrag();
    },
    end: () => {
      // onDrop();
    },
  });
  const onMouseEnter = (e: any) => {
    onEnterCol(index);
  };
  return (
    <TableCell
      onDragEnter={onMouseEnter}
      ref={drag}
      key={item.field}
      style={{}}
    >
      <OperationTableHeader
        item={item}
        index={index}
        id={id}
        data={data}
      ></OperationTableHeader>
    </TableCell>
  );
};

const Dragheader: React.FC<{
  columns: any[];
  id: string;
  data: any;
  tableRef: any;
  children?: any;
}> = ({ columns = [], id, data, tableRef, children }) => {
  const canenter = useRef(false);
  const hoverIndex = useRef(-1);
  const [localCols, setLocalCols] = useState(columns);
  const dispatch = useDispatch();
  const [{ currentItem }, drop] = useDrop({
    accept: "tableCol",
    hover(item: DragItem, monitor: DropTargetMonitor) {},
    drop: () => {
      hoverIndex.current = -1;
      canenter.current = false;
      dispatch(
        updateEntityById({
          id,
          payload: {
            data: {
              columns: localCols,
            },
          },
        })
      );
    },
    collect: (monitor) => ({
      // isOver: monitor.isOver(),
      currentItem: monitor.getItem(),
      // isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const beginDrag = () => {
    canenter.current = true;
  };
  const onEnterCol = (index: number) => {
    if (!canenter.current) {
      return;
    }
    // 删除、插入
    if (hoverIndex.current === index) {
      return;
    }
    const newArr = [...localCols];
    newArr.splice(
      hoverIndex.current === -1 ? currentItem.index : hoverIndex.current,
      1
    );
    newArr.splice(index, 0, currentItem.item);
    setLocalCols(newArr);
    hoverIndex.current = index;
  };
  return (
    <TableHead ref={drop}>
      <TableRow>
        {children || null}
        {localCols.map((item: any, index: number) => {
          if (hoverIndex.current === index) {
            return (
              <TableCell key={index} style={{}}>
                {/* <tr></tr> */}
              </TableCell>
            );
          }
          return (
            <DragCol
              key={index}
              item={item}
              index={index}
              onEnterCol={onEnterCol}
              beginDrag={beginDrag}
              id={id}
              data={data}
            ></DragCol>
          );
        })}
        {data?.hasAction && <ActionHeader id={id}></ActionHeader>}
      </TableRow>
    </TableHead>
  );
};

const CompTable: React.FC<any> = React.memo(
  (props) => {
    const { id } = props;
    // 使用subChildren配置操作列的按钮
    const { data, subChildren = {} } = props;
    const selectType = data?.selectType;
    const tableType = data?.tableType;
    const columns: any[] = cloneDeep(data?.columns || []);

    if (data?.hasAction) {
      columns.push({
        title: "操作",
        field: "operation",
        render: (rowData: any) => {
          if (!data?.hasAction) {
            return null;
          }
          const actionBtns = Object.values(subChildren) || [];
          let Comp = WithDragContainer<{ id: string; type?: string }>(
            context.getCanvasComponentNode("button")
          );
          return (
            <div style={{ display: "flex" }}>
              {actionBtns.map((btn: any, index) => {
                return (
                  <div style={{ marginLeft: index ? 10 : 0 }} key={btn.id}>
                    <Comp {...btn} {...btn.tempData}></Comp>
                  </div>
                );
              })}
            </div>
          );
        },
      });
    }

    const headerColumns: any[] = cloneDeep(data?.columns || []);

    const isMultipleSelect = selectType === "Multiple";
    const isSingleSelect = selectType === "Single";
    const NoSelect = !selectType || selectType === "No";

    // const isNormalTable = !tableType || tableType === "Normal";
    // const isExpandTable = tableType === "Expand";
    const isTreeTable = tableType === "Tree";
    const onSelectionChange = (a: any, b: any) => {
      // if (!isSingleSelect) {
      //   return;
      // }
      // if (tableRef.current) {
      //   const { dataManager } = tableRef.current as any;
      //   const { data = [] } = dataManager;
      //   const checkedRows = data.filter((item: any) => item.tableData.checked);
      //   checkedRows.forEach((item: any) => {
      //     dataManager.changeRowSelected(false, [item.tableData.id]);
      //   });
      // }
    };
    const tableRef = useRef(null);
    const context = useEditorContext();
    return (
      <div style={{ minHeight: 20 }}>
        <MaterialTable
          tableRef={tableRef}
          onSelectionChange={onSelectionChange}
          options={{
            emptyRowsWhenPaging: false,
            pageSizeOptions: (data.pageOptions || []).map(
              (item: any) => item.label
            ),
            pageSize: 5,
            paging: data?.isPaging,
            selection: !NoSelect && (isSingleSelect || isMultipleSelect),
            showSelectAllCheckbox: isMultipleSelect,
            sorting: false,
            actionsColumnIndex: -1,
          }}
          columns={columns}
          data={[
            {
              id: "1",
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63,
            },
            {
              id: "2",
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63,
              children: [],
              parentId: "1",
            },
          ]}
          parentChildData={
            // (row: any, rows) => rows.find((a: any) => a.id === row.parentId)
            isTreeTable
              ? (row: any, rows) => rows.find((a: any) => a.id === row.parentId)
              : undefined
          }
          components={{
            Toolbar: (props) => null,
            Header: (props) => {
              const checkOnChange = (e: any, v: any) => {
                props.onAllSelected && props.onAllSelected(v);
              };
              return (
                <Dragheader
                  columns={headerColumns}
                  id={id}
                  data={data}
                  tableRef={tableRef}
                >
                  {isTreeTable && <TableCell padding="none"></TableCell>}
                  {NoSelect ? null : (
                    <TableCell padding="none">
                      {props.showSelectAllCheckbox && (
                        <Checkbox
                          indeterminate={
                            !!(
                              props.selectedCount &&
                              props.selectedCount < props.dataCount
                            )
                          }
                          checked={
                            !!(
                              props.selectedCount &&
                              props.selectedCount === props.dataCount
                            )
                          }
                          onChange={checkOnChange}
                        />
                      )}
                    </TableCell>
                  )}
                </Dragheader>
              );
            },
          }}
        />
      </div>
    );
  },
  (prev, next) => {
    return isEqual(prev, next);
  }
);
export default CanvasComponent;

import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form, { IFormData } from "@components/form";

import { Button } from "@material-ui/core";
import {
  addTableColumnById,
  selectActionAll,
  updateEntityById,
} from "@store/features/editor";
import { ListContainer } from "./components/listContainer";
import { ColDialog } from "./components/ColDialog";

const useStyle = makeStyles((theme) => ({
  propForm: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&  > div": {
      width: "100%",
    },
  },
}));

const AddColumnDialog: React.FC<{ addHandler: (v: any) => void }> = ({
  addHandler,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const onValidate = (v: any) => {
    addHandler(v);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} color="primary" variant="contained">
        + 增加列
      </Button>
      <ColDialog
        open={open}
        submitHandler={onValidate}
        handleClose={handleClose}
      ></ColDialog>
    </React.Fragment>
  );
};
export const PropsComponent: React.FC<any> = (props) => {
  const style = useStyle();
  const actionAll = useSelector(selectActionAll);
  const { id, data } = props;
  const { pageOptions = [], isPaging = false, columns, dataSource } = data;
  const dispatch = useDispatch();
  const formData: IFormData[] = [
    {
      name: "selectType",
      placeholder: "选择方式",
      type: "select",
      defaultValue: "",
      options: [
        { value: "No", label: "无" },
        { value: "Single", label: "单选" },
        { value: "Multiple", label: "多选" },
      ],
      onChange: (selectType) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              data: {
                selectType,
              },
            },
          })
        );
      },
    },
    {
      name: "isPaging",
      placeholder: "是否分页",
      type: "switch",
      defaultValue: "",
      onChange: (isPaging) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              data: {
                isPaging,
              },
            },
          })
        );
      },
    },
    {
      name: "hasAction",
      placeholder: "是否含操作列",
      type: "switch",
      defaultValue: "",
      onChange: (hasAction) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              data: {
                hasAction,
              },
            },
          })
        );
      },
    },
    // {
    //   name: "hasAction",
    //   placeholder: "操作列在第几列",
    //   type: "switch",
    //   defaultValue: "",
    //   onChange: (hasAction) => {
    //     dispatch(
    //       updateEntityById({
    //         id,
    //         payload: {
    //           data: {
    //             hasAction,
    //           },
    //         },
    //       })
    //     );
    //   },
    // },
    {
      name: "pageOptions",
      placeholder: "分页",
      type: "autocomplete",
      defaultValue: [],
      rows: 12,
      options: [
        { value: "1", label: 5 },
        { value: "2", label: 10 },
        { value: "3", label: 15 },
      ],
      onChange: (pagination) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              data: {
                pageOptions: pagination,
              },
            },
          })
        );
      },
    },
    {
      name: "listType",
      placeholder: "列表类型",
      type: "select",
      defaultValue: "",
      rows: 12,
      options: [
        { value: "Normal", label: "普通列表" },
        { value: "Tree", label: "树形列表" },
        { value: "Expand", label: "展开列表" },
      ],
      onChange: (tableType) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              data: {
                tableType,
              },
            },
          })
        );
      },
    },
    {
      name: "dataSource",
      placeholder: "数据来源",
      type: "select",
      defaultValue: dataSource,
      options:
        actionAll.map((item) => ({ value: item.id, label: item.name })) || [],
      onChange: (e) => {
        dispatch(
          updateEntityById({
            id,
            payload: {
              data: {
                dataSource: e || "",
              },
            },
          })
        );
      },
      // options: [
      //   { value: "1", label: "固定数据" },
      //   { value: "2", label: "接口数据" },
      // ],
    },
  ];
  const addHandler = (v: any) => {
    dispatch(addTableColumnById({ id, payload: v }));
  };
  const onDrop = (newList: any[]) => {
    const newArr = newList.map((item) => columns[item.index]);
    dispatch(
      updateEntityById({
        id,
        payload: {
          data: {
            columns: newArr,
          },
        },
      })
    );
  };
  const list = columns.map((item: any, index: number) => ({
    index,
    text: item.title,
  }));
  return (
    <div>
      <AddColumnDialog addHandler={addHandler}></AddColumnDialog>
      <Form
        fields={formData}
        initialValues={{ pageOptions, isPaging }}
        className={style.propForm}
      ></Form>
      <Typography gutterBottom>列</Typography>
      <ListContainer list={list} onDrop={onDrop}></ListContainer>
    </div>
  );
};
export default PropsComponent;

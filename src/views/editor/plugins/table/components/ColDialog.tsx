import { IconButton, makeStyles, } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import Form, { IFormData } from "@components/form";
import CloseIcon from "@material-ui/icons/Close";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { required } from "@components/form/validations";

const useStyle = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
export const ColDialog: React.FC<{
  open: boolean;
  initialValues?: {};
  handleClose: () => void;
  submitHandler?: (v: any) => void;
}> = ({ open, handleClose, submitHandler, initialValues }) => {
  const [localOpen, setOpen] = React.useState(false);
  const form = useRef<any>(null);

  const style = useStyle();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const localHandleClose = () => {
    setOpen(false);
    handleClose && handleClose();
  };
  const agreeHandler = () => {
    form.current?.handleSubmit();
  };
  const onValidate = (v: any) => {
    localHandleClose();
    submitHandler && submitHandler(v);
  };
  return (
    <Dialog open={localOpen} maxWidth={"xs"} onClose={localHandleClose}>
      <DialogTitle>
        增加列
        <IconButton
          aria-label="close"
          className={style.closeButton}
          onClick={localHandleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form
          ref={form}
          onValidate={onValidate}
          fields={formData}
          initialValues={initialValues}
        ></Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={localHandleClose} color="primary">
          取消
        </Button>
        <Button onClick={agreeHandler} color="primary" autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const formData: IFormData[] = [
  {
    name: "title",
    placeholder: "表头",
    type: "input",
    rows: 12,
    defaultValue: "",
    validator: required("请填写表头"),
  },
  {
    name: "field",
    placeholder: "键值",
    type: "input",
    rows: 12,
    defaultValue: "",
    validator: required("请填写键值"),
  },
  {
    name: "isOrder",
    placeholder: "是否排序",
    type: "switch",
    defaultValue: false,
  },
  {
    name: "dataSource",
    placeholder: "内容类型",
    type: "select",
    defaultValue: "2",
    validator: required("请填写内容类型"),
    options: [
      { value: "1", label: "状态" },
      { value: "2", label: "文本" },
      { value: "3", label: "长文本" },
      { value: "4", label: "时间" },
      { value: "5", label: "金额" },
      { value: "6", label: "百分比" },
      { value: "7", label: "地址" },
      { value: "8", label: "图片" },
      { value: "9", label: "文件" },
      { value: "10", label: "JSON" },
      { value: "11", label: "操作" },
      { value: "12", label: "Tag" },
    ],
  },
];

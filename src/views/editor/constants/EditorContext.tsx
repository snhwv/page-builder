import React, { ReactNode, useContext } from "react";
import button from "../plugins/button";

import checkbox from "../plugins/checkbox";

import date from "../plugins/date";

import dialog from "../plugins/dialog";

import drawer from "../plugins/drawer";

import form from "../plugins/form";

import icon from "../plugins/icon";

import iconButton from "../plugins/iconButton";

import input from "../plugins/input";

import line from "../plugins/line";

import multipleSelect from "../plugins/multipleSelect";

import number from "../plugins/number";

import password from "../plugins/password";

import radio from "../plugins/radio";

import range from "../plugins/range";

import select from "../plugins/select";

import subform from "../plugins/subform";

import table from "../plugins/table";

import text from "../plugins/text";

import textarea from "../plugins/textarea";

import container from "../plugins/container";

import { BaseEditor } from "./BaseEditor";
import { useDispatch } from "react-redux";

export const containerAccept: {
  [key: string]: string[];
} = {
  page: [
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
  ],
  table: [],
  form: [
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
    "button",
    "subform",
  ],
  subform: [],
  drawer: ["form", "input", "button", "table"],
  dialog: [],
};

const baseEditor = new BaseEditor();

baseEditor.register(button);
baseEditor.register(checkbox);
baseEditor.register(date);
baseEditor.register(dialog);
baseEditor.register(drawer);
baseEditor.register(form);
baseEditor.register(icon);
baseEditor.register(iconButton);
baseEditor.register(input);
baseEditor.register(line);
baseEditor.register(multipleSelect);
baseEditor.register(number);
baseEditor.register(password);
baseEditor.register(radio);
baseEditor.register(range);
baseEditor.register(select);
baseEditor.register(subform);
baseEditor.register(table);
baseEditor.register(text);
baseEditor.register(textarea);
baseEditor.register(container);
baseEditor.setAcceptMap(containerAccept);

export const EditorContext = React.createContext<BaseEditor>(baseEditor);
export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const dispatch = useDispatch();
  baseEditor.setDispatch(dispatch);
  return (
    <EditorContext.Provider value={baseEditor}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext: () => BaseEditor = () => {
  const context = useContext<BaseEditor>(EditorContext);
  return context;
};

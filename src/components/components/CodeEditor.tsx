/**
 * long description for the file
 *
 * @summary short description for the file
 * @author yangpan
 *
 * Created at     : 2021-03-24 14:16:21
 * Last modified  : 2021-03-24 14:16:49
 */

import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import {
  javascript,
  esLint,
  javascriptLanguage,
} from "@codemirror/lang-javascript";
import { defaultKeymap } from "@codemirror/commands";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { keymap } from "@codemirror/view";
import { linter } from "@codemirror/lint";
import Linter from "eslint4b-prebuilt";
import { useEffect, useRef } from "react";
import { completeFromList } from "@codemirror/autocomplete";
const CodeEditor = () => {
  const ref = useRef(null);
  let editorRef = useRef<EditorView | null>(null);
  useEffect(() => {
    if (ref.current) {
      let keywords = "break case try catch class const continue debugger default delete do else enum export extends false finally for function if implements import interface in instanceof let new package private protected public return static super switch this throw true try typeof var void while with yield"
        .split(" ")
        .map((kw) => ({ label: kw, type: "keyword" }));
      let customeKeywords = [
        {
          label: "sdssds",
          type: "function",
        },
      ];
      let jsCompletion = completeFromList([...keywords, ...customeKeywords]);
      editorRef.current = new EditorView({
        state: EditorState.create({
          extensions: [
            basicSetup,
            javascript(),
            defaultHighlightStyle,
            keymap.of(defaultKeymap),
            linter(esLint(new Linter())),
            javascriptLanguage.data.of({ autocomplete: jsCompletion }),
          ],
        }),
        parent: ref.current!,
      });
    }
  }, []);
  return <div ref={ref} style={{ textAlign: "left", width: 500, height: 500 }}></div>;
};
export default CodeEditor;

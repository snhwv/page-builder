import { Parser, NodeProp } from "lezer";
import { LezerLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags } from "@codemirror/highlight";

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = (Parser as any).deserialize({
  version: 13,
  states:
    "!WQYQPOOOhQPO'#CdOOQO'#Ci'#CiOOQO'#Ce'#CeQYQPOOOOQO,59O,59OOyQPO,59OOOQO-E6c-E6cOOQO1G.j1G.j",
  stateData: "![~O[OSPOS~ORQOSQOTQOVPO~ORQOSQOTQOUTOVPO~ORQOSQOTQOUWOVPO~O",
  goto: "u^PPPPPPPP_ePPPoXQOPSUQSOQUPTVSUXROPSU",
  nodeNames:
    "⚠ LineComment Program Identifier String Boolean }} {{ Application",
  maxTerm: 13,
  nodeProps: [
    [NodeProp.openedBy, 6, "{{"],
    [NodeProp.closedBy, 7, "}}"],
  ],
  skippedNodes: [0, 1],
  repeatNodeCount: 1,
  tokenData:
    "#}~R^XY}YZ}]^}pq}st!`z{!n}!O!v!Q![!v!]!^#[!c!}!v#R#S!v#T#o!v#o#p#g#q#r#r~!SS[~XY}YZ}]^}pq}~!cQ#Y#Z!i#h#i!i~!nOT~~!sPS~z{!n~!{TR~}!O!v!Q![!v!c!}!v#R#S!v#T#o!v~#aQP~OY#[Z~#[~#jP#o#p#m~#rOV~~#uP#q#r#x~#}OU~",
  tokenizers: [0],
  topRules: { Program: [0, 2] },
  tokenPrec: 0,
});

const _IHOWanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Identifier: tags.variableName,
        Boolean: tags.bool,
        String: tags.string,
        LineComment: tags.lineComment,
        "{{ }}": tags.paren,
      }),
    ],
  }),
  languageData: {},
});
function IHOWanguage() {
  return new LanguageSupport(_IHOWanguage);
}

export { IHOWanguage, _IHOWanguage };

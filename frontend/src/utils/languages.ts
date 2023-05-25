import { langs } from "@uiw/codemirror-extensions-langs";

export const languages: string[] = ["javascript", "java", "python", "cpp"];

export function languageSwitch(val: String) {
  switch (val) {
    case "javascript":
      return langs.javascript;
      break;
    case "java":
      return langs.java;
      break;
    case "python":
      return langs.python;
      break;
    case "cpp":
      return langs.cpp;
      break;
    default:
      return langs.javascript;
      break;
  }
}

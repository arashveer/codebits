import { langs } from "@uiw/codemirror-extensions-langs";

export const languages: string[] = [
  "javascript",
  "java",
  "python",
  "cpp",
  "php",
  "rust",
  "typescript",
  "c",
  "csharp",
  "sql",
  "html",
  "markdown",
];

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
    case "php":
      return langs.php;
      break;
    case "rust":
      return langs.rust;
      break;
    case "typescript":
      return langs.typescript;
      break;
    case "c":
      return langs.c;
      break;
    case "csharp":
      return langs.csharp;
      break;
    case "sql":
      return langs.sql;
      break;
    case "html":
      return langs.html;
      break;
    case "markdown":
      return langs.markdown;
      break;
    default:
      return langs.javascript;
      break;
  }
}

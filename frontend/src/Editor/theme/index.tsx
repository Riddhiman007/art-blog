import { type EditorThemeClasses } from "lexical";

import styles from "../../styles/editor/theme.module.css";
const theme: EditorThemeClasses = {
  ltr: styles.ltr,
  heading: {
    h1: styles.heading1,
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  },
  text: {
    bold: "text-semibold",
    italic: styles.italic,
    underline: "underline",
    strikethrough: "stroke-slate-900 stroke-1",
  },
};
const classname = "";
export default theme;

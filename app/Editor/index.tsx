"use client";
import React, { ReactNode, useEffect } from "react";
import {
  $getRoot,
  $getSelection,
  EditorState,
  EditorConfig,
  EditorThemeClasses,
  LexicalEditor,
  $setSelection,
} from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

// themes
import theme from "./theme";

//toolbar
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ActionPlugin from "./plugins/ActionPlugin";

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // read the contents of editor
    const root = $getRoot();
    const selection = $getSelection();
  });
}

/**
 * A function which converts lexical nodes into html
 */
function HTMLPlugin(editor: LexicalEditor) {
  return $generateHtmlFromNodes(editor);
}
// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);
  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(err: Error) {
  console.error(err);
}

export default function Editor({
  onChange,
  placeholder,
}: {
  onChange: (editorState: EditorState, editor: LexicalEditor, tags: Set<String>) => void;
  placeholder: JSX.Element;
}): JSX.Element {
  const initialConfig = {
    namespace: "editor",
    theme: theme,
    onError,
  };
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "editor",
        theme: theme,
        onError: onError,
        nodes: [HeadingNode],
      }}
    >
      <div className="flex flex-col">
        <ToolbarPlugin>
          <>
            <hr className="mb-4 bg-slate-200" />
            <div className=" mt-4 grid px-4">
              <RichTextPlugin
                placeholder={(isEditable) => {
                  return placeholder;
                }}
                contentEditable={
                  <ContentEditable
                    as="div"
                    className="inline-block h-full max-h-full min-h-[150px] w-full focus:outline-none"
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </>
        </ToolbarPlugin>
        <OnChangePlugin onChange={onChange} />
        {/* <ActionPlugin /> */}
      </div>
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
}

export { HTMLPlugin };

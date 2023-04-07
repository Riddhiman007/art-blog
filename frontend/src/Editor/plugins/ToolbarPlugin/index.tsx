import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faTrashCan,
  faUndo,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

import { Combobox } from "@headlessui/react";
// import css
import styles from "../../../styles/editor/toolbar.module.css";

// lexical
import { mergeRegister } from "@lexical/utils";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $setSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { BlockStylesToolBar, FontStyles, blockTypeToBlockName } from "./formatText";
import { btnOnClick } from "./utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function clearEditor(editor: LexicalEditor) {
  editor.update(() => {
    const root = $getRoot();
    root.clear();
  });
}

/**
 *
 * @returns JSX.Element
 */
export default function ToolbarPlugin({ children }): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  // editor is editable or not
  const [isEditable, setIsEditable] = useState(() => activeEditor.isEditable());

  //undo redo
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  // all formatting styles are rendered or not
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  // updating the toolbar
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, [activeEditor]);
  // block type
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");

  // undo and redo changes
  useState(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => $updateToolbar());
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  });

  return (
    <>
      <div className="my-4 h-64 rounded-md bg-zinc-50 shadow-md shadow-gray-500 focus-within:outline-transparent lg:mx-10">
        <div className="mx-3 flex flex-row overflow-x-auto py-2">
          {/* font name and sizes
      <FontStyles /> */}
          {/* <BlockStylesToolBar blockType={keyof typeof blockTypeToBlockName} /> */}
          {blockType in blockTypeToBlockName && activeEditor === editor && (
            <BlockStylesToolBar blockType={blockType} editor={activeEditor} />
          )}
          {/* styles applied to text */}
          <div className={styles.textStyles}>
            <button
              className={`${styles.btn} ${isBold && "bg-zinc-400"}`}
              id="bold"
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
              }}
            >
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button
              className={`${styles.btn} ${isItalic && "bg-zinc-400"}`}
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                btnOnClick(ev);
              }}
            >
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
              className={`${styles.btn} ${isUnderline ? "bg-zinc-400" : null}`}
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
              }}
            >
              <FontAwesomeIcon icon={faUnderline} />
            </button>
            <button
              className={`${styles.btn} ${isStrikethrough && "bg-zinc-400"}`}
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
              }}
            >
              <FontAwesomeIcon icon={faStrikethrough} />
            </button>
          </div>
          {/* aligning the text */}
          <div className={styles.formatStyles}>
            <button className={styles.btn} onClick={btnOnClick}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button className={styles.btn} onClick={btnOnClick}>
              <FontAwesomeIcon icon={faAlignCenter} />
            </button>
            <button className={styles.btn} onClick={btnOnClick}>
              <FontAwesomeIcon icon={faAlignRight} />
            </button>
            <button className={styles.btn} onClick={btnOnClick}>
              <FontAwesomeIcon icon={faAlignJustify} />
            </button>
          </div>
        </div>
        {/* Text editor */}
        {children}
      </div>
      {/* down action plugin */}
      <div className="ml-4 flex flex-row flex-wrap items-start gap-2 lg:mx-10">
        {/* clear editor */}
        <button
          id="trash"
          name="trash"
          className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none"
          onClick={(ev) => clearEditor(activeEditor)}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            className="mx-2 mt-2 mb-1 text-lg text-neutral-900 group-disabled:text-zinc-400"
          />
        </button>
        <button
          disabled={!canUndo || !isEditable}
          // @ts-ignore
          onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND)}
          id="undo"
          name="undo"
          className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none"
        >
          <FontAwesomeIcon
            icon={faUndo}
            className="mx-2 mt-2 mb-1 text-lg text-neutral-900 group-disabled:text-zinc-400"
          />
        </button>
        <button
          disabled={!canRedo || !isEditable}
          // @ts-ignore
          onClick={() => activeEditor.dispatchCommand(REDO_COMMAND)}
          id="redo"
          name="redo"
          className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none"
        >
          <FontAwesomeIcon
            icon={faRedo}
            className="mx-2 mt-2 mb-1 text-lg text-neutral-900 group-disabled:text-zinc-400"
          />
        </button>
      </div>
    </>
  );
}

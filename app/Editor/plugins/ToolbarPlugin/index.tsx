import React, { useCallback, useEffect, useState } from "react";

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

// import css
import styles from "../../styles/toolbar.module.css";

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
  COMMAND_PRIORITY_EDITOR,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import { BlockStylesToolBar, blockTypeToBlockName } from "./formatText";
import { btnOnClick } from "./utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dynamic from "next/dynamic";

// components
import { Box, ButtonGroup, Divider, IconButton } from "@@/components";

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
export default function ToolbarPlugin({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  // editor is editable or not
  const [isEditable, setIsEditable] = useState(() => activeEditor.isEditable());

  // current format of the text
  const [isLeft, setIsLeft] = useState(true);
  const [isCenter, setIsCenter] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isJustify, setIsJustify] = useState(false);
  const [format, setFormat] = useState("");
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
    const root = $getRoot();
    if (root.hasFormat("left")) setFormat("left");
    else if (root.hasFormat("center")) setFormat("center");
    else if (root.hasFormat("right")) setFormat("right");
    else if (root.hasFormat("justify")) setFormat("justify");
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);
  // block type
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");

  useState(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => $updateToolbar());
      }),
      // changes on undo
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      // changes on redo
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        FORMAT_ELEMENT_COMMAND,
        (payload) => {
          if (payload === "left") setIsLeft(true);
          else if (payload === "center") setIsCenter(false);
          else if (payload === "right") setIsRight(false);
          else if (payload === "justify") setIsJustify(false);
          setFormat(payload);
          // $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  });

  return (
    <>
      <Box className="my-4 h-64 rounded-md bg-zinc-50 shadow-md shadow-gray-500 focus-within:outline-transparent lg:mx-10">
        <Box className="mx-3 flex flex-row overflow-x-auto py-2">
          {/* font name and sizes
      <FontStyles /> */}
          {/* <BlockStylesToolBar blockType={keyof typeof blockTypeToBlockName} /> */}
          {blockType in blockTypeToBlockName && activeEditor === editor && (
            <BlockStylesToolBar blockType={blockType} editor={activeEditor} />
          )}
          <Divider
            color="text.primary"
            orientation="vertical"
            className="mx-0.5 text-zinc-500"
          />
          {/* styles applied to text */}
          <ButtonGroup className="gap-1">
            <IconButton
              type="button"
              size="small"
              className={`${styles.btn} text-slate-900  ${isBold && "bg-zinc-400"}`}
              id="bold"
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
              }}
            >
              <FontAwesomeIcon icon={faBold} />
            </IconButton>
            <IconButton
              type="button"
              size="small"
              className={`${styles.btn} text-slate-900 ${isItalic && "bg-zinc-400"}`}
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                btnOnClick(ev);
              }}
            >
              <FontAwesomeIcon icon={faItalic} />
            </IconButton>
            <IconButton
              size="small"
              type="button"
              className={`${styles.btn} text-slate-900 ${
                isUnderline ? "bg-zinc-400" : null
              }`}
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
              }}
            >
              <FontAwesomeIcon icon={faUnderline} />
            </IconButton>
            <IconButton
              size="small"
              type="button"
              className={`${styles.btn} text-slate-900 ${
                isStrikethrough && "bg-zinc-400"
              }`}
              onClick={(ev) => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
              }}
            >
              <FontAwesomeIcon icon={faStrikethrough} />
            </IconButton>
          </ButtonGroup>

          <Divider className="mx-1 !text-slate-500" orientation="vertical" />

          {/* aligning the text */}
          <ButtonGroup className="gap-1">
            <IconButton
              size="small"
              type="button"
              className={`${styles.btn} text-slate-900 ${
                format === "left" && "!bg-zinc-400"
              }`}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              }}
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </IconButton>
            <IconButton
              size="small"
              type="button"
              className={`${styles.btn} text-slate-900 ${
                format === "center" && "!bg-zinc-400"
              }`}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              }}
            >
              <FontAwesomeIcon icon={faAlignCenter} />
            </IconButton>
            <IconButton
              size="small"
              type="button"
              className={`${styles.btn} text-slate-900 ${
                format === "right" && "!bg-zinc-400"
              }`}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              }}
            >
              <FontAwesomeIcon icon={faAlignRight} />
            </IconButton>
            <IconButton
              size="small"
              type="button"
              className={`${styles.btn} text-slate-900 ${
                format === "justify" && "!bg-zinc-400"
              }`}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
              }}
            >
              <FontAwesomeIcon icon={faAlignJustify} />
            </IconButton>
          </ButtonGroup>
        </Box>
        {/* Text editor */}
        {children}
      </Box>
      {/* down action plugin */}
      <ButtonGroup className=" flex flex-row flex-wrap items-start gap-2 lg:mx-10">
        {/* clear editor */}
        <IconButton
          size="small"
          type="button"
          id="trash"
          name="trash"
          className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none"
          // onClick={(ev) => clearEditor(activeEditor)}
          onClick={(ev) => clearEditor(activeEditor)}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            className="mx-2 mb-1 mt-2 text-lg text-neutral-900 group-disabled:text-zinc-400"
          />
        </IconButton>
        <IconButton
          size="small"
          type="button"
          disabled={!canUndo || !isEditable}
          // @ts-ignore
          onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND)}
          id="undo"
          name="undo"
          className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none"
        >
          <FontAwesomeIcon
            icon={faUndo}
            className="mx-2 mb-1 mt-2 text-lg text-neutral-900 group-disabled:text-zinc-400"
          />
        </IconButton>
        <IconButton
          size="small"
          disabled={!canRedo || !isEditable}
          // @ts-ignore
          onClick={() => activeEditor.dispatchCommand(REDO_COMMAND)}
          id="redo"
          name="redo"
          className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none"
        >
          <FontAwesomeIcon
            icon={faRedo}
            className="mx-2 mb-1 mt-2 text-lg text-neutral-900 group-disabled:text-zinc-400"
          />
        </IconButton>
      </ButtonGroup>
    </>
  );
}

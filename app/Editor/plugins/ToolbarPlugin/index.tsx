import React, { useCallback, useEffect, useRef, useState } from "react";

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
import { Typography } from "@@/joy";
import { Button, Container, FormControl, Modal, TextField } from "@@/components";
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
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { INSERT_YOUTUBE_VIDEO } from "../YoutubePlugin";

function clearEditor(editor: LexicalEditor) {
  editor.update(() => {
    const root = $getRoot();
    root.clear();
  });
}

const getVideoId = (url: string) => {
  const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

  const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

  if (id != null) {
    return id;
  }

  return "";
};
/**
 *
 * @returns {React.JSX.Element}
 */
export default function ToolbarPlugin({}): React.JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const url = useRef("");
  const [YtModalOpen, setYtModalOpen] = useState(false);

  // editor is editable or not
  const [isEditable, setIsEditable] = useState(() => activeEditor.isEditable());

  // current format of the text
  const [isLeft, setIsLeft] = useState(true);
  const [isCenter, setIsCenter] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isJustify, setIsJustify] = useState(false);
  const [format, setFormat] = useState("");

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

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => $updateToolbar());
      }),
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
  }, [$updateToolbar, activeEditor, editor]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    activeEditor.dispatchCommand(INSERT_YOUTUBE_VIDEO, getVideoId(url.current));
    setYtModalOpen(false);
  };

  return (
    <>
      {/* Will ask for youtube video url */}
      <Modal component="div" open={YtModalOpen} className="bg-slate-900">
        <Container className="mx-4 py-7">
          <FormControl
            component="form"
            className="m-auto flex flex-col gap-7"
            onSubmit={handleSubmit}
          >
            <Box>
              <TextField
                variant="standard"
                size="medium"
                label="Youtube Video"
                placeholder="Enter a Youtube embed url"
                onChange={(ev) => (url.current = ev.target.value)}
              />
            </Box>
            <Box className="flex flex-row justify-between">
              <Button
                type="button"
                variant="outlined"
                className="rounded-md shadow"
                onClick={() => setYtModalOpen(false)}
              >
                <Typography variant="plain" level="body3" className="">
                  Back
                </Typography>
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="rounded-md bg-blue-600 text-blue-50 shadow"
              >
                <Typography variant="plain" level="body1" className="">
                  Submit
                </Typography>
              </Button>
            </Box>
          </FormControl>
        </Container>
      </Modal>

      {/* toolbar */}

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
            className={`${styles.btn} text-slate-900 dark:text-slate-100  ${
              isBold && "bg-zinc-400"
            }`}
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
              isItalic && "bg-zinc-400"
            }`}
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
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
            className={`${styles.btn} text-slate-900 dark:text-slate-100 ${
              format === "justify" && "!bg-zinc-400"
            }`}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
            }}
          >
            <FontAwesomeIcon icon={faAlignJustify} />
          </IconButton>
        </ButtonGroup>

        <IconButton
          size="small"
          type="button"
          className={`${styles.btn} text-slate-900 dark:text-slate-100`}
          onClick={() => setYtModalOpen(true)}
        >
          <FontAwesomeIcon icon={faYoutube} />
        </IconButton>
      </Box>
    </>
  );
}

import React, { useEffect, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumpster,
  faTrashCan,
  faUndo,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

// lexical editor
import { mergeRegister } from "@lexical/utils";
import {
  $getRoot,
  $getSelection,
  LexicalEditor,
  EditorState,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  CAN_REDO_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// components
import { IconButton, ButtonGroup } from "@@/components";
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
export default function ActionPlugin() {
  const [editor] = useLexicalComposerContext(); //editor

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  useEffect(
    () =>
      mergeRegister(
        // changes on undo
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        ),
        // changes on redo
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      ),
    [editor]
  );
  return (
    <ButtonGroup className=" flex flex-row flex-wrap items-start gap-2 lg:mx-10">
      {/* clear editor */}
      <IconButton
        size="small"
        type="button"
        id="trash"
        name="trash"
        className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none dark:bg-slate-800 dark:shadow-slate-950"
        // onClick={(ev) => clearEditor(activeEditor)}
        onClick={(ev) => clearEditor(editor)}
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          className="mx-2 mb-1 mt-2 text-lg text-neutral-900 group-disabled:text-zinc-400 dark:text-slate-100"
        />
      </IconButton>
      <IconButton
        size="small"
        type="button"
        disabled={!canUndo || !isEditable}
        // @ts-ignore
        onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
        id="undo"
        name="undo"
        className="group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none dark:bg-slate-800 dark:shadow-slate-950"
      >
        <FontAwesomeIcon
          icon={faUndo}
          className="mx-2 mb-1 mt-2 text-lg text-neutral-900 group-disabled:text-zinc-400 dark:text-slate-100"
        />
      </IconButton>
      <IconButton
        size="small"
        disabled={!canRedo || !isEditable}
        // @ts-ignore
        onClick={() => editor.dispatchCommand(REDO_COMMAND)}
        id="redo"
        name="redo"
        className="dark group rounded-md bg-zinc-50 shadow-md shadow-zinc-400 hover:bg-zinc-200 active:bg-zinc-400 active:shadow-zinc-300 disabled:pointer-events-none dark:bg-slate-800"
      >
        <FontAwesomeIcon
          icon={faRedo}
          className="mx-2 mb-1 mt-2 text-lg text-neutral-900 group-disabled:text-zinc-400 dark:text-slate-100"
        />
      </IconButton>
    </ButtonGroup>
  );
}

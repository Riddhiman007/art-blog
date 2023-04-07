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
  const [activeEditor, setActiveEditor] = useState(editor); //active editor

  // undo and redo state changes
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // editor can be editable
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  // useEffect(() => {
  //   const redo = document.getElementById("redo");
  //   redo.setAttribute("disabled", "true");
  //   const undo = document.getElementById("undo");
  //   undo.addEventListener("click", () => redo.removeAttribute("disabled"));
  // });

  // configure undo and redo
  useEffect(() => {
    // undo
    return mergeRegister(
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
  );
}

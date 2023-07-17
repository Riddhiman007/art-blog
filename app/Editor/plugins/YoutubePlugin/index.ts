"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, } from "lexical";
import React, { useEffect, useRef, useState } from "react";
import { $createYoutubeNode, YoutubeProps } from "../../nodes/YoutubeNode";

// components
import { Box, Button, Container, Modal, TextField } from "@@/components";
import { Typography } from "@@/joy";


export const INSERT_YOUTUBE_VIDEO = createCommand<string>("INSERT_YOUTUBE_VIDEO");

export default function YoutubePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_YOUTUBE_VIDEO,
      (payload) => {
        const YoutubeNodef = $createYoutubeNode(payload);
        $insertNodes([YoutubeNodef]);

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);
  return null;
}

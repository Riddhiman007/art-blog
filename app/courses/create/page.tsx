"use client";
import React, { useRef } from "react";

import Background from "@@/static/img/grunge-abstract-minimal-background_250469-4317.jpg";
import { Box, Container, Header, Typography } from "@@/components";
import Editor, { HTMLPlugin } from "@/app/Editor";
/**
 *
 * @returns a page to create a new course
 */
export default function CreateCourse() {
  const editorOutput = useRef<any>("");
  return (
    <>
      <Header image={Background}></Header>
      <Container>
        <Box>
          <Editor
            placeholder={
              <Typography className="absolute block" component="p" variant="body1">
                Enter content of the course
              </Typography>
            }
            onChange={(editorState, editor) => {
              editorState.read(() => {
                editorOutput.current = editor;
                console.log(editor);
              });
            }}
          />
        </Box>
      </Container>
    </>
  );
}

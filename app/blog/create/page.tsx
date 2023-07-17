"use client";
import React, { useRef } from "react";

// components
import { Box, Typography } from "@@/joy";
import { FormControl, TextField } from "@@/components";

import { Controller, useForm } from "react-hook-form";
import Editor, { HTMLPlugin } from "@@/Editor";

export default function CreateBlog() {
  const { control, handleSubmit } = useForm();
  const description = useRef<string>();
  return (
    <>
      <Box className=" h-fit ">
        <FormControl component="form" className="m-7 h-full w-full">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField {...field} error={error && true} />
            )}
          />
          <Editor
            placeholder={
              <Typography variant="plain" level="body1" className="absolute">
                Enter content of the blog
              </Typography>
            }
            onChange={(editorState, editor) =>
              (description.current = HTMLPlugin(editorState, editor))
            }
          />
        </FormControl>
      </Box>
    </>
  );
}

"use client";
import React, { useContext, useRef } from "react";

// components
import { Box, Typography } from "@@/joy";
import { Button, FormControl, TextField } from "@@/components";

import { Controller, FieldValues, useForm } from "react-hook-form";
import Editor, { HTMLPlugin } from "@@/Editor";
import { MobileFirstContext } from "@/app/context";
import { useSession } from "next-auth/react";

export default function CreateBlog() {
  const { control, handleSubmit } = useForm();
  const { data, status } = useSession();
  const description = useRef<string>();
  const isMobile = useContext(MobileFirstContext);
  if (status === "unauthenticated") {
    return (
      <>
        <Typography level="h3">You are unauthorized</Typography>
      </>
    );
  }
  const user = data?.user;

  const registerBlog = async (field: FieldValues) => {
    const query = await fetch("/handler/blog/create", {
      method: "POST",
      body: JSON.stringify({
        title: field.Title,
        content: description.current,
        author: user,
      }),
    });
    const res = await query.json();
    console.log(query.status);
  };
  return (
    <>
      <Box className="m-0 h-fit lg:m-6 xxl:mx-10 xxl:my-7">
        <FormControl
          component="form"
          className="m-0 flex h-full flex-col md:m-7"
          style={{ width: "-webkit-fill-available" }}
          onSubmit={handleSubmit(registerBlog)}
        >
          <Controller
            name="Title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={field.name}
                placeholder="Enter the name of your Blog"
                error={error && true}
                size={isMobile ? "small" : "medium"}
                className="lg:mb-5"
              />
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

          <Box
            style={{ width: "-webkit-fill-available" }}
            className="flex flex-row justify-end"
          >
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-700/90 text-slate-100 hover:bg-blue-800 active:bg-blue-900/90"
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </>
  );
}

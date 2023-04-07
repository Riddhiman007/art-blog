import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

// lexical
import { $generateHtmlFromNodes } from "@lexical/html";
import Header from "../../components/Header";

const Editor = dynamic(() => import("../../Editor"), {
  ssr: false,
  loading: () => <p className="text-6xl text-black">Loading editor...</p>,
});

export default function CreatePost() {
  const [isVisible, setIsVisible] = useState(false);

  const editorOutput = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(editorOutput.current);
  };

  useEffect(() => setIsVisible(true));
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Header className="!bg-gradient-to-tr !from-blue-900 !via-purple-700 !to-teal-900">
          <div className="flex flex-col flex-wrap items-center gap-2">
            <h1>
              <input
                type="text"
                className="bg-transparent text-center text-4xl text-zinc-50 placeholder:text-zinc-50 focus:outline-none"
                placeholder="Click to add title..."
              />
            </h1>
            <p className="subheading">
              <input
                type="text"
                className="subheading bg-transparent text-center text-lg text-white placeholder:text-zinc-100 focus:outline-none"
                placeholder="Click to add subtitle..."
              />
            </p>
          </div>
        </Header>
        <div className="container mx-auto mt-8 flex flex-col">
          <div className="mx-6 my-4">
            <Editor
              placeholder={<p className="absolute block ">Enter description...</p>}
              onChange={(editorState, editor) => {
                editorState.read(() => {
                  const getHtml = $generateHtmlFromNodes(editor);
                  editorOutput.current = getHtml;
                });
              }}
            />
            <div className="submit mt-3">
              <button
                type="submit"
                className="hover:!bg-blue-700 focus:!bg-blue-800 active:!bg-blue-900"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

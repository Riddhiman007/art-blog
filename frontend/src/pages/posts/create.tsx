/* eslint-disable tailwindcss/no-custom-classname */
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";

// lexical
import { $generateHtmlFromNodes } from "@lexical/html";
import Header from "../../components/Header";

// @ts-ignore
const Editor = dynamic(() => import("../../Editor"), {
  ssr: false,
  loading: () => <p className="text-6xl text-black">Loading editor...</p>,
});

/**
 *
 * @returns JSX.Element
 */
export default function CreatePost() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const editorOutput = useRef();
  // useEffect(() => {
  //   if (session?.error == "RefreshAccessTokenError") {
  //     signIn();
  //   }
  // });
  const createPost = async (title: string, content: string, subtitle?: string) => {
    const res = await fetch("http://127.0.0.1:8000/post/create", {
      method: "POST",
      headers: {
        accept: "application/json",
        // @ts-ignore
        Authorization: `Bearer ${session.user.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `title=${title}&sub_title=${subtitle}&content=${content}`,
    });
    const data = await res.json();
    if (res.ok) {
      //@ts-ignore
      router.push(`/${session.user.username}/${data.slug}`);
      // needs to be updated
      alert("Created post successfully");
    }
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await createPost(title, editorOutput.current, subTitle);
    console.log(editorOutput.current);
  };

  useEffect(() => setIsVisible(true), [isVisible]);
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
                name="title"
                id="title"
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </h1>
            <p className="subheading">
              <input
                type="text"
                className="subheading bg-transparent text-center text-lg text-white placeholder:text-zinc-100 focus:outline-none"
                placeholder="Click to add subtitle..."
                name="subtitle"
                id="subtitle"
                onChange={(ev) => setSubTitle(ev.target.value)}
              />
            </p>
          </div>
        </Header>
        <main>
          <div className="container mx-auto mt-8 flex flex-col">
            <div className="mx-6 my-4">
              <Editor
                placeholder={<p className="absolute block ">Enter description...</p>}
                onChange={(editorState, editor) => {
                  editorState.read(() => {
                    const getHtml = $generateHtmlFromNodes(editor);
                    //@ts-ignore
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
        </main>
      </form>
    </>
  );
}

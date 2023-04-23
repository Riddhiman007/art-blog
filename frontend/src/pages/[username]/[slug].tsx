import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Header from "../../components/Header";
import image from "../../static/img/grunge-abstract-minimal-background_250469-4317.jpg";

interface PostProps {
  title: string;
  sub_title: string;
  content: string;
  slug: string;
  id: number;
  author_id: number;
  creation_time: string;
  author: {
    FullName: string;
    username: string;
    email: string;
    id: number;
  };
}

export default function ViewPost({ post }) {
  // }: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log(post.creation_time);
  const { data: session } = useSession();
  useEffect(() => {
    //@ts-ignore
    session.error == "RefreshTokenAccessError" ? signIn() : null;
  }, [session]);
  return (
    <>
      {/* header page */}
      <Header image={image}>
        <div className="mb-5 text-left">
          <div className="ml-10 flex flex-col gap-3">
            <h1 className="text-5xl">{post.title}</h1>
            <p className="text-xl">{post.sub_title}</p>
            {/* pager */}
            <p className="text-base italic">
              Posted by{" "}
              <span className="text-lg font-semibold">{post.author.FullName}</span> on{" "}
              {post.creation_time}
            </p>
          </div>
        </div>
      </Header>

      {/* main content */}
      <main>
        <div className="flex flex-row justify-center align-middle ">
          <div
            className="container flex flex-col flex-wrap justify-center"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/${context.params.username}/${context.params.slug}`,
    { method: "GET" }
  );
  const data = await res.json();
  console.log(data);

  return {
    props: { post: data },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/post/all`, {
    method: "POST",
    body: "",
  });
  const posts: Array<PostProps> = await res.json();

  const paths = posts.map((post) => {
    const view = {
      params: {
        username: post.author.username,
        slug: post.slug,
      },
    };
    return view;
  });
  console.log(posts);

  return {
    paths: paths,
    fallback: "blocking",
  };
};

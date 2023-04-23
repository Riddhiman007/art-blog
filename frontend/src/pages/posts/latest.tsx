import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React from "react";

export default function latestPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(post.posts);
  const posts = post.posts;
  return (
    <div>
      {posts.map((post) => (
        <p>{post.content}</p>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const res = await fetch(process.env.BACKEND_URL + "/post/latest");
  const data = await res.json();
  const posts = [data.posts];
  return {
    props: {
      post: data,
    },
    revalidate: 10,
  };
};

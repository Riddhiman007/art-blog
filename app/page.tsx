import React from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Ganesh from "./static/img/ganesh_edited.jpg";

// mui conponents
import { Box, Button, Container, Typography, Header } from "./components";
import { getServerSession } from "next-auth";
import { log } from "console";

export default async function Home() {
  return (
    <>
      <Header image={Ganesh}>
        <Box className="flex w-full flex-col gap-4">
          <Typography
            variant="h3"
            className=" text-center text-slate-950 text-opacity-100 dark:text-slate-100"
          >
            Kalaspandan Art Gallery
          </Typography>
          <Typography variant="h5" className="text-center opacity-90 ">
            Dream website for artists
          </Typography>
        </Box>
      </Header>
      <Container className="mb-12">
        <Box className="mx-auto grid grid-cols-2 justify-center gap-7 !px-10 lg:!px-12 xl:grid-cols-4">
          {/* Blog posts */}
          <Box className="h-fit rounded-md bg-white p-3 shadow-zinc-500 drop-shadow-md dark:bg-slate-800 dark:text-slate-50 dark:shadow-slate-400">
            <Box className="mx-4 my-7">
              {/* Post preview */}
              <Link href="/" className="text-gray-900 dark:text-slate-100">
                <Typography
                  variant="h2"
                  className=" mb-4 text-3xl font-extrabold [line-height:1.2]"
                >
                  Man must explore, and this is exploration at its greatest
                </Typography>
                <Typography variant="h4" className="mb-[0.625rem] text-xl font-[300]">
                  Problems look mighty small from 150 miles up
                </Typography>
              </Link>
              <Typography
                variant="body1"
                className="mx-[2rem_0] mt-0 text-base italic text-slate-600 dark:text-slate-400"
              >
                Posted by <Link href="/">Start Bootstrap</Link> on March 5, 2023
              </Typography>
            </Box>
          </Box>
          <Box className="h-fit rounded-md bg-white p-3 shadow-zinc-500 drop-shadow-md dark:bg-slate-800 dark:text-slate-50">
            <Box className="mx-4 my-7">
              {/* Post preview */}
              <Link href="/" className="text-gray-900 dark:text-slate-100">
                <Typography
                  variant="h2"
                  className=" mb-4 text-3xl font-extrabold [line-height:1.2]"
                >
                  Man must explore, and this is exploration at its greatest
                </Typography>
                <Typography variant="h4" className="mb-[0.625rem] text-xl font-[300]">
                  Problems look mighty small from 150 miles up
                </Typography>
              </Link>
              <Typography
                variant="body1"
                className="mx-[2rem_0] mt-0 text-base italic text-slate-600 dark:text-slate-400"
              >
                Posted by <Link href="/">Start Bootstrap</Link> on March 5, 2023
              </Typography>
            </Box>
          </Box>
          <Box className="h-fit rounded-md bg-white p-3 shadow-zinc-500 drop-shadow-md dark:bg-slate-800 dark:text-slate-50">
            <Box className="mx-4 my-7">
              {/* Post preview */}
              <Link href="/" className="text-gray-900 dark:text-slate-100">
                <Typography
                  variant="h2"
                  className=" mb-4 text-3xl font-extrabold [line-height:1.2]"
                >
                  Man must explore, and this is exploration at its greatest
                </Typography>
                <Typography variant="h4" className="mb-[0.625rem] text-xl font-[300]">
                  Problems look mighty small from 150 miles up
                </Typography>
              </Link>
              <Typography
                variant="body1"
                className="mx-[2rem_0] mt-0 text-base italic text-slate-600 dark:text-slate-400"
              >
                Posted by <Link href="/">Start Bootstrap</Link> on March 5, 2023
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="mr-7 flex flex-row justify-end">
          <Button
            variant="contained"
            className="bg-blue-700 px-6 py-4 hover:bg-blue-900 "
          >
            <Typography variant="body2" className="text-base dark:text-slate-100">
              Older Posts ...
            </Typography>
          </Button>
        </Box>
      </Container>
    </>
  );
}

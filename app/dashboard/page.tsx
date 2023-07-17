"use client";
import React from "react";
import { useParams } from "next/navigation";

//components
import Carousel from "react-material-ui-carousel";
import { Avatar, Box, Container } from "@@/components";
import { Typography, Card, CardContent } from "@@/joy";
import { useSession } from "next-auth/react";

/**
 *
 * @returns The dashboard of the user
 */
export default async function Dashboard() {
  const { data } = useSession();
  const user: any = data?.user;
  const fullname = `${user?.firstname} ${user?.middlename} ${user?.lastname}`;
  return (
    <>
      <Carousel cycleNavigation animation="slide" className="h-screen">
        <Box className="h-full w-full bg-blue-100 ">
          <Container className="mx-auto flex flex-row justify-center ">
            <Card
              variant="soft"
              orientation="vertical"
              className="my-7 w-fit  gap-7 bg-blue-700 px-4 py-7"
            >
              <CardContent className="flex flex-col gap-7">
                <Typography
                  level="h3"
                  component="h3"
                  variant="solid"
                  className="bg-inherit"
                >
                  Riddhiman Rudranarayan Chowdhury
                </Typography>
                <Typography
                  level="h5"
                  component="h5"
                  variant="soft"
                  className="bg-inherit"
                >
                  kgjskl007
                </Typography>
                <Typography
                  level="h6"
                  component="h6"
                  variant="soft"
                  className="bg-inherit"
                >
                  rid56593@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Carousel>
    </>
  );
}

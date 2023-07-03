"use client";
import React from "react";
import { useParams } from "next/navigation";

//components
import Carousel from "react-material-ui-carousel";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@@/components";
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
        <Box className="h-full w-full bg-blue-100">
          <Container className="mx-auto flex flex-col justify-center ">
            <Card
              variant="elevation"
              className="my-7 flex w-fit flex-row items-center gap-7 bg-blue-700 px-4 py-7"
            >
              <CardMedia>
                <Avatar variant="circular" className="h-7 w-7 text-lg">
                  R
                </Avatar>
              </CardMedia>
              <CardContent className="flex flex-col gap-7">
                <Typography variant="h3" component="h3">
                  Riddhiman Rudranarayan Chowdhury
                </Typography>
                <Typography variant="h5" component="h5">
                  kgjskl007
                </Typography>
                <Typography variant="h6" component="h6">
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

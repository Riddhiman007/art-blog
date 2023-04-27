import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import { FaBlog } from "react-icons/fa";

export default function dashboard() {
  return (
    <>
      <Container className="py-10">
        <CssBaseline />
        <Card
          aria-label="posts created"
          className="flex flex-row gap-2 bg-blue-700 px-6 py-4"
        >
          <Box className="text-center">
            <CardMedia>
              <Icon>
                <FaBlog className="h-7 w-7 text-blue-50" />
              </Icon>
            </CardMedia>
          </Box>
          <Box className="w-full">
            <CardHeader title="Posts:" />
            <CardContent>1527</CardContent>
          </Box>
        </Card>
      </Container>
    </>
  );
}

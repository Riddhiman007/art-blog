"use client";
import React from "react";

// components
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardCover,
  CardOverflow,
  Container,
  Typography,
} from "@@/joy";

// youtube player
import YouTube, { YouTubePlayer } from "react-youtube";

export default function Videos() {
  return (
    <Container className="mt-10">
      {/* the main area */}
      <Box component="main" className="flex flex-col gap-7">
        <Box component="section" className="grid grid-cols-3 gap-7">
          <Card className="h-fit">
            <CardOverflow className="h-fit">
              <AspectRatio ratio="2" objectFit="fill">
                <YouTube videoId="ZFlvdHDyDaM" iframeClassName="h-full w-full" />
              </AspectRatio>
            </CardOverflow>
            <CardContent className="ml-4 flex flex-col gap-2">
              <Typography variant="plain" level="h5">
                Draw a pond Lily
              </Typography>
              <Typography variant="plain" level="body1">
                Oil Painting
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardCover>
              <YouTube videoId="ZFlvdHDyDaM" iframeClassName="w-full h-full" />
            </CardCover>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}

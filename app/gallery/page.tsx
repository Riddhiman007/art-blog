import React from "react";

import Image from "next/image";
// img
import Ganesh from "../static/img/ganesh_edited.jpg";
// icons
import { MdSearch } from "react-icons/md";
// components
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "../components";

/**
 *
 * @returns The page to diverse pictures made by our creators
 */
export default function Gallery() {
  return (
    <>
      <Container className="pt-7">
        {/* welcome heading */}
        <Box className="mx-auto mb-7">
          <Typography variant="h3" className="mx-10 mb-4 font-serif text-xl italic">
            Welcome to{" "}
          </Typography>
          <Box className="flex flex-row justify-center">
            <Typography
              className=" border-separate border-b-2 border-b-zinc-600 font-serif text-5xl font-extrabold text-zinc-900"
              style={{
                gridColumn: 2,
                gridRow: 2,
              }}
              variant="h1"
            >
              Kalaspandan Art Gallery
            </Typography>
          </Box>
        </Box>

        <Box className="grid grid-cols-3 gap-7">
          <Card>
            <CardActionArea>
              <CardMedia>
                <Image src={Ganesh} alt="Ganesh" />
              </CardMedia>
              <CardContent>
                <CardHeader>
                  <Typography variant="h4">Ganesh</Typography>
                </CardHeader>
                <Typography variant="body2">
                  This is a painting made with watercolor.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardMedia>
                <Image src={Ganesh} alt="Ganesh" />
              </CardMedia>
              <CardContent>
                <CardHeader>
                  <Typography variant="h4">Ganesh</Typography>
                </CardHeader>
                <Typography variant="body2">
                  This is a painting made with watercolor.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardMedia>
                <Image src={Ganesh} alt="Ganesh" />
              </CardMedia>
              <CardContent>
                <CardHeader>
                  <Typography variant="h4">Ganesh</Typography>
                </CardHeader>
                <Typography variant="body2">
                  This is a painting made with watercolor.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardMedia>
                <Image src={Ganesh} alt="Ganesh" />
              </CardMedia>
              <CardContent>
                <CardHeader>
                  <Typography variant="h4">Ganesh</Typography>
                </CardHeader>
                <Typography variant="body2">
                  This is a painting made with watercolor.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Container>
    </>
  );
}

import React, { CSSProperties } from "react";
import PropTypes from "prop-types";

import Ganesh from "../static/img/ganesh.jpg";
import Image, { StaticImageData } from "next/image";

import { Container, Box, Typography } from ".";

function Header(props) {
  return (
    <header className="h-screen">
      <Image src={props.image} alt="loading" fill className="static opacity-50" />
      <Container className="flex flex-col justify-center py-12">
        <Box>
          <Typography>Kalaspandan Art Gallery</Typography>
        </Box>
      </Container>
    </header>
  );
}

Header.defaultProps = {
  title: "Art Blog",
};

export default Header;

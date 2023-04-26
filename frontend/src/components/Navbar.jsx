// import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavbarConfig from "../static/scripts/navbar";
import { useSession } from "next-auth/react";

// ui imports
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdMenu, MdSearch, MdShieldMoon, MdSunny } from "react-icons/md";

// import { Menu } from "@headlessui/react";
// icons
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { HiHome } from "react-icons/hi2";
import { MdDashboard, MdLogin, MdLogout } from "react-icons/md";
import { HiUserAdd, HiUserCircle, HiMoon } from "react-icons/hi";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // React.useEffect(() => NavbarConfig(document.getElementById("mainNav")));
  return (
    <AppBar
      variant="elevation"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      className="bg-blue-50"
      component="nav"
    >
      <Container className="my-2 flex flex-row justify-between">
        <CssBaseline />
        {/* sidebar button */}
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="text-zinc-900"
          aria-label="open drawer"
          edge="start"
        >
          <MdMenu className="h-6 w-6" />
        </IconButton>
        <div className="flex flex-row justify-evenly gap-3">
          <div>
            <IconButton>
              <MdSearch />
            </IconButton>
          </div>
          {/* dark mode */}
          <div>
            <IconButton onClick={() => setIsDark(!isDark)}>
              {isDark ? <MdSunny /> : <HiMoon />}
            </IconButton>
          </div>
          {session ? (
            /* avatar */
            <Avatar sx={{ width: "3rem", height: "3rem" }} variant="circular">
              <Image
                alt=""
                fill
                // className="m-auto inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </Avatar>
          ) : (
            <>
              <Button
                LinkComponent={Link}
                href="/auth/login"
                className="bg-blue-700 text-blue-50"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                href="/auth/register"
                className="bg-stone-800 text-stone-50"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Container>

      {/* sidebar */}
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        draggable="true"
        variant="temporary"
        slotProps={{ backdrop: "w-72 bg-pink-900" }}
        className="w-72"
        sx={{ width: "18rem", display: "block", marginTop: "64px" }}
      >
        <Box
          sx={{ width: "18rem", height: "100%", marginTop: "64px" }}
          className="flex h-full flex-col bg-blue-50"
        >
          {/* profile area */}
          <div className="my-8 flex flex-col justify-center">
            <div className="flex flex-row items-center justify-center">
              <Avatar
                sx={{ width: "5rem", height: "5rem" }}
                variant="circular"
                className="text-center"
              >
                <Image
                  alt=""
                  fill
                  // className="m-auto inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
              </Avatar>
            </div>
          </div>
          <Divider />
          <List className="px-4">
            {/* home */}
            <ListItemButton className="rounded-md shadow-zinc-500 hover:shadow-md">
              <ListItemIcon>
                <HiHome className="h-5 w-5" />
              </ListItemIcon>
              <ListItemText className="text-center">Home</ListItemText>
            </ListItemButton>

            {/* profile */}
            <ListItemButton className="rounded-md shadow-zinc-500 hover:shadow-md">
              <ListItemIcon>
                <HiUserCircle className="h-5 w-5" />
              </ListItemIcon>
              <ListItemText className="text-center">Profile</ListItemText>
            </ListItemButton>

            {/* home */}
            <ListItemButton className="rounded-md shadow-zinc-500 hover:shadow-md">
              <ListItemIcon>
                <MdDashboard className="h-5 w-5" />
              </ListItemIcon>
              <ListItemText className="text-center">Dashboard</ListItemText>
            </ListItemButton>
          </List>

          <Divider />
        </Box>
      </SwipeableDrawer>
    </AppBar>
  );
}

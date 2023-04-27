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
  Menu,
  MenuItem,
  MenuList,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
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

  // ui states
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(anchorEl);
  useEffect(() => {
    const query = window.matchMedia("(min-width:992px)");
    window.addEventListener("load", () => setIsLandscape(query.matches));
    window.addEventListener("resize", (ev) => setIsLandscape(query.matches)); // whether the size of the window matches the required media
  }, []);

  // React.useEffect(() => NavbarConfig(document.getElementById("mainNav")));
  return (
    <>
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
            aria-label="click here to open navbar"
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
              <>
                {/* avatar */}
                <Tooltip title="Profile">
                  <IconButton onClick={(ev) => setAnchorEl(ev.currentTarget)}>
                    <Avatar sx={{ width: "3rem", height: "3rem" }} variant="circular">
                      <Image
                        alt=""
                        fill
                        // className="m-auto inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>

                {/* profile menu */}
                <Menu
                  anchorEl={anchorEl}
                  MenuListProps={{ variant: "menu" }}
                  variant="menu"
                  open={profileMenuOpen}
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuList>
                    <Divider />
                    <MenuItem LinkComponent={Link} href="/api/auth/logout">
                      <ListItemIcon>
                        <MdLogin className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
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
      </AppBar>

      {/* sidebar */}
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        draggable="true"
        variant={isLandscape ? "permanent" : "temporary"}
        className="w-72"
        sx={{ width: "18rem", display: "block", marginTop: "64px" }}
      >
        <Box
          sx={{ width: "18rem", height: "100%", marginTop: "64px" }}
          className="flex h-full flex-col bg-blue-50"
        >
          {session && (
            <>
              {/* profile area */}
              <Box className="my-8 flex flex-col justify-center gap-4">
                {/* avatar */}
                <Box className="flex flex-row items-center justify-center">
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
                </Box>
                {/* user details */}
                <Box className="mx-4 flex flex-col gap-2">
                  {/* Full name */}
                  <Typography
                    textAlign="center"
                    component="h6"
                    className="text-xl font-semibold"
                    variant="h6"
                  >
                    {session.user.FullName}
                  </Typography>
                  {/* nickname */}
                  <Typography
                    textAlign="center"
                    component="p"
                    className="font-serif text-lg"
                  >
                    {session.user.username}
                  </Typography>
                  {/* email */}
                  <Typography textAlign="center" component="p" className="italic ">
                    {session.user.email}
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </>
          )}
          <List className="flex flex-col gap-1 px-4">
            {/* home */}
            <ListItemButton
              LinkComponent={Link}
              href="/"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <HiHome className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Home
              </ListItemText>
            </ListItemButton>

            {/* profile */}
            <ListItemButton
              LinkComponent={Link}
              href="/profile"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <HiUserCircle className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Profile
              </ListItemText>
            </ListItemButton>

            {/* dashboard */}
            <ListItemButton
              LinkComponent={Link}
              href="/dashboard"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <MdDashboard className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Dashboard
              </ListItemText>
            </ListItemButton>
          </List>
          <Divider />

          {/* post, image, videos contents */}
          <List className="flex flex-col gap-1 px-4">
            {/* home */}
            <ListItemButton
              LinkComponent={Link}
              href="/"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <HiHome className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Posts
              </ListItemText>
            </ListItemButton>

            {/* profile */}
            <ListItemButton
              LinkComponent={Link}
              href="/profile"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <HiUserCircle className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Profile
              </ListItemText>
            </ListItemButton>

            {/* dashboard */}
            <ListItemButton
              LinkComponent={Link}
              href="/dashboard"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <MdDashboard className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Dashboard
              </ListItemText>
            </ListItemButton>
          </List>
          <Divider />
          <List className="mb-8">
            {/* logout */}
            <ListItemButton
              LinkComponent={Link}
              href="/api/auth/signout"
              TouchRippleProps={{ className: "text-zinc-300" }}
              className="group rounded-md shadow-zinc-700 outline-transparent hover:bg-zinc-900 hover:shadow-xl"
            >
              <ListItemIcon>
                <MdLogout className="h-5 w-5 text-zinc-800 group-hover:text-zinc-50" />
              </ListItemIcon>
              <ListItemText className="text-center text-zinc-900 group-hover:text-zinc-50">
                Logout
              </ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

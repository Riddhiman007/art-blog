"use client";
import React, { useRef, MouseEvent } from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// components
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Input,
  FormControl,
  IconButton,
  Modal,
} from "../../components";

// otp input
import { MuiOtpInput } from "mui-one-time-password-input";
import Link from "next/link";
import { signIn } from "next-auth/react";
// import { createUser } from "../../db/user"; // registration function

/**
 *
 * This function will create a new user
 */
export default async function Register() {
  const firstName = useRef<string>();
  const middleName = useRef<string | null>();
  const lastName = useRef<string>();
  const email = useRef<string>();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const res = await fetch("/user/create", {
      method: "POST",
      body: JSON.stringify({
        firstname: firstName.current,
        middlename: middleName.current,
        lastname: lastName.current,
        email: email.current,
      }),
    });
    const data = await res.json();
    const signed = await signIn("email", { email: data.email });
    if (!signed?.ok) console.error(signed?.error);
  };
  return (
    <>
      <Box className="mt-7 pl-7">
        <Typography component="h2" variant="h3" className="dark:text-slate-100">
          Register your self
        </Typography>
      </Box>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        method="post"
        className="m-7 mt-0 flex flex-col gap-4"
      >
        <Box className="flex flex-row gap-4">
          <TextField
            label="First Name"
            required
            id="firstname"
            name="firstname"
            onChange={(ev) => (firstName.current = ev.target.value)}
          />
          <TextField
            label="Middle Name"
            id="middlename"
            name="middlename"
            onChange={(ev) => (middleName.current = ev.target.value)}
          />
          <TextField
            label="Last Name"
            id="lastname"
            required
            name="lastname"
            onChange={(ev) => (lastName.current = ev.target.value)}
          />
        </Box>
        <TextField
          label="Email"
          type="email"
          required
          name="email"
          onChange={(ev) => (email.current = ev.target.value)}
        />

        {/* submit */}
        <Box className="flex flex-row justify-between">
          <Link href="/auth/login">
            <Typography variant="body2">Already registered? Then log in...</Typography>
          </Link>
          <Button type="submit" variant="contained" className="bg-blue-700 text-blue-50">
            Submit
          </Button>
        </Box>
      </FormControl>
    </>
  );
}

// <TextField
//   label="password"
//   id="password"
//   type={showPassword ? "text" : "password"}
//   autoComplete="current-password"
//   required
//   InputProps={{
//     endAdornment: (
//       <InputAdornment position="end">
//         <IconButton
//           onClick={handleShowPassword}
//           onMouseDown={handleMouseDownPassword}
//         >
//           {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
//         </IconButton>
//       </InputAdornment>
//     ),
//   }}
// />;

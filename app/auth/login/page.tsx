"use client";
import React, { useState } from "react";

// link
import Link from "next/link";

// icons
import { MdEmail, MdAnchor, MdVisibility } from "react-icons/md";

// otp input
import { MuiOtpInput } from "mui-one-time-password-input";
//components
import {
  Box,
  Button,
  Container,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "../../components";

import { signIn } from "next-auth/react";
export default function Login() {
  // whether the modal is shown
  const [showModal, setShowModal] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");

  /**
   *
   * @param ev The main Form element
   * It will trigger when the user has clicked the submit button
   *
   */
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault;
    setShowModal(true);
    console.log("submit clicked");
    const logged = signIn("email", { email: email });
    logged.then(() => console.log("logged in successfully"));
  };
  // set the value of otp
  const [otp, setOtp] = useState("");
  return (
    <>
      <Box className="mt-7 pl-7">
        <Typography component="h2" variant="h3">
          Login
        </Typography>
      </Box>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        className="m-7 mt-0 flex flex-col gap-4"
      >
        <TextField
          label="Email"
          type="text"
          name="email"
          onChange={(ev) => setEmail(ev.currentTarget.value)}
          required
          placeholder="Please enter your email address"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <MdEmail />
                </Icon>
              </InputAdornment>
            ),
          }}
        />

        {/* submit */}
        <Box className="grid gap-4">
          <Link href="/auth/register">
            <Typography variant="body2">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account? Then create one...
            </Typography>
          </Link>
          <Button
            type="submit"
            variant="contained"
            className="hover:text-green-400focus:text-green-400 bg-green-800 text-green-50 shadow-xl shadow-slate-500 hover:bg-green-950"
            sx={{ gridColumn: 2, gridRow: "2" }}
          >
            Sign up
          </Button>
        </Box>
      </FormControl>
    </>
  );
}

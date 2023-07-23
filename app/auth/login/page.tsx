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

// form control
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

interface IFormInputs {
  email: string;
}
export default function Login() {
  // whether the modal is shown

  // form components
  const { control, handleSubmit } = useForm();
  /**
   *
   * @param ev The main Form element
   * It will trigger when the user has clicked the submit button
   *
   */
  const submitLogin: SubmitHandler<FieldValues> = async (data) => {
    console.log("submit clicked");
    const res = await fetch("/handler/login", {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });
    const info = await res.json();
    const logged = signIn("email", { email: info.email });
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
        onSubmit={handleSubmit(submitLogin)}
        className="m-7 mt-0 flex flex-col gap-4"
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email or username"
              placeholder="Please enter your email address or username"
              variant="standard"
              FormHelperTextProps={{ error: true }}
              helperText={
                <>
                  {error && (
                    <Typography
                      variant="body2"
                      className="text-red-600 dark:text-red-400"
                    >
                      {error?.type === "required" &&
                        "Either enter your email address or username"}
                    </Typography>
                  )}
                </>
              }
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
          )}
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
            className="bg-green-800 text-green-50 shadow shadow-slate-700 hover:bg-green-950 hover:text-green-400 focus:text-green-400 dark:shadow-green-950"
            sx={{ gridColumn: 2, gridRow: "2" }}
          >
            Log in
          </Button>
        </Box>
      </FormControl>
    </>
  );
}

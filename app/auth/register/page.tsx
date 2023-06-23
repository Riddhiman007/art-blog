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
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { createUser } from "../../db/user"; // registration function

/**
 *
 * This function will create a new user
 */
export default async function Register() {
  // form hook
  const { control, handleSubmit } = useForm();

  const submitRegistration: SubmitHandler<FieldValues> = async (user) => {
    const res = await fetch("/user/create", {
      method: "POST",
      body: JSON.stringify({
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.lastname,
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
        onSubmit={handleSubmit(submitRegistration)}
        className="m-7 mt-0 flex flex-col gap-4"
      >
        <Box className="flex flex-row gap-4">
          <Controller
            control={control}
            rules={{ required: true }}
            name="firstname"
            render={({ fieldState: { error } }) => (
              <TextField
                helperText={
                  error && (
                    <Typography variant="body2">
                      {error.type === "required" && "Please enter your first name"}
                    </Typography>
                  )
                }
              />
            )}
          />

          <Controller name="middlename"
            render={() => (
              <TextField label="Middle Name" id="middlename"  />
            )}
          />

          <TextField label="Last Name" id="lastname" required name="lastname" />
        </Box>
        <TextField label="Email" type="email" required name="email" />

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

"use client";
import React from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// components
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
} from "../../components";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";

/**
 *
 * This function will create a new user
 */
export default async function Register() {
  // form hook
  const { control, handleSubmit } = useForm();

  const submitRegistration: SubmitHandler<FieldValues> = async (user) => {
    console.log(user);

    const res = await fetch("/user/create", {
      method: "POST",
      body: JSON.stringify({
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
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
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="First Name"
                id="firstname"
                FormHelperTextProps={{ error: true }}
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

          <Controller
            name="middlename"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Middle Name"
                id="middlename"
                helperText={
                  error && <Typography variant="body2">{error.message}</Typography>
                }
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Last Name"
                id="lastname"
                FormHelperTextProps={{ error: true }}
                helperText={
                  error && (
                    <Typography variant="body2">
                      {error.type === "required" && "Please enter your last name"}
                    </Typography>
                  )
                }
              />
            )}
          />
        </Box>

        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Username"
              id="Username"
              FormHelperTextProps={{ error: true }}
              helperText={
                error && (
                  <Typography variant="body2">
                    {error.type === "required" && "Please enter your username"}
                  </Typography>
                )
              }
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email"
              id="email"
              type="email"
              FormHelperTextProps={{ error: true }}
              helperText={
                error && (
                  <Typography variant="body2">
                    {error.type === "required" && "Please enter your email"}
                  </Typography>
                )
              }
            />
          )}
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

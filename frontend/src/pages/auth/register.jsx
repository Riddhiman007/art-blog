import React, { useState } from "react";
import styles from "../../styles/components/forms.module.css";
import { useForm } from "react-hook-form";
import { HiOutlineUser } from "react-icons/hi";
import { FaLock, FaUser } from "react-icons/fa";
import { MdOutlineLock, MdOutlineEmail, MdLock } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
// import fetch from "node-fetch";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data } = useSession();
  console.log(data);
  const submitRegistration = async (fullName, username, password, email) => {
    const res = await fetch(`http://127.0.0.1:8000/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `fullname=${fullName}&username=${username}&email=${email}&password=${password}`,
    });
    const resData = await res.json();
    if (!res.ok) {
      alert("registration failed");
    } else {
      console.log(resData);
      console.log("registered");
      signIn("credSignIn", { username: username, password: password });
    }
  };
  const onSubmit = async (data) => {
    if (data.password === data.confPass) {
      submitRegistration(data.fullname, data.username, data.password, data.email);
      alert(`Registration successful`);
    } else {
      alert("Confirm Password is not equal to your password.");
    }
  };
  return (
    <div className="flex h-fit !min-h-fit flex-col items-center gap-2 bg-gradient-to-br from-blue-700 via-purple-600  to-red-700 px-4 py-4 text-left">
      <header className="my-4 mx-2 flex flex-row text-center">
        <div>
          <h1 className="my-4 text-4xl text-neutral-50 sm:text-5xl">Register Yourself</h1>
        </div>
      </header>
      <main className="container pt-6 pb-6 lg:aspect-video lg:!px-12">
        <div className="rounded-lg bg-zinc-100 py-4 shadow-lg shadow-zinc-600">
          <form className={styles.register} onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-4 flex flex-col">
              {/* Name */}
              <div className={styles.input}>
                {/* Fullname */}
                {/* <label htmlFor="firstName">First name:</label> */}
                <div className={styles.text}>
                  <span>
                    <FaUser className={styles.icon} />
                  </span>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Your Full Name"
                    {...register("fullname", { required: true })}
                  />
                </div>
                {errors.fullname?.type === "required" && (
                  <p role="alert" className={styles.error}>
                    Please enter your full name
                  </p>
                )}
              </div>
              <div className={styles.input}>
                <div className={styles.text}>
                  {/* Nickname */}
                  <span>
                    <HiOutlineUser className={styles.icon} />
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your Nick name"
                    {...register("username", { required: true })}
                  />
                </div>
                {errors.username?.type === "required" && (
                  <p role="alert" className={styles.error}>
                    Please enter your nick name
                  </p>
                )}
              </div>
              <div className={styles.input}>
                <div className={styles.text}>
                  {/* Email */}
                  <span>
                    <MdOutlineEmail className={styles.icon} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.fullname?.type === "required" && (
                  <p role="alert" className={styles.error}>
                    Please enter your full name
                  </p>
                )}
              </div>
              <div className={styles.input}>
                <div className={styles.text}>
                  {/* Password */}
                  <span>
                    <MdLock className={styles.icon} />
                  </span>
                  <input
                    type="password"
                    name="username"
                    id="password"
                    placeholder="Password"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                </div>
                {errors.fullname?.type === "required" && (
                  <p role="alert" className={styles.error}>
                    Please enter your full name
                  </p>
                )}
              </div>
              <div className={styles.input}>
                <div className={styles.text}>
                  {/* Conf Pass */}
                  <span>
                    <MdOutlineLock className={styles.icon} />
                  </span>
                  <input
                    type="password"
                    name="username"
                    id="confirmPassword"
                    placeholder="Repeat your Password"
                    {...register("confPass", { required: true, minLength: 6 })}
                  />
                </div>
                {errors.fullname?.type === "required" && (
                  <p role="alert" className={styles.error}>
                    Please enter your full name
                  </p>
                )}
              </div>
              {/* Submit */}
              <div className={styles.submit}>
                {/* login message */}
                <div className={styles.message}>
                  <Link href="/auth/login">Already have an account? Then log in...</Link>
                </div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

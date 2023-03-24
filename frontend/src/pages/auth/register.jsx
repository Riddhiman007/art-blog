import React, { useState } from "react";
import styles from "../../styles/components/forms.module.css";
import { useForm } from "react-hook-form";
import { HiOutlineUser } from "react-icons/hi";
import { FaLock, FaUser } from "react-icons/fa";
import { MdOutlineLock, MdOutlineEmail, MdLock } from "react-icons/md";
import { signIn } from "next-auth/react";
// import fetch from "node-fetch";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitRegistration = async (fullName, nickName, password) => {
    const res = await fetch(
      `http://localhost:8000/user/register?FullName=${fullName}&username=${nickName}&email=ers@gmail.com&slug=sdfaf&password=${password}`,
      { method: "POST", headers: { "Content-Type": "application/json" } }
    );
    const resData = await res.json();
    if (!res.ok) {
      alert("registration failed");
    } else {
      console.log(resData);
      console.log("registered");
      signIn("credSignIn", { username: nickName, password: password });
    }
  };
  const onSubmit = async (data) => {
    if (data.password === data.confPass) {
      submitRegistration(data.fullname, data.nickname, data.password);
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
      <main className="container">
        <div className="rounded-lg bg-slate-50 py-4 shadow-lg">
          <form className={styles.register} onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-4 flex flex-col">
              {/* Name */}
              <div className={styles.text}>
                {/* Fullname */}
                {/* <label htmlFor="firstName">First name:</label> */}
                <span>
                  <FaUser className={styles.icon} />
                </span>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Your Full Name"
                  {...register("fullname", { required: true })}
                />
              </div>

              <div className={styles.text}>
                {/* Nickname */}
                <span>
                  <HiOutlineUser className={styles.icon} />
                </span>
                <input
                  type="text"
                  name="username"
                  id="nickName"
                  placeholder="Your Nick name"
                  {...register("nickname", { required: true })}
                />
              </div>
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
                  {...register("confPass")}
                />
              </div>
              <div className={styles.submit}>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

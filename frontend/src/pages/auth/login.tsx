import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import styles from "../../styles/components/forms.module.css";
interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function LoginPage({ searchParams }: IProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange" });
  // const { data: session, status } = useSession();
  // console.log(session.user);

  const onSubmit = async (data) => {
    // const result = await signIn("credentials", {
    //   username: userName.current,
    //   password: pass.current,
    //   redirect: true,
    //   callbackUrl: "/",
    // });
    signIn("credSignIn", { username: data.username, password: data.password });
  };
  return (
    <Suspense fallback={<Loading />}>
      <div
        className={
          "flex h-screen flex-row items-center gap-1 bg-gradient-to-br from-cyan-300 to-sky-600"
        }
      >
        <div className="mx-auto flex flex-col items-center">
          {searchParams?.message && (
            <p className="rounded-md bg-red-100 py-2 px-5 text-red-700">
              {searchParams?.message}
            </p>
          )}
          {/* <form className="flex flex-col gap-2 rounded-md bg-zinc-100 px-8 py-6 shadow" onSubmit={handleSubmit(onSubmit)}> */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
            <div className={styles.input}>
              <div className={styles.text}>
                <span>
                  <FaUser className={styles.icon} />
                </span>
                <input
                  placeholder="User Name"
                  name="username"
                  type="text"
                  {...register("username", { required: true })}
                />
              </div>
            </div>
            <div className={styles.input}>
              <div className={styles.text}>
                <span>
                  <MdLock className={styles.icon} />
                </span>
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            {/* submit */}
            <div className={styles.submit}>
              <div className={styles.message}>
                <Link href="/auth/register">Don't have an account? Create one...</Link>
              </div>
              <button type="submit" onClick={onSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}

function Loading(): JSX.Element {
  return (
    <div className="flex h-screen flex-row items-center gap-1 bg-gradient-to-br from-cyan-300 to-sky-600">
      <div className="mx-10 flex w-[25rem] flex-col justify-center rounded-md bg-zinc-100 p-6 shadow-lg shadow-sky-600">
        <div className="mb-4">
          <div className="w-full animate-pulse rounded-md bg-zinc-800 py-4"></div>
        </div>
        <div className="mb-4">
          <div className="w-full animate-pulse rounded-md bg-zinc-800 py-4"></div>
        </div>
      </div>
    </div>
  );
}

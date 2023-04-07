import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { useForm } from 'react-hook-form';
import {FaUser} from 'react-icons/fa';
import {MdLock} from 'react-icons/md';
import styles from '../../styles/components/forms.module.css';
interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const {handleSubmit, register, formState:{errors}} = useForm({reValidateMode:"onChange"})
  const { data: session, status } = useSession();
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
    <div
      className={
        "flex h-screen flex-col  justify-center gap-1 bg-gradient-to-br from-cyan-300 to-sky-600"
      }
    >
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
              {...register("username", {required: true})}
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
              {...register("password", {required: true})}
              />
          </div>
        </div>
{/* submit */}
        <div className={styles.submit}>
          <div className={styles.message}>
            <Link href="/auth/register">
              Don't have an account? Create one...
            </Link>
          </div>
        <button type="submit" onClick={onSubmit}>
          Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

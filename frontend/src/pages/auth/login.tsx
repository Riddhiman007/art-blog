import { signIn, useSession } from "next-auth/react";
import { useRef } from "react";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const userName = useRef("");
  const pass = useRef("");
  const { data: session, status } = useSession();
  // console.log(session.user);

  const onSubmit = async () => {
    // const result = await signIn("credentials", {
    //   username: userName.current,
    //   password: pass.current,
    //   redirect: true,
    //   callbackUrl: "/",
    // });
    signIn("credSignIn", { username: userName.current, password: pass.current });
    alert(session.user.email);
  };
  return (
    <div
      className={
        "flex h-screen flex-col items-center  justify-center gap-1 bg-gradient-to-br from-cyan-300 to-sky-600"
      }
    >
      {searchParams?.message && (
        <p className="rounded-md bg-red-100 py-2 px-5 text-red-700">
          {searchParams?.message}
        </p>
      )}
      <div className="flex flex-col gap-2 rounded-md bg-white px-7 py-4 shadow">
        <input
          placeholder="User Name"
          name="name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <input
          placeholder="Password"
          name="password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <button type="submit" onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

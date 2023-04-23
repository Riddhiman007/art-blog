import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  pages: { signIn: "/auth/login" },
  providers: [
    Credentials({
      id: "credSignIn",
      name: "credentials",
      credentials: {
        username: { type: "string", placeholder: "Nick Name", label: "Your Nickname" },
        password: { type: "string", placeholder: "******", label: "Your password" },
      },
      async authorize(credentials, req) {
        const formData = new FormData();
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);
        const res = await fetch(process.env.BACKEND_URL + "/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=&username=${credentials.username}&password=${credentials.password}&scope=&client_id=&client_secret=`,
        });
        const data = res.json();
        if (res.ok) {
          console.log(data);
          return data;
        }
        console.log(res.statusText);
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(token);
      try {
        //@ts-ignore
        if (Date.now() > Date.parse(token.expire_time)) {
          //@ts-ignore
          const res = await fetch(`${process.env.BACKEND_URL}/user/login/refresh`, {
            method: "POST",
            headers: {
              //"Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token.refresh_token}`,
            },
          });
          const data = await res.json();
          token = data;
        }
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token; //@ts-ignore
      //@ts-ignore
      session.error = token.error;

      console.log(session);
      return session;
    },
  },
});

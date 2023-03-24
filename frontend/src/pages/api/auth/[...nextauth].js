import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      id: "credSignIn",
      name: "credentials",
      credentials: {
        username: { type: "text", placeholder: "Nick Name", label: "Your Nickname" },
        password: { type: "text", placeholder: "******", label: "Your password" },
      },
      async authorize(credentials, req) {

        const res = await fetch("http://127.0.0.1:8000/user/login/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "grant_type=&username=" + credentials.username + "&password=" + credentials.password + "&scope=&client_id=&client_secret="
        });
        const user = await res.json();

        if (res.ok) {
          console.log(user);
          const me = await fetch("http://127.0.0.1:8000/user/login/me", { method: "GET", headers: { Authorization: "Bearer " + user.access_token } })
          const data = await me.json()
          console.log(data);
          return data;
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token;
      console.log(session);
      // const res = await fetch("http://127.0.0.1:8000/user/login/me", { method: "GET", headers: { Authorization: "Bearer " + token.accessToken } })
      // user = await res.json()
      // if (res.ok) {
      //   console.log(user);
      //   session.user = user;
      //   return session
      // }
      // return null;
      return session;
    }

  },
  debug: true
});

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
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
                formData.append('username', credentials.username)
                formData.append('password', credentials.password)
                const res = await fetch("http://127.0.0.1:8000/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `grant_type=&username=${credentials.username}&password=${credentials.password}&scope=&client_id=&client_secret=`
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
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token
            console.log(session);
            return session;
        }
    }
});

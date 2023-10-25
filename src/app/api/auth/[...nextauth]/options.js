import CredentialProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          // const res = await fetch("https://650c816247af3fd22f67b58e.mockapi.io/Account");
          const res = [
            { username: "admin", password: "admin", email: "intanmn@gmail.com", name: "Intan Meilanie Nugraha", image: "/assets/user.png" },
          ];
          const user = res.find((item) => item.username === username && item.password === password);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
};

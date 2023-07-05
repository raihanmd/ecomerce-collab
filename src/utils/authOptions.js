import { fetchPOST } from "@/useFetch/fetchPOST";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import slugify from "slugify";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      const { statusCode } = await fetchPOST("/api/login", { userOAuthId: user.user.id, userEmail: user.user.email, userProvider: user.account.provider }, { component: "server" });
      if (statusCode !== 200) {
        const createUserResponse = await fetchPOST(
          "/api/register",
          {
            userOAuthId: user.user.id,
            userName: slugify(user.user.name, { lower: true }),
            userEmail: user.user.email,
            userImage: user.user.image,
            userProvider: user.account.provider,
          },
          { component: "server" }
        );
        if (createUserResponse.statusCode !== 201) return false;
      }
      return true;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "https://firebasestorage.googleapis.com/v0/b/ecomerce-bc524.appspot.com/o/logo%2Flynxshop.webp?alt=media&token=6e522069-86f6-49dc-853e-3f0dc0d879c4",
  },
};

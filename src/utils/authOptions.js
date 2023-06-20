import { fetchPOST } from "@/useFetch/fetchPOST";
import GoogleProvider from "next-auth/providers/google";
import slugify from "slugify";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { statusCode } = await fetchPOST("/api/login", { userGoogleId: user.user.id, userEmail: user.user.email });
      if (statusCode !== 200) {
        const createUserResponse = await fetchPOST("/api/register", { userGoogleId: user.user.id, userName: slugify(user.user.name, { lower: true }), userEmail: user.user.email });

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

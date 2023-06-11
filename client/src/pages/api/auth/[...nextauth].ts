import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import VkProvider from 'next-auth/providers/vk';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        VkProvider({
            clientId: process.env.VK_CLIENT_ID!,
            clientSecret: process.env.VK_CLIENT_SECRET!,
        }),
    ],
    session: {
            strategy: "jwt",    
    },
    secret: process.env.JWT_SECRET,

    callbacks: {
        jwt: async ({ token }) => {
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token;
            return session;
        },
        async signIn() {
            return true;
        },
    },
});

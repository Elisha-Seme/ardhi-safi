import type { NextAuthConfig } from "next-auth";

export default {
    providers: [],
    trustHost: true,
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");
            const isAdminApiRoute = nextUrl.pathname.startsWith("/api/admin");
            const isLoginPage = nextUrl.pathname === "/admin/login";

            if (isAdminApiRoute && !isLoggedIn) {
                return false;
            }

            if (isAdminRoute) {
                if (isLoggedIn && isLoginPage) {
                    return Response.redirect(new URL("/admin/dashboard", nextUrl));
                }
                if (!isLoggedIn && !isLoginPage) {
                    return false; // redirects to signIn page
                }
            }

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;

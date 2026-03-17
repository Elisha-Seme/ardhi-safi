import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
    const isAdminRoute = nextUrl.pathname.startsWith("/admin")
    const isAdminApiRoute = nextUrl.pathname.startsWith("/api/admin")
    const isLoginPage = nextUrl.pathname === "/admin/login"

    if (isApiAuthRoute) return NextResponse.next()

    if (isAdminApiRoute && !isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (isAdminRoute) {
        if (isLoggedIn && isLoginPage) {
            return NextResponse.redirect(new URL("/admin/dashboard", nextUrl))
        }
        if (!isLoggedIn && !isLoginPage) {
            return NextResponse.redirect(new URL("/admin/login", nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*", "/api/auth/:path*", "/api/admin/:path*"],
}

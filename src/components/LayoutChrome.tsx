"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <SplashScreen />
            <Navbar />
            <main id="main-content" className="min-h-screen">
                {children}
            </main>
            <Footer />
            <CookieConsent />
            <BackToTop />
        </>
    );
}

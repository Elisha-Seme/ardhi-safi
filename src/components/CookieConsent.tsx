"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const consent = localStorage.getItem("cookie-consent");
            if (!consent) setIsVisible(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-primary/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 text-sm text-white/70">
                            <p>
                                Our website uses cookies to give you the best and most relevant experience. By clicking on accept, you give your consent to the use of cookies as per our{" "}
                                <Link href="/privacy" className="text-accent hover:underline">
                                    privacy policy
                                </Link>.
                            </p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                            <button
                                onClick={handleDecline}
                                className="px-5 py-2.5 text-sm text-white/60 hover:text-white border border-white/20 rounded-full transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2.5 text-sm bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-colors"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

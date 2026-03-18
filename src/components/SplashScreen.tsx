"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const seen = sessionStorage.getItem("splash_seen");
        if (seen) return;

        setIsVisible(true);
        sessionStorage.setItem("splash_seen", "1");
        const timer = setTimeout(() => setIsVisible(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="splash-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center gap-8">
                        {/* Video Spinner */}
                        <motion.div
                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl shadow-accent/20 border-4 border-accent"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/videos/spinner.webm" type="video/webm" />
                                <source src="/videos/spinner.mp4" type="video/mp4" />
                            </video>
                        </motion.div>

                        {/* Brand name */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-heading text-white tracking-wider">
                                ARDHI <span className="text-accent">SAFI</span>
                            </h1>
                            <p className="text-white/60 text-sm mt-2 tracking-widest uppercase">
                                Shelter for all
                            </p>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                className="h-full bg-accent rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

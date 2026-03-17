"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Star, Quote, Users, Building2, TrendingUp } from "lucide-react";

interface Testimonial {
    name: string;
    location: string;
    quote: string;
}

interface SalesLettingClientProps {
    testimonials: Testimonial[];
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const whatWeDo = [
    "Promote properties through targeted marketing channels and our client database to achieve maximum visibility and faster results.",
    "Manage the preparation of sale and letting agreements and advise on legal requirements when necessary.",
    "Handle the full sales and letting process from marketing to completion.",
    "Provide expert advice on properties available for sale or purchase and assist clients in making informed decisions.",
    "Source suitable built and vacant properties aligned with client needs and investment goals.",
    "Sell and dispose of properties efficiently while maximizing value.",
    "Secure reliable and suitable tenants to minimize vacancy periods.",
];

const clientSegments = [
    {
        icon: TrendingUp,
        title: "For Real Estate Investors",
        desc: "We provide strategic sales and letting services focused on maximizing returns, reducing vacancy periods, and supporting informed investment decisions through market-driven advice and efficient execution.",
    },
    {
        icon: Users,
        title: "For Homebuyers & Individual Clients",
        desc: "We guide you through the process of buying, selling, or renting property with clarity, professionalism, and personalized support from start to finish.",
    },
    {
        icon: Building2,
        title: "For Commercial & Corporate Clients",
        desc: "We deliver structured and compliant sales and letting solutions aligned with corporate objectives, timelines, and regulatory requirements.",
    },
];

export default function SalesLettingClient({ testimonials }: SalesLettingClientProps) {
    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-primary text-white">
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(184,155,94,0.3) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                </div>
                <div className="section-container relative z-10">
                    <Link href="/capabilities" className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors mb-8 text-sm">
                        <ArrowLeft size={16} /> Back to Capabilities
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">Estate Agency</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            Property Sales <span className="gradient-text">& Letting</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl">
                            We help our clients buy, sell, and lease property with confidence. Our Property Sales & Letting services deliver speed, value, and peace of mind by combining strategic marketing, market insight, and professional transaction management.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading text-primary">What We Do</h2>
                    </motion.div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {whatWeDo.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm"
                            >
                                <CheckCircle size={20} className="text-accent mt-0.5 shrink-0" />
                                <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Segments */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clientSegments.map((seg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-surface rounded-2xl p-8 text-center"
                            >
                                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <seg.icon size={24} className="text-accent" />
                                </div>
                                <h3 className="font-heading text-lg text-primary mb-3">{seg.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{seg.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="py-24 bg-surface">
                    <div className="section-container">
                        <motion.div {...fadeInUp} className="text-center mb-12">
                            <h2 className="text-3xl font-heading text-primary">Client Testimonials</h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {testimonials.map((t, i) => (
                                <motion.div key={i} {...fadeInUp} className="bg-white rounded-2xl p-8">
                                    <Quote size={20} className="text-accent/30 mb-4" />
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} size={12} className="fill-accent text-accent" />
                                        ))}
                                    </div>
                                    <p className="text-text-secondary text-sm italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                                    <p className="font-heading text-primary text-sm">{t.name}</p>
                                    <p className="text-text-secondary text-xs">{t.location}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 bg-primary text-white text-center">
                <div className="section-container">
                    <p className="text-white/70 italic text-lg max-w-2xl mx-auto mb-6">
                        &ldquo;We combine local market expertise with professional standards to deliver trusted real estate solutions across residential, commercial, and investment properties.&rdquo;
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm">
                        Contact Us <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

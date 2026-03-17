"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, Quote, Search, BarChart3, Fuel, PieChart } from "lucide-react";

interface Testimonial {
    name: string;
    location: string;
    quote: string;
}

interface PropertyInvestmentClientProps {
    testimonials: Testimonial[];
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const services = [
    { icon: Search, title: "Acquisitions", desc: "Identifying and securing the right investment opportunities by aligning market intelligence with client objectives." },
    { icon: BarChart3, title: "Disposals", desc: "Advising on timing, value, and strategy to ensure assets are positioned and marketed effectively for maximum returns." },
    { icon: Fuel, title: "Development Funding", desc: "Supporting development projects of varying scale by structuring funding solutions that ensure project viability and successful delivery." },
    { icon: PieChart, title: "Portfolio Analysis", desc: "Advising on portfolio composition to balance risk, enhance performance, and maximize overall returns." },
];

export default function PropertyInvestmentClient({ testimonials }: PropertyInvestmentClientProps) {
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
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">Advisory Services</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            Property <span className="gradient-text">Investment</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl">
                            We provide strategic property investment advisory services designed to unlock value and drive long-term returns. With over a decade of combined experience in residential and commercial real estate.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading text-primary">Our Investment Services</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {services.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                                    <s.icon size={26} className="text-accent" />
                                </div>
                                <h3 className="font-heading text-xl text-primary mb-3">{s.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Segments */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "For Institutional & Corporate Investors", desc: "We provide structured investment advice supported by market intelligence, financial analysis, and disciplined execution." },
                            { title: "For Developers", desc: "We advise on funding structures, project feasibility, and delivery strategies to support successful development outcomes." },
                            { title: "For Private Investors", desc: "We help investors identify opportunities, manage risk, and grow their property portfolios with confidence." },
                        ].map((seg, i) => (
                            <motion.div key={i} {...fadeInUp} className="bg-surface rounded-2xl p-8 border-t-4 border-accent">
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
                            <h2 className="text-3xl font-heading text-primary">What Our Investors Say</h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                        &ldquo;Strategic advice. Market insight. Results-driven execution.&rdquo;
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm">
                        Contact Us <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

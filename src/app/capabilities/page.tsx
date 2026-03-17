"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Home, TrendingUp } from "lucide-react";

const services = [
    {
        icon: Home,
        title: "Property Sales & Letting",
        subtitle: "Estate Agency",
        desc: "We help our clients buy, sell, and lease property with confidence. Strategic marketing, market insight, and professional transaction management.",
        href: "/capabilities/sales-letting",
        color: "from-blue-500/20 to-primary/10",
    },
    {
        icon: Building2,
        title: "Property Management",
        subtitle: "Full-Service Management",
        desc: "We manage properties with transparency, precision, and care — protecting both your asset and your peace of mind.",
        href: "/capabilities/property-management",
        color: "from-emerald-500/20 to-primary/10",
    },
    {
        icon: TrendingUp,
        title: "Property Investment",
        subtitle: "Advisory Services",
        desc: "Strategic property investment advisory services designed to unlock value and drive long-term returns.",
        href: "/capabilities/property-investment",
        color: "from-accent/20 to-primary/10",
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function CapabilitiesPage() {
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
                <div className="section-container relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">What We Offer</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            Our <span className="gradient-text">Capabilities</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl mx-auto">
                            We offer a wide range of real estate related services designed to deliver value at every stage of the property lifecycle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <div className="space-y-12">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <Link href={service.href} className="group block">
                                    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                                        <div className="grid grid-cols-1 lg:grid-cols-3">
                                            <div className={`bg-gradient-to-br ${service.color} p-12 flex items-center justify-center`}>
                                                <service.icon size={80} className="text-primary/30 group-hover:text-accent/40 transition-colors" />
                                            </div>
                                            <div className="lg:col-span-2 p-12 flex flex-col justify-center">
                                                <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2 font-medium">{service.subtitle}</p>
                                                <h2 className="text-2xl md:text-3xl font-heading text-primary mb-4 group-hover:text-accent transition-colors">
                                                    {service.title}
                                                </h2>
                                                <p className="text-text-secondary leading-relaxed mb-6">{service.desc}</p>
                                                <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                                                    Learn More <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="section-container">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-3xl md:text-4xl font-heading mb-6">
                            We combine local market expertise with professional standards
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto mb-8">
                            Delivering trusted real estate solutions across residential, commercial, and investment properties.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm"
                        >
                            Get In Touch <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

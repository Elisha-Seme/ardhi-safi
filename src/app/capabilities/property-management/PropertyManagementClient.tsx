"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Star, Quote, ShieldCheck, Clock, Scale, Wrench, FileText, CreditCard, HeartPulse } from "lucide-react";

interface Testimonial {
    name: string;
    location: string;
    quote: string;
}

interface PropertyManagementClientProps {
    testimonials: Testimonial[];
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const services = [
    { icon: CreditCard, title: "Rent Collection", desc: "Efficient rent collection and credit control to maintain steady cash flow and fast remittance of funds." },
    { icon: FileText, title: "Service Charge Management", desc: "Accurate budgeting, administration, and reconciliation of service charges in line with regulatory requirements." },
    { icon: Wrench, title: "Facilities Management", desc: "Proactive coordination of cleaning, landscaping, M&E systems, and general maintenance using vetted local contractors." },
    { icon: ShieldCheck, title: "Health, Safety & Risk Management", desc: "Continuous compliance monitoring to protect occupants and reduce operational risk." },
    { icon: CheckCircle, title: "Due Diligence", desc: "Expert support for acquisitions, audits, and property performance reviews." },
    { icon: Scale, title: "Legal Protection", desc: "Professionally drafted leases, free lease-related legal consultations, and legally guided decision-making." },
    { icon: HeartPulse, title: "24/7 Emergency Response", desc: "A dedicated emergency hotline for tenants, with immediate response and rapid dispatch of pre-approved service providers." },
];

export default function PropertyManagementClient({ testimonials }: PropertyManagementClientProps) {
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
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">Full-Service Management</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            Property <span className="gradient-text">Management</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl">
                            We manage properties with transparency, precision, and care — protecting both your asset and your peace of mind. Powered by <strong className="text-accent">IshiSalama Africa</strong>, our advanced property management accounting system.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading text-primary">Our Management Services</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <s.icon size={22} className="text-accent" />
                                </div>
                                <h3 className="font-heading text-primary mb-2">{s.title}</h3>
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
                            { title: "For Property Owners & Investors", desc: "We protect your investment through disciplined financial management, reliable tenant services, and proactive maintenance strategies." },
                            { title: "For Commercial & Mixed-Use Developments", desc: "We deliver structured facilities, service charge, and compliance management aligned with operational and regulatory requirements." },
                            { title: "For Residential Developments", desc: "We ensure smooth day-to-day operations, tenant satisfaction, and well-maintained living environments." },
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
                            <h2 className="text-3xl font-heading text-primary">Client Testimonials</h2>
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
                        &ldquo;Legal compliance, rapid response, and full transparency — built into every property we manage.&rdquo;
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm">
                        Contact Us <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

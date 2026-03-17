"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Building2 } from "lucide-react";
import { kenyanCounties } from "@/data/counties";
import { submitLead } from "./actions";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const departments = [
    { label: "Customer Service", email: "care@ardhisafi.co.ke", icon: Mail },
    { label: "Buying Inquiries", email: "buy@ardhisafi.co.ke", icon: Building2 },
    { label: "Selling Inquiries", email: "sell@ardhisafi.co.ke", icon: Building2 },
    { label: "Property Management", email: "pmgt@ardhisafi.co.ke", icon: Building2 },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "", jobTitle: "", company: "", nationality: "", country: "",
        county: "", gender: "", email: "", mobile: "", countryCode: "+254", message: "",
        consent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formDataObj = new FormData(e.currentTarget);
            const res = await submitLead(formDataObj);
            if (res.success) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Failed to submit lead:", error);
            alert("Sorry, an error occurred while sending your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
        setFormData({ ...formData, [target.name]: value });
    };

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
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">Reach Out</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            Get In <span className="gradient-text">Touch</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Whether you&apos;re looking to buy, sell, rent or invest — we&apos;re here to help.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form + Info */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <motion.div {...fadeInUp}>
                                <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
                                    {submitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <Send size={28} className="text-emerald-600" />
                                            </div>
                                            <h3 className="font-heading text-2xl text-primary mb-3">Message Sent!</h3>
                                            <p className="text-text-secondary">Thank you for reaching out. Our team will get back to you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <h2 className="font-heading text-2xl text-primary mb-6">Send Us a Message</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Name *</label>
                                                    <input
                                                        type="text" name="name" required value={formData.name} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Job Title</label>
                                                    <input
                                                        type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="Your job title"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Company</label>
                                                    <input
                                                        type="text" name="company" value={formData.company} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="Company name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Nationality</label>
                                                    <input
                                                        type="text" name="nationality" value={formData.nationality} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="Your nationality"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Country/Region</label>
                                                    <input
                                                        type="text" name="country" value={formData.country} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="Country or region"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">County</label>
                                                    <select
                                                        name="county" value={formData.county} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm appearance-none"
                                                    >
                                                        <option value="">Select County</option>
                                                        {kenyanCounties.map((c) => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Gender</label>
                                                    <select
                                                        name="gender" value={formData.gender} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm appearance-none"
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Prefer not to say</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
                                                    <input
                                                        type="email" name="email" required value={formData.email} onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                            </div>

                                            {/* Mobile with country code */}
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-2">Mobile</label>
                                                <div className="flex gap-2">
                                                    <select
                                                        name="countryCode" value={formData.countryCode} onChange={handleChange}
                                                        className="w-24 px-3 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none text-sm appearance-none"
                                                    >
                                                        <option value="+254">+254</option>
                                                        <option value="+1">+1</option>
                                                        <option value="+44">+44</option>
                                                        <option value="+971">+971</option>
                                                        <option value="+91">+91</option>
                                                        <option value="+86">+86</option>
                                                        <option value="+255">+255</option>
                                                        <option value="+256">+256</option>
                                                    </select>
                                                    <input
                                                        type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
                                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                                                        placeholder="780 999 100"
                                                    />
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-2">Message *</label>
                                                <textarea
                                                    name="message" required rows={5} value={formData.message} onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm resize-none"
                                                    placeholder="Tell us how we can help..."
                                                />
                                            </div>

                                            {/* Consent */}
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox" name="consent" checked={formData.consent} onChange={handleChange}
                                                    className="mt-1 w-4 h-4 accent-accent"
                                                    required
                                                />
                                                <p className="text-xs text-text-secondary">
                                                    By submitting, I agree to Ardhi Safi handling of data. For further information, please read our{" "}
                                                    <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.*
                                                </p>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full md:w-auto px-8 py-3.5 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {isSubmitting ? "Sending..." : <><Send size={16} /> Send Message</>}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="space-y-8">
                            <motion.div {...fadeInUp} className="bg-white rounded-2xl shadow-md p-8">
                                <h3 className="font-heading text-xl text-primary mb-6">Contact Our Experts</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone size={18} className="text-accent mt-1 shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-primary">Phone</p>
                                            <a href="tel:+254780999100" className="text-sm text-text-secondary hover:text-accent transition-colors block">+254 780 999 100</a>
                                            <a href="tel:+254725403001" className="text-sm text-text-secondary hover:text-accent transition-colors block">+254 725 403 001</a>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-sm font-medium text-primary mb-3">Department Emails</p>
                                        {departments.map((dept) => (
                                            <div key={dept.email} className="mb-3">
                                                <p className="text-xs text-text-secondary">{dept.label}</p>
                                                <a href={`mailto:${dept.email}`} className="text-sm text-accent hover:underline">{dept.email}</a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div {...fadeInUp} className="bg-white rounded-2xl shadow-md p-8">
                                <h3 className="font-heading text-xl text-primary mb-4">Location</h3>
                                <div className="flex items-start gap-3 mb-4">
                                    <MapPin size={18} className="text-accent mt-1 shrink-0" />
                                    <p className="text-sm text-text-secondary">
                                        B2-06, Manga House,<br />
                                        Kiambere Road, Upper Hill,<br />
                                        Nairobi, Kenya
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map */}
            <section className="h-96 bg-gray-200 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818!2d36.817!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScwMS4yIkU!5e0!3m2!1sen!2ske!4v1600000000000!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ardhi Safi Location - Upper Hill, Nairobi"
                />
            </section>
        </div>
    );
}

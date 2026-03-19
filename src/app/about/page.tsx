
import Link from "next/link";
import Image from "next/image";
import {
    Shield,
    Award,
    Heart,
    CheckCircle,
    Zap,
    TrendingUp,
    Eye,
    Handshake,
    ArrowRight,
    Target,
    Globe,
    HeadphonesIcon,
    MonitorSmartphone,
} from "lucide-react";
import prisma from "@/lib/prisma";
import AboutTeamGrid from "./AboutTeamGrid";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "About Us | Ardhi Safi Limited",
    description: "Learn about Ardhi Safi Limited, our history, mission, and the professional team driving real estate excellence in Kenya.",
};

const values = [
    { icon: Shield, title: "Integrity & Transparency", desc: "We conduct all our services openly and ethically, ensuring our clients have clear visibility over processes, finances, and decisions." },
    { icon: Award, title: "Professional Excellence", desc: "We apply industry best practices, legal compliance, and sound market knowledge in every assignment we undertake." },
    { icon: Heart, title: "Client-Centric Approach", desc: "We listen carefully to our clients' needs and tailor solutions that align with their goals, timelines, and risk profiles." },
    { icon: CheckCircle, title: "Accountability", desc: "We take responsibility for our actions, decisions, and results, delivering services we can confidently stand behind." },
    { icon: Zap, title: "Efficiency & Value", desc: "We focus on practical, cost-effective solutions that deliver sustainable returns and operational efficiency." },
];

const whyChooseUs = [
    { icon: Heart, title: "Bespoke Care", desc: "Fully tailored, customized solutions designed to deliver the best possible outcomes for each client." },
    { icon: TrendingUp, title: "Vast Experience", desc: "Over a decade of industry experience with a portfolio exceeding USD 35 million in assets under management." },
    { icon: Handshake, title: "End-to-End Solutions", desc: "From acquisition and development advice to management and disposal — seamless, integrated service under one roof." },
    { icon: Target, title: "Market Insight & Local Expertise", desc: "Our Nairobi base and regional exposure give us deep understanding of Kenyan and East African property markets." },
    { icon: Eye, title: "Transparency & Compliance", desc: "Clear reporting, legally compliant processes, and accountable decision-making are central to everything we do." },
    { icon: MonitorSmartphone, title: "Technology-Driven Management", desc: "Our advanced property management system ensures accurate financial reporting and real-time oversight." },
    { icon: HeadphonesIcon, title: "Responsive & Reliable", desc: "Dedicated teams and 24/7 emergency support — we respond quickly and act decisively to protect client assets." },
];

const clientCategories = [
    "Property Owners & Landlords",
    "Real Estate Investors",
    "Developers",
    "Corporate & Institutional Clients",
    "Residential & Commercial Occupiers/Tenants",
];

export default async function AboutPage() {
    const teamMembers = await prisma.teamMember.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
        select: {
            id: true,
            name: true,
            title: true,
            imageUrl: true,
            linkedin: true,
            email: true,
            // Map ID to slug for routing compatibility
        }
    });

    const formattedTeam = teamMembers.map(member => ({
        ...member,
        slug: member.id
    }));

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
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">About Ardhi Safi</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            Who We <span className="gradient-text">Are</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl mx-auto">
                            A professional real estate services firm committed to transparency, legitimacy, and trust in every property transaction.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Established 2014</p>
                            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-6">
                                Ardhi Safi Limited
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                <strong>Ardhi Safi Limited</strong> is a professional real estate services firm established in <strong>2014</strong> and <strong>registered and licensed by the Estate Agents Regulatory Board (EARB)</strong>. We provide integrated real estate solutions across <strong>property sales and letting, property management, and property investment advisory</strong>.
                            </p>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                Based in <strong>Upper Hill, Nairobi</strong>, we operate nationally while maintaining in-depth knowledge of the Kenyan and wider East African real estate market. We combine strong market insight, transparent systems, and disciplined execution to deliver reliable and compliant outcomes for <strong>property owners, investors, developers, and occupiers</strong>.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                From asset management and regulatory compliance to advisory on acquisitions, disposals, and investment strategy, we offer end-to-end real estate services tailored to our clients&apos; objectives. Our work is guided by professionalism, accountability, and a commitment to long-term value creation.
                            </p>
                        </div>
                        <div className="relative animate-in zoom-in-95 duration-700 fill-mode-both">
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 flex items-center justify-center aspect-square">
                                <div className="text-center">
                                    <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-6 logo-glow">
                                        <Image src="/images/brand/icon-light.jpeg" alt="Ardhi Safi" width={160} height={160} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="font-heading text-3xl text-primary">ARDHI SAFI</p>
                                    <p className="text-accent text-sm tracking-[0.3em] uppercase mt-2">Shelter for all</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Our Journey</p>
                            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-8">Our Story</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Ardhi Safi Limited was born out of a clear need within the real estate market—addressing the widespread challenges caused by undocumented properties and fraudulent transactions that have resulted in many individuals losing their hard-earned investments.
                            </p>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Beyond our belief that every African deserves a place to call their own, this reality became the driving force behind our formation. Our name, <strong className="text-primary">Ardhi Safi</strong>, a Swahili term meaning <em>&ldquo;Shelter for all,&rdquo;</em> reflects our commitment to transparency, legitimacy, and trust in every property transaction we handle.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                Today, we are dedicated to ensuring that all properties acquired through our services are supported by proper legal titles and complete documentation, giving our clients the confidence, security, and peace of mind they deserve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission, Motto */}
            <section className="py-24 bg-primary text-white">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-10 text-center animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: '100ms' }}>
                            <Globe size={32} className="text-accent mx-auto mb-4" />
                            <h3 className="font-heading text-2xl mb-4 text-accent">Our Vision</h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                To be Africa&apos;s most trusted and respected real estate company, recognized for innovation, effectiveness, and a commitment to redefining real estate practices.
                            </p>
                        </div>
                        <div className="glass-card p-10 text-center animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: '200ms' }}>
                            <Target size={32} className="text-accent mx-auto mb-4" />
                            <h3 className="font-heading text-2xl mb-4 text-accent">Our Mission</h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                Inspired by our name, <em>Ardhi Safi</em>—meaning &ldquo;shelter for all&rdquo;—our mission is to enable Africans to access property they can confidently call their own, supported by clear legal titles and proper documentation.
                            </p>
                        </div>
                        <div className="glass-card p-10 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: '300ms' }}>
                            <h3 className="font-heading text-2xl mb-4 text-accent">Our Motto</h3>
                            <p className="text-3xl font-heading italic text-white/90">&ldquo;Shelter for all&rdquo;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">What Guides Us</p>
                        <h2 className="text-3xl md:text-5xl font-heading text-primary">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <v.icon size={22} className="text-accent" />
                                </div>
                                <h3 className="font-heading text-lg text-primary mb-3">{v.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team (DYNAMIC) */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Meet the Team</p>
                        <h2 className="text-3xl md:text-5xl font-heading text-primary">Our Team</h2>
                    </div>

                    <AboutTeamGrid team={formattedTeam} />

                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Our Advantage</p>
                        <h2 className="text-3xl md:text-5xl font-heading text-primary">Why Choose Us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group border-l-4 border-accent animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                        <item.icon size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-primary mb-2">{item.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach & Who We Work With */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">How We Work</p>
                            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-6">Our Approach</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We believe that successful real estate outcomes are built on <strong>listening, analysis, and disciplined execution</strong>.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                We take time to understand our clients&apos; objectives, assess market conditions, and implement practical solutions that deliver value. Whether managing a single property or advising on a complex investment portfolio, we apply the same level of professionalism, care, and attention to detail.
                            </p>
                        </div>
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both" style={{ animationDelay: '200ms' }}>
                            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Our Clients</p>
                            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-6">Who We Work With</h2>
                            <ul className="space-y-4">
                                {clientCategories.map((cat, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                            <CheckCircle size={16} className="text-accent" />
                                        </div>
                                        <span className="text-text-secondary">{cat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment CTA */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="section-container">
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
                        <h2 className="text-3xl md:text-4xl font-heading mb-6">Our Commitment</h2>
                        <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                            We are committed to safeguarding our clients&apos; interests, enhancing property value, and delivering results through transparent processes, professional standards, and long-term partnerships.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm hover:shadow-lg hover:shadow-accent/30"
                        >
                            Get In Touch
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

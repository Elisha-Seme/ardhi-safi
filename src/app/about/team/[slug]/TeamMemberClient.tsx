"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail, Users } from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
    linkedin: string | null;
    email: string | null;
    order: number;
    active: boolean;
}

interface TeamMemberClientProps {
    member: TeamMember;
}

export default function TeamMemberClient({ member }: TeamMemberClientProps) {
    return (
        <div className="overflow-hidden">
            <section className="relative pt-32 pb-20 bg-primary text-white min-h-[80vh] flex items-center">
                <div className="section-container relative z-10 w-full">
                    <Link href="/about" className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors mb-8 text-sm">
                        <ArrowLeft size={16} />
                        Back to About Us
                    </Link>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">{member.title}</p>
                            <h1 className="text-4xl md:text-5xl font-heading mb-6">{member.name}</h1>
                            <p className="text-white/70 leading-relaxed mb-8 whitespace-pre-wrap">{member.bio}</p>
                            <div className="flex gap-4">
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0077b5] flex items-center justify-center transition-all group">
                                        <Linkedin size={18} className="text-white/80 group-hover:text-white" />
                                    </a>
                                )}
                                {member.email && (
                                    <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all group">
                                        <Mail size={18} className="text-white/80 group-hover:text-white" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-light to-accent/20 flex items-center justify-center border-4 border-accent/30 overflow-hidden shadow-2xl">
                                {member.imageUrl ? (
                                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover object-top" sizes="320px" />
                                ) : (
                                    <Users size={64} className="text-white/30" />
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

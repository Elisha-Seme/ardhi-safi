"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, ArrowRight, Linkedin, Mail } from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    title: string;
    imageUrl: string;
    linkedin: string | null;
    email: string | null;
    slug: string;
}

export default function AboutTeamGrid({ team }: { team: TeamMember[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
                <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                >
                    <Link href={`/about/team/${member.id}`} className="group block">
                        <div className="bg-surface rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                                {member.imageUrl ? (
                                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Users size={32} className="text-primary/40" />
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                                    <span className="text-white text-sm flex items-center gap-2 font-medium">
                                        View Profile <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 text-center bg-white border-t-2 border-accent/20">
                                <h3 className="font-heading text-primary group-hover:text-accent transition-colors">{member.name}</h3>
                                <p className="text-text-secondary text-xs mt-1">{member.title}</p>

                                <div className="mt-4 flex justify-center gap-3">
                                    {member.linkedin ? (
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <Linkedin size={16} className="text-blue-600 hover:text-blue-800 transition-colors" />
                                        </a>
                                    ) : (
                                        <Linkedin size={16} className="text-gray-200" />
                                    )}
                                    {member.email ? (
                                        <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()}>
                                            <Mail size={16} className="text-accent hover:text-accent-dark transition-colors" />
                                        </a>
                                    ) : (
                                        <Mail size={16} className="text-gray-200" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
            {team.length === 0 && (
                <div className="col-span-full py-12 text-center text-text-secondary italic">
                    Team profiles are currently being updated.
                </div>
            )}
        </div>
    );
}

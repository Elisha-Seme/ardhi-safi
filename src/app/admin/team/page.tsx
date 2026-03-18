import prisma from "@/lib/prisma";
import {
    Plus,
    User as UserIcon,
    Edit,
    Trash2,
    Linkedin,
    Twitter,
    Layout
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteTeamMember } from "./actions";
import { revalidatePath } from "next/cache";

export default async function AdminTeamPage() {
    const team = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-primary">Team Members</h1>
                    <p className="text-text-secondary text-sm mt-1">Manage the leadership and staff profiles shown on the website.</p>
                </div>
                <Link
                    href="/admin/team/new"
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all text-sm"
                >
                    <Plus size={18} /> Add Member
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="h-48 relative overflow-hidden bg-surface">
                            {member.imageUrl ? (
                                <Image src={member.imageUrl} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 object-top" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary/10">
                                    <UserIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full ${member.active ? 'bg-emerald-500/80' : 'bg-gray-500/80'}`}>
                                    {member.active ? 'Active' : 'Hidden'}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-heading text-md text-primary mb-1 line-clamp-1">{member.name}</h3>
                            <p className="text-accent text-xs font-semibold mb-3 line-clamp-1">{member.title}</p>

                            <div className="flex items-center gap-2 mb-4">
                                {member.linkedin ? <Linkedin size={14} className="text-blue-600" /> : <Linkedin size={14} className="text-gray-300" />}
                                {member.twitter ? <Twitter size={14} className="text-sky-500" /> : <Twitter size={14} className="text-gray-300" />}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <span className="text-xs text-text-secondary">Order: {member.order}</span>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/team/${member.id}`}
                                        className="p-2 hover:bg-accent/10 text-primary rounded-lg transition-colors"
                                        title="Edit Profile"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <form action={async () => { "use server"; await deleteTeamMember(member.id); revalidatePath("/admin/team"); }}>
                                        <button
                                            type="submit"
                                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                            title="Delete Member"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {team.length === 0 && (
                    <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                        <Layout className="mx-auto text-gray-200 mb-4" size={48} />
                        <p className="text-text-secondary italic">No team members added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

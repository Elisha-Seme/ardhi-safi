import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Shield, Trash2, Key } from "lucide-react";
import { format } from "date-fns";
import { deleteUser } from "./actions";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import ChangePasswordButton from "./ChangePasswordButton";

export const metadata = {
    title: "Manage Users | Ardhi Safi Admin",
};

export default async function AdminUsersPage() {
    const [users, session] = await Promise.all([
        prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: { id: true, name: true, email: true, createdAt: true },
        }),
        auth(),
    ]);

    const currentUserId = session?.user?.id;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-primary">Admin Users</h1>
                    <p className="text-text-secondary text-sm mt-1">
                        Manage who can access the admin panel.
                    </p>
                </div>
                <Link
                    href="/admin/users/new"
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all text-sm"
                >
                    <Plus size={18} /> Add User
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {users.map((user) => {
                        const isCurrentUser = user.id === currentUserId;

                        return (
                            <div
                                key={user.id}
                                className="px-6 py-5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Shield
                                        size={20}
                                        className={isCurrentUser ? "text-accent" : "text-primary/40"}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-primary truncate">
                                            {user.name || "Unnamed"}
                                        </p>
                                        {isCurrentUser && (
                                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                You
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-secondary truncate">{user.email}</p>
                                </div>
                                <p className="text-xs text-text-secondary hidden md:block">
                                    Joined {format(new Date(user.createdAt), "MMM d, yyyy")}
                                </p>
                                <div className="flex items-center gap-1">
                                    <ChangePasswordButton userId={user.id} userName={user.name || user.email} />
                                    {!isCurrentUser && (
                                        <form
                                            action={async () => {
                                                "use server";
                                                await deleteUser(user.id);
                                                revalidatePath("/admin/users");
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {users.length === 0 && (
                        <div className="py-16 text-center text-text-secondary italic">
                            No admin users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

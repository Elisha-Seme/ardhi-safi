import prisma from "@/lib/prisma";
import TeamForm from "../TeamForm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({
        where: { id },
    });

    if (!member) {
        notFound();
    }

    return <TeamForm mode="edit" initialData={member} />;
}

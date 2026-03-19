import { Metadata } from 'next';
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import TeamMemberClient from "./TeamMemberClient";

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const member = await prisma.teamMember.findUnique({
        where: { id: slug }
    });

    if (!member) return { title: 'Member Not Found' };

    return {
        title: `${member.name} - ${member.title}`,
        description: member.bio.substring(0, 160),
        openGraph: {
            title: `${member.name} | Ardhi Safi Team`,
            description: member.bio.substring(0, 160),
            type: 'profile',
            images: [member.imageUrl],
        },
    };
}

export default async function TeamMemberPage({ params }: Props) {
    const { slug } = await params;

    // We are using the database ID as the slug
    const member = await prisma.teamMember.findUnique({
        where: { id: slug }
    });

    if (!member || !member.active) return notFound();

    return <TeamMemberClient member={member!} />;
}

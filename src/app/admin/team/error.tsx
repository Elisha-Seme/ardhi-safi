"use client";

import SectionError from "@/components/admin/SectionError";

export default function TeamError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <SectionError error={error} reset={reset} section="Team" backHref="/admin/team" />;
}

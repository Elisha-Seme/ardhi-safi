"use client";

import SectionError from "@/components/admin/SectionError";

export default function LeadsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <SectionError error={error} reset={reset} section="Leads" backHref="/admin/leads" />;
}

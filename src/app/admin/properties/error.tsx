"use client";

import SectionError from "@/components/admin/SectionError";

export default function PropertiesError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <SectionError error={error} reset={reset} section="Properties" backHref="/admin/properties" />;
}

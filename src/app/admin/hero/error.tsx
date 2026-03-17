"use client";

import SectionError from "@/components/admin/SectionError";

export default function HeroError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <SectionError error={error} reset={reset} section="Hero Slides" backHref="/admin/hero" />;
}

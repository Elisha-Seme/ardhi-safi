import prisma from "@/lib/prisma";
import ProjectsGallery from "./ProjectsGallery";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Projects Portfolio | Ardhi Safi Limited",
    description: "Explore our portfolio of premium real estate projects and properties across Kenya.",
};

export default async function ProjectsPage() {
    const items = await prisma.galleryItem.findMany({
        orderBy: { date: 'desc' }
    });

    const categories = ["All", ...new Set(items.map(item => item.category))];

    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-primary text-white">
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(184,155,94,0.3) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }} />
                </div>
                <div className="section-container relative z-10 text-center">
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300 fill-mode-both">
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">Our Portfolio</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            <span className="gradient-text">Project Gallery</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl mx-auto">
                            Explore our portfolio of properties and successful projects across Kenya — from premium residences to prime commercial spaces.
                        </p>
                    </div>
                </div>
            </section>

            {/* Dynamic Gallery */}
            <ProjectsGallery items={items} categories={categories} />

            {/* CTA */}
            <section className="py-16 bg-primary text-white text-center">
                <div className="section-container">
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                        <h2 className="text-3xl font-heading mb-4">Looking for Something Specific?</h2>
                        <p className="text-white/60 mb-8">Contact us and we&apos;ll help you find the perfect property.</p>
                        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-full transition-all text-sm">
                            Get In Touch →
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

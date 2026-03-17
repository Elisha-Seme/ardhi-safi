import prisma from "@/lib/prisma";
import InsightsList from "./InsightsList";


export const metadata = {
    title: "Insights & Market Analysis | Ardhi Safi Limited",
    description: "Expert articles and analysis on the Kenyan real estate market, trends, and investment opportunities.",
};

export default async function InsightsPage() {
    const blogs = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
    });

    const categories = ["All", ...new Set(blogs.map(b => b.category))];

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
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">Knowledge & Analysis</p>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6">
                            <span className="gradient-text">Insights</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl mx-auto">
                            Expert articles and analysis on the Kenyan real estate market, trends, and investment opportunities.
                        </p>
                    </div>
                </div>
            </section>

            <InsightsList initialPosts={blogs} categories={categories} />
        </div>
    );
}

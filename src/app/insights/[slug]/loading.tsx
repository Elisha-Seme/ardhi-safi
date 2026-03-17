export default function InsightPostLoading() {
    return (
        <div className="overflow-hidden">
            {/* Hero skeleton */}
            <section className="relative pt-32 pb-20 bg-primary">
                <div className="section-container text-center animate-pulse">
                    <div className="h-5 w-24 bg-white/10 rounded-full mx-auto mb-4" />
                    <div className="h-10 w-96 max-w-full bg-white/10 rounded-lg mx-auto mb-4" />
                    <div className="h-4 w-48 bg-white/10 rounded mx-auto" />
                </div>
            </section>

            {/* Article body skeleton */}
            <section className="py-16 bg-surface">
                <div className="section-container max-w-4xl mx-auto animate-pulse">
                    <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-4">
                        <div className="h-64 bg-gray-200 rounded-xl mb-8" />
                        <div className="h-4 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-5/6 bg-gray-100 rounded" />
                        <div className="h-4 w-full bg-gray-100 rounded mt-6" />
                        <div className="h-4 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-3/4 bg-gray-100 rounded" />
                        <div className="h-4 w-full bg-gray-100 rounded mt-6" />
                        <div className="h-4 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-2/3 bg-gray-100 rounded" />
                    </div>
                </div>
            </section>
        </div>
    );
}

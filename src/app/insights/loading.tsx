export default function InsightsLoading() {
    return (
        <div className="overflow-hidden">
            {/* Hero skeleton */}
            <section className="relative pt-32 pb-20 bg-primary">
                <div className="section-container text-center animate-pulse">
                    <div className="h-4 w-40 bg-white/10 rounded mx-auto mb-4" />
                    <div className="h-12 w-48 bg-white/10 rounded-lg mx-auto mb-6" />
                    <div className="h-4 w-96 max-w-full bg-white/10 rounded mx-auto" />
                </div>
            </section>

            {/* Category tabs skeleton */}
            <section className="py-12 bg-surface">
                <div className="section-container animate-pulse">
                    <div className="flex gap-3 mb-10 justify-center">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
                        ))}
                    </div>

                    {/* Blog grid skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                                <div className="h-52 bg-gray-200" />
                                <div className="p-6 space-y-3">
                                    <div className="flex gap-2">
                                        <div className="h-5 w-16 bg-gray-100 rounded-full" />
                                        <div className="h-5 w-20 bg-gray-100 rounded-full" />
                                    </div>
                                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-3 w-full bg-gray-100 rounded" />
                                    <div className="h-3 w-2/3 bg-gray-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

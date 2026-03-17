export default function PropertiesLoading() {
    return (
        <div className="overflow-hidden">
            {/* Hero skeleton */}
            <section className="relative pt-36 pb-20 bg-primary">
                <div className="section-container">
                    <div className="text-center animate-pulse">
                        <div className="h-4 w-40 bg-white/10 rounded mx-auto mb-4" />
                        <div className="h-12 w-72 bg-white/10 rounded-lg mx-auto mb-4" />
                        <div className="h-4 w-96 max-w-full bg-white/10 rounded mx-auto" />
                    </div>
                </div>
            </section>

            {/* Filter bar skeleton */}
            <section className="relative -mt-8 z-20">
                <div className="section-container">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-pulse">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 h-12 bg-gray-100 rounded-xl" />
                            <div className="flex gap-3">
                                <div className="h-12 w-32 bg-gray-100 rounded-xl" />
                                <div className="h-12 w-32 bg-gray-100 rounded-xl" />
                                <div className="h-12 w-36 bg-gray-100 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid skeleton */}
            <section className="py-16 bg-surface">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                                <div className="h-60 bg-gray-200" />
                                <div className="p-6 space-y-3">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-4 w-1/2 bg-gray-100 rounded" />
                                    <div className="h-3 w-full bg-gray-100 rounded" />
                                    <div className="pt-4 border-t border-gray-100 flex gap-4">
                                        <div className="h-3 w-16 bg-gray-100 rounded" />
                                        <div className="h-3 w-16 bg-gray-100 rounded" />
                                        <div className="h-3 w-20 bg-gray-100 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

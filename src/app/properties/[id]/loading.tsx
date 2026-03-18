export default function PropertyDetailLoading() {
    return (
        <div className="overflow-hidden">
            {/* Hero skeleton */}
            <div className="relative h-[50vh] md:h-[60vh] bg-primary animate-pulse">
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="section-container pb-10 space-y-3">
                        <div className="flex gap-2">
                            <div className="h-6 w-20 bg-white/10 rounded-full" />
                            <div className="h-6 w-24 bg-white/10 rounded-full" />
                        </div>
                        <div className="h-10 w-96 max-w-full bg-white/10 rounded-lg" />
                        <div className="h-4 w-48 bg-white/10 rounded" />
                    </div>
                </div>
            </div>

            {/* Content skeleton */}
            <div className="py-12 bg-surface">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-pulse">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-2xl p-8 space-y-6">
                                <div className="h-10 w-48 bg-gray-200 rounded" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-16 bg-gray-100 rounded-xl" />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 space-y-3">
                                <div className="h-6 w-48 bg-gray-200 rounded" />
                                <div className="h-4 w-full bg-gray-100 rounded" />
                                <div className="h-4 w-full bg-gray-100 rounded" />
                                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                                <div className="h-4 w-full bg-gray-100 rounded" />
                                <div className="h-4 w-5/6 bg-gray-100 rounded" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-white rounded-2xl p-8 space-y-4">
                                <div className="h-6 w-48 bg-gray-200 rounded" />
                                <div className="h-4 w-full bg-gray-100 rounded" />
                                <div className="h-12 w-full bg-gray-200 rounded-xl" />
                                <div className="h-12 w-full bg-gray-100 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div>
                <div className="h-8 w-40 bg-slate-200 rounded-lg" />
                <div className="h-4 w-64 bg-slate-100 rounded mt-2" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100" />
                            <div className="w-4 h-4 bg-slate-100 rounded" />
                        </div>
                        <div className="h-3 w-20 bg-slate-100 rounded mb-2" />
                        <div className="h-8 w-12 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="h-5 w-36 bg-slate-200 rounded" />
                        <div className="h-3 w-16 bg-slate-100 rounded" />
                    </div>
                    <div className="divide-y divide-gray-50">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="h-4 w-32 bg-slate-200 rounded mb-1" />
                                        <div className="h-3 w-40 bg-slate-100 rounded" />
                                    </div>
                                    <div className="h-5 w-20 bg-slate-100 rounded-full" />
                                </div>
                                <div className="h-3 w-3/4 bg-slate-100 rounded mt-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-slate-200 p-8 rounded-3xl h-52" />
                    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                        <div className="h-5 w-24 bg-slate-200 rounded mb-4" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="h-3 w-20 bg-slate-100 rounded" />
                                    <div className="h-3 w-16 bg-slate-100 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

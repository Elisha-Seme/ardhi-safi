export default function PropertiesAdminLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="h-7 w-36 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-64 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-11 w-40 bg-slate-200 rounded-2xl" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100" />
                        <div>
                            <div className="h-3 w-20 bg-slate-100 rounded mb-2" />
                            <div className="h-6 w-12 bg-slate-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex gap-4">
                    <div className="h-10 flex-1 bg-slate-100 rounded-xl" />
                    <div className="h-10 w-32 bg-slate-100 rounded-xl" />
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="px-6 py-4 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-slate-100 shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-48 bg-slate-200 rounded" />
                                <div className="h-3 w-32 bg-slate-100 rounded" />
                            </div>
                            <div className="h-6 w-20 bg-slate-100 rounded-full" />
                            <div className="h-4 w-24 bg-slate-100 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

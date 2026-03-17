export default function BlogsLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-64 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-11 w-36 bg-slate-200 rounded-2xl" />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex gap-4">
                    <div className="h-10 flex-1 bg-slate-100 rounded-xl" />
                    <div className="h-10 w-32 bg-slate-100 rounded-xl" />
                </div>
                <div className="divide-y divide-gray-50">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="px-6 py-5 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-100 shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-2/3 bg-slate-200 rounded" />
                                <div className="h-3 w-1/3 bg-slate-100 rounded" />
                            </div>
                            <div className="h-6 w-20 bg-slate-100 rounded-full" />
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                                <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

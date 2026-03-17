export default function TestimonialsLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-44 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-80 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-11 w-44 bg-slate-200 rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-6 flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <div key={s} className="h-4 w-4 bg-slate-100 rounded" />
                                    ))}
                                </div>
                                <div className="h-5 w-5 bg-slate-100 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-slate-100 rounded" />
                                <div className="h-3 w-full bg-slate-100 rounded" />
                                <div className="h-3 w-2/3 bg-slate-100 rounded" />
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-10 h-10 rounded-full bg-slate-100" />
                                <div>
                                    <div className="h-4 w-24 bg-slate-200 rounded mb-1" />
                                    <div className="h-3 w-32 bg-slate-100 rounded" />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-surface border-t border-gray-50 flex items-center justify-between">
                            <div className="h-5 w-16 bg-slate-100 rounded-md" />
                            <div className="flex gap-1">
                                <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                                <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

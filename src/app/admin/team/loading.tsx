export default function TeamLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-80 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-11 w-36 bg-slate-200 rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-48 bg-slate-100" />
                        <div className="p-5 space-y-2">
                            <div className="h-5 w-3/4 bg-slate-200 rounded" />
                            <div className="h-3 w-1/2 bg-slate-100 rounded" />
                            <div className="flex gap-2 mt-3">
                                <div className="h-4 w-4 bg-slate-100 rounded" />
                                <div className="h-4 w-4 bg-slate-100 rounded" />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="h-3 w-16 bg-slate-100 rounded" />
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                                    <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

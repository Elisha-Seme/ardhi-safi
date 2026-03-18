export default function UsersLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-40 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-64 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-11 w-32 bg-slate-200 rounded-2xl" />
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="px-6 py-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-100" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-32 bg-slate-200 rounded" />
                            <div className="h-3 w-48 bg-slate-100 rounded" />
                        </div>
                        <div className="h-3 w-24 bg-slate-100 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

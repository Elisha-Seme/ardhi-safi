export default function GalleryLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-56 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-72 bg-slate-100 rounded mt-2" />
                </div>
                <div className="h-11 w-40 bg-slate-200 rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-48 bg-slate-100" />
                        <div className="p-5 space-y-2">
                            <div className="h-4 w-3/4 bg-slate-200 rounded" />
                            <div className="h-3 w-1/2 bg-slate-100 rounded" />
                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
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

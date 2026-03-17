export default function LeadsLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div>
                <div className="h-8 w-44 bg-slate-200 rounded-lg" />
                <div className="h-4 w-80 bg-slate-100 rounded mt-2" />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-surface border-b border-gray-100/50">
                                {["Date", "Contact Info", "Company Details", "Message Preview", "Actions"].map((h) => (
                                    <th key={h} className="py-4 px-6">
                                        <div className="h-3 w-20 bg-slate-200 rounded" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <tr key={i}>
                                    <td className="py-5 px-6">
                                        <div className="h-4 w-20 bg-slate-200 rounded mb-1" />
                                        <div className="h-3 w-14 bg-slate-100 rounded" />
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="h-4 w-28 bg-slate-200 rounded mb-2" />
                                        <div className="h-3 w-36 bg-slate-100 rounded mb-1" />
                                        <div className="h-3 w-24 bg-slate-100 rounded" />
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="h-3 w-24 bg-slate-200 rounded mb-1" />
                                        <div className="h-3 w-16 bg-slate-100 rounded" />
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="h-3 w-full bg-slate-100 rounded mb-1" />
                                        <div className="h-3 w-3/4 bg-slate-100 rounded" />
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="h-8 w-8 bg-slate-100 rounded-lg ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

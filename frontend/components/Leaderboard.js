import { motion } from "framer-motion";

export default function Leaderboard({ likes = {}, profiles = [] }) {
    const sorted = [...profiles].sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));
    const winner = sorted[0];

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white" dir="rtl">
            <h2 className="text-center text-sm font-bold tracking-[0.3em] text-pink-500 uppercase mb-8">סיכום המסיבה</h2>

            {/* Podium Section */}
            <div className="flex items-end justify-center gap-2 mb-12 h-64">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-slate-400 overflow-hidden mb-2 grayscale">
                        <img src={sorted[1]?.images?.[0]} className="object-cover h-full w-full" />
                    </div>
                    <div className="w-20 bg-slate-800 h-24 rounded-t-2xl flex items-center justify-center font-bold text-2xl text-slate-400">2</div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                    <span className="text-4xl mb-1 animate-bounce">👑</span>
                    <div className="w-24 h-24 rounded-full border-4 border-yellow-500 overflow-hidden mb-2 ring-4 ring-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                        <img src={winner?.images?.[0]} className="object-cover h-full w-full" />
                    </div>
                    <div className="w-28 bg-gradient-to-t from-yellow-700 to-yellow-500 h-40 rounded-t-2xl flex flex-col items-center justify-center shadow-lg">
                        <span className="text-4xl font-black">1</span>
                        <span className="text-xs font-bold uppercase">{likes[winner?.id] || 0} ❤️</span>
                    </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-orange-800 overflow-hidden mb-2 grayscale">
                        <img src={sorted[2]?.images?.[0]} className="object-cover h-full w-full" />
                    </div>
                    <div className="w-20 bg-orange-900/40 h-16 rounded-t-2xl flex items-center justify-center font-bold text-2xl text-orange-800">3</div>
                </div>
            </div>

            {/* Detailed List */}
            <div className="space-y-3 max-w-md mx-auto">
                {sorted.map((p, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={p.id}
                        className="bg-white/5 border border-white/10 rounded-3xl p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 font-mono w-4">{i + 1}</span>
                            <img src={p.images?.[0]} className="w-12 h-12 rounded-2xl object-cover" />
                            <div>
                                <p className="font-bold">{p.name}</p>
                                <p className="text-xs text-slate-500">{p.profession}</p>
                            </div>
                        </div>
                        <div className="text-pink-500 font-black flex items-center gap-1">
                            {likes[p.id] || 0} <span className="text-xs">❤️</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
    const [nickname, setNickname] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedUser = window.localStorage.getItem("partyUser");
        if (!savedUser) return;

        try {
            const parsed = JSON.parse(savedUser);
            if (parsed?.nickname) setNickname(parsed.nickname);
            if (parsed?.roomCode) setRoomCode(parsed.roomCode);
        } catch {
            return;
        }
    }, []);

    const join = (event) => {
        event.preventDefault();

        const trimmedNickname = nickname.trim();
        const trimmedRoomCode = roomCode.trim().toUpperCase();

        if (!trimmedNickname || !trimmedRoomCode) {
            return;
        }

        window.localStorage.setItem(
            "partyUser",
            JSON.stringify({ nickname: trimmedNickname, roomCode: trimmedRoomCode })
        );

        router.push("/room");
    };

    // Inside Home.js
    return (
        <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-right" dir="rtl">
            {/* Animated Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/30 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 blur-[120px] rounded-full" />
            </div>
            <div className="w-full max-w-md space-y-4">

                <header className="text-center space-y-2">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-2 flex justify-center"
                    >
                        <img
                            src="/imgs/logo_pickder_name.png"
                            alt="Pickder Logo"
                            className="w-90 h-auto object-contain rounded-3xl"
                        />
                    </motion.div>

                    <p className="text-slate-300 text-xl font-medium leading-snug">
                        מי יהיה ה-Match של החדר?
                    </p>

                </header>

                <form onSubmit={join} className="space-y-4">
                    <div className="group relative">
                        <input
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="איך קוראים לך?"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-3xl px-6 py-5 text-xl text-white outline-none focus:border-pink-500 transition-all placeholder:text-slate-600"
                        />
                    </div>
                    <div className="group relative">
                        <input
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="קוד חדר"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-3xl px-6 py-5 text-xl text-white outline-none focus:border-pink-500 transition-all placeholder:text-slate-600 font-mono tracking-widest"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-black text-xl py-5 rounded-3xl shadow-[0_20px_50px_rgba(244,63,94,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        בואו נתחיל!
                    </button>
                </form>
            </div>
        </div >
    );
}
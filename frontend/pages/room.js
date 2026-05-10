import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SwipeCard from "../components/SwipeCard";
import Leaderboard from "../components/Leaderboard";
import { createSocket } from "../lib/socket";

export default function Room() {
    const [user, setUser] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [leaderboard, setLeaderboard] = useState({});
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingProfiles, setLoadingProfiles] = useState(true);
    const router = useRouter();
    const connectionRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const stored = window.localStorage.getItem("partyUser");
        if (!stored) {
            router.replace("/");
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            if (!parsed?.nickname || !parsed?.roomCode) {
                router.replace("/");
                return;
            }
            setUser(parsed);
        } catch {
            router.replace("/");
        } finally {
            setLoadingUser(false);
        }
    }, [router]);

    useEffect(() => {
        if (!user) return;

        const connection = createSocket();
        if (!connection) return;

        connectionRef.current = connection;

        connection.on("leaderboardUpdate", (data) => {
            setLeaderboard(data || {});
        });

        connection.start().then(() => {
            connection.invoke("JoinRoom", user.roomCode);
        }).catch((error) => {
            console.error("SignalR connection failed:", error);
        });

        return () => {
            connection.off("leaderboardUpdate");
            connection.stop().catch(() => null);
            connectionRef.current = null;
        };
    }, [user]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/profiles`).then((res) => res.json())
            .then((data) => {
                const normalized = data.map((profile) => ({
                    ...profile,
                    id: profile.id || profile.Id,
                }));
                setProfiles(normalized);
            })
            .catch(() => setProfiles([]))
            .finally(() => setLoadingProfiles(false));
    }, []);

    console.log("API:", process.env.NEXT_PUBLIC_API);

    const onSwipe = (profileId, liked) => {
        if (!user) return;

        connectionRef.current?.invoke("Swipe", {
            nickname: user.nickname,
            roomCode: user.roomCode,
            profileId,
            liked,
        }).catch(() => null);

        const nextIndex = currentIndex + 1;
        if (nextIndex < profiles.length) {
            setCurrentIndex(nextIndex);
        } else {
            setShowLeaderboard(true);
        }
    };

    if (!loadingProfiles && profiles.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-slate-100 flex items-center justify-center px-4">
                <div className="rounded-3xl bg-white p-8 shadow-2xl border border-pink-100 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">אין פרופילים זמינים</h2>
                    <p className="mt-3 text-slate-500">לא הצלחנו לטעון פרופילים.</p>
                </div>
            </div>
        );
    }

    if (loadingUser || loadingProfiles) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-slate-100 flex items-center justify-center px-4">
                <div className="rounded-3xl bg-white/95 px-8 py-10 shadow-2xl border border-pink-100 text-center">
                    <p className="text-xl font-semibold text-slate-700">טוען חדר...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (showLeaderboard || currentIndex >= profiles.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-slate-100 px-4 py-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="rounded-[32px] bg-white/95 border border-pink-100 p-6 shadow-2xl">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-pink-500">חדר</p>
                                <h1 className="mt-2 text-4xl font-extrabold text-slate-900">חדר {user.roomCode}</h1>
                                <p className="mt-2 text-sm text-slate-500">שלום {user.nickname}, זו הלוח הסיכום של החדר שלך.</p>
                            </div>
                            <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-4 text-white shadow-xl">
                                <p className="text-sm uppercase opacity-90">מצב חי</p>
                                <p className="mt-2 text-3xl font-semibold">{Object.values(leaderboard).reduce((sum, count) => sum + count, 0)} ❤️</p>
                            </div>
                        </div>
                    </div>

                    <Leaderboard likes={leaderboard} profiles={profiles} />
                </div>
            </div>
        );
    }

    const currentProfile = profiles[currentIndex];
    return (
        <div className="
        w-screen
        h-screen
        overflow-hidden

        bg-gradient-to-br
        from-pink-300
        via-white
        to-slate-100

        flex
        items-center
        justify-center
    ">
            <SwipeCard
                profile={currentProfile}
                swipe={onSwipe}
            />
        </div>
    );
}
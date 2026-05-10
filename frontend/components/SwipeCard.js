import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export default function SwipeCard({ profile, swipe, nextProfile }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
    const opacity = useTransform(
        x,
        [-200, -100, 0, 100, 200],
        [0.4, 1, 1, 1, 0.4]
    );

    const likeOpacity = useTransform(x, [0, 80, 160], [0, 0.7, 1]);
    const nopeOpacity = useTransform(x, [-160, -80, 0], [1, 0.7, 0]);

    const likeScale = useTransform(x, [0, 150], [0.8, 1.2]);
    const nopeScale = useTransform(x, [-150, 0], [1.2, 0.8]);

    const handleDragEnd = (e, info) => {
        if (info.offset.x > 100) swipe(profile.id, true);
        else if (info.offset.x < -100) swipe(profile.id, false);
    };
    const [imgIndex, setImgIndex] = useState(0);

    const images = profile.images?.length
        ? profile.images
        : [profile.image];

    const nextImg = () => {
        setImgIndex((prev) => (prev + 1) % images.length);
    };

    const prevImg = () => {
        setImgIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className="
    relative
    w-full
    h-full

    md:w-[520px]
    md:h-[95vh]

    bg-slate-0
    overflow-hidden

    shadow-[0_20px_80px_rgba(0,0,0,0.45)]

    md:rounded-[42px]
">
            <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing h-full"
            >

                {/* LIKE OVERLAY */}
                <motion.div
                    style={{
                        opacity: likeOpacity,
                        scale: likeScale,
                    }}
                    className="
        absolute
        top-10
        left-8
        z-50

        rotate-[-15deg]

        border-4
        border-green-400

        text-green-400
        text-5xl
        font-black

        px-6
        py-2

        rounded-2xl

        bg-black/30
        backdrop-blur-md
    "
                >
                    LIKE
                </motion.div>

                {/* NOPE OVERLAY */}
                <motion.div
                    style={{
                        opacity: nopeOpacity,
                        scale: nopeScale,
                    }}
                    className="
        absolute
        top-10
        right-8
        z-50

        rotate-[15deg]

        border-4
        border-red-400

        text-red-400
        text-5xl
        font-black

        px-6
        py-2

        rounded-2xl

        bg-black/30
        backdrop-blur-md
    "
                >
                    NOPE
                </motion.div>

                {/* The Main Card Container */}
                <div className="relative h-full w-full overflow-hidden rounded-[48px] bg-slate-900 shadow-2xl border-[6px] border-white/10 flex flex-col">

                    {/* 1. TOP HERO SECTION (Fixed Height) */}
                    {/* 1. TOP HERO SECTION */}
                    <div className="relative h-[52%] min-h-[360px] w-full flex-shrink-0 overflow-hidden">

                        {/* LEFT ARROW */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImg}
                                    className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2

                z-30

                bg-black/40
                hover:bg-black/60

                text-white
                text-3xl

                w-10
                h-10

                rounded-full

                flex
                items-center
                justify-center
            "
                                >
                                    ‹
                                </button>

                                {/* RIGHT ARROW */}
                                <button
                                    onClick={nextImg}
                                    className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2

                z-30

                bg-black/40
                hover:bg-black/60

                text-white
                text-3xl

                w-10
                h-10

                rounded-full

                flex
                items-center
                justify-center
            "
                                >
                                    ›
                                </button>
                            </>
                        )}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                            {images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === imgIndex ? "bg-white" : "bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* IMAGES SLIDER */}
                        <div className="
        flex
        w-full
        h-full
        overflow-x-auto
        snap-x
        snap-mandatory
        scrollbar-hide
    ">

                            {(profile.images?.length > 0
                                ? profile.images
                                : [profile.image]
                            ).map((img, index) => (

                                <div
                                    key={index}
                                    className="
                    min-w-full
                    h-full
                    snap-center
                    relative
                    flex-shrink-0
                "
                                >
                                    <img
                                        src={images[imgIndex]}
                                        alt=""
                                        className="h-full w-full object-cover pointer-events-none transition-all duration-300"
                                    />
                                </div>

                            ))}

                        </div>

                        {/* DARK OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20 pointer-events-none" />

                        {/* PROFILE TEXT */}
                        <div
                            className="
            absolute
            bottom-2
            right-8
            text-right
            z-20
        "
                            dir="rtl"
                        >
                            <h1 className="text-4xl font-black text-white drop-shadow-md">
                                {profile.name}, {profile.age}
                            </h1>

                            <p className="text-pink-500 font-bold text-2xl">
                                {profile.profession}
                            </p>
                        </div>

                    </div>

                    {/* 2. SCROLLABLE DETAILS SECTION (The "Blank Space" Killer) */}
                    <div className="flex-1 overflow-y-auto bg-slate-900 custom-scrollbar p-6 space-y-6" dir="rtl">

                        {/* Bio / About */}
                        <section className="bg-white/5 p-5 rounded-3xl border border-white/5">

                            <h3 className="text-pink-500 text-xs font-black uppercase tracking-widest mb-2">
                                Bio
                            </h3>

                            <p className="text-slate-200 text-1xl leading-relaxed mb-2">                                {profile.bio}
                            </p>

                            <p className="text-slate-200 leading-relaxed text-md font-medium">
                                {profile.about}
                            </p>

                        </section>

                        {/* Habits / Specs Grid */}
                        <div className="grid grid-cols-2 gap-3">

                            <DetailChip
                                label="גובה"
                                value={profile.height}
                                icon="📏"
                            />

                            <DetailChip
                                label="מקצוע"
                                value={profile.profession}
                                icon="💼"
                            />

                            <DetailChip
                                label="אלכוהול"
                                value={profile.habits?.alcohol}
                                icon="🍹"
                            />

                            <DetailChip
                                label="מעשן"
                                value={profile.habits?.smoking}
                                icon="🚬"
                            />

                            <DetailChip
                                label="עישון מוריד"
                                value={profile.habits?.smokingTurnOff}
                                icon="😷"
                            />

                            <DetailChip
                                label="חיות"
                                value={profile.habits?.pets}
                                icon="🐶"
                            />

                            <DetailChip
                                label="סדר"
                                value={profile.habits?.messy}
                                icon="🧹"
                            />

                            <DetailChip
                                label="בוקר או לילה"
                                value={profile.habits?.timeType}
                                icon="🌙"
                            />

                        </div>

                        {/* Flags Section */}
                        <div className="space-y-4">
                            <FlagList title="🟢 GREEN  FLAGS" items={profile.greenFlags} color="text-green-400" bg="bg-green-500/10" />
                            <FlagList title="🚩 RED  FLAGS" items={profile.redFlags} color="text-red-400" bg="bg-red-500/10" />
                        </div>

                        {/* Weird Questions (The Party Humor) */}
                        {profile.weirdQuestions && (
                            <section className="space-y-3">

                                <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest">
                                    שאלות מוזרות
                                </h3>

                                {profile.weirdQuestions.liveOnBoat && (
                                    <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
                                        <p className="text-indigo-300 text-xl font-bold mb-1 italic">
                                            ⛵ לגור על סירה
                                        </p>

                                        <p className="text-white text-xl">
                                            {profile.weirdQuestions.liveOnBoat}
                                        </p>
                                    </div>
                                )}

                                {profile.weirdQuestions.attractedToIntelligence && (
                                    <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
                                        <p className="text-indigo-300 text-xl font-bold mb-1 italic">
                                            🧠 אינטליגנציה מושכת אותך?
                                        </p>

                                        <p className="text-white text-xl">
                                            {profile.weirdQuestions.attractedToIntelligence}
                                        </p>
                                    </div>
                                )}

                            </section>
                        )}

                        {/* Pickup Line - The Grand Finale */}
                        <section className="bg-gradient-to-br from-pink-600 to-rose-500 p-6 rounded-[32px] text-center shadow-xl">
                            <p className="text-white/70 text-xs uppercase font-black mb-2">משפט פתיחה:</p>
                            <p className="text-white text-xl font-black italic">"{profile.pickupLine}"</p>
                        </section>

                        {/* Empty space at bottom to allow scrolling past the buttons */}
                        <div className="h-12" />
                    </div>

                    {/* 3. FIXED ACTION BUTTONS */}
                    <div className="
                        absolute
                        bottom-8
                        inset-x-0

                        flex
                        justify-center
                        items-center

                        gap-8

                        z-20
                        pointer-events-none
                    ">
                        {/* DISLIKE */}
                        <button
                            onClick={() => swipe(profile.id, false)}
                            className="
            pointer-events-auto

            h-20
            w-20

            rounded-full

            bg-white/10
            backdrop-blur-xl

            border-2 border-red-400/40

            flex
            items-center
            justify-center

            shadow-[0_10px_40px_rgba(0,0,0,0.35)]

            hover:scale-110
            active:scale-90

            transition-all
            duration-200
        "
                        >
                            <span className="text-4xl drop-shadow-lg">
                                ❌
                            </span>
                        </button>
                        {/* LIKE */}
                        <button
                            onClick={() => swipe(profile.id, true)}
                            className="
            pointer-events-auto

            h-20
            w-20

            rounded-full

            bg-gradient-to-br
            from-pink-500
            via-rose-500
            to-red-500

            border-2 border-white/20

            flex
            items-center
            justify-center

            shadow-[0_15px_50px_rgba(255,0,120,0.45)]

            hover:scale-110
            active:scale-95

            transition-all
            duration-200
        "
                        >
                            <span className="text-5xl drop-shadow-lg">
                                ❤️
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {nextProfile && (
                <div
                    className="
            absolute
            inset-0

            scale-[0.94]
            translate-y-5

            -z-10
            overflow-hidden

            rounded-[48px]

            border border-white/10

            opacity-60
        "
                >
                    <img
                        src={nextProfile.image}
                        alt=""
                        className="w-full h-full object-cover blur-[1px] scale-105"
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute bottom-10 right-8 text-right">
                        <h2 className="text-3xl font-black text-white">
                            {nextProfile.name}, {nextProfile.age}
                        </h2>

                        <p className="text-pink-400 text-lg font-bold">
                            {nextProfile.profession}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Reusable Sub-Components for Cleanliness
function DetailChip({ label, value, icon }) {
    if (!value) return null;
    return (
        <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{label}</p>
                <p className="text-white text-sm font-bold">{value}</p>
            </div>
        </div>
    );
}

function FlagList({ title, items, color, bg }) {

    if (!items || items.length === 0) return null;

    return (
        <section className="space-y-3">

            <h3
                className={`
                    ${color}

                    text-lg
                    font-black

                    tracking-wide

                    px-1
                `}
            >
                {title}
            </h3>

            <div className="flex flex-wrap gap-2">

                {items.map((item, i) => (

                    <span
                        key={i}
                        className={`
                            ${bg}
                            ${color}

                            px-8
                            py-3

                            rounded-2xl

                            text-xl
                            leading-tight
                            font-bold

                            border border-white/10

                            shadow-lg
                        `}
                    >
                        {item}
                    </span>

                ))}

            </div>

        </section>
    );
}
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Floating heart particle
interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["💗", "💖", "💝", "🌸", "✨", "💕", "🌷", "💓"];

function useHearts(count: number) {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 20,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, [count]);

  return hearts;
}

export default function App() {
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const hearts = useHearts(20);
  const surpriseRef = useRef<HTMLParagraphElement>(null);

  function handleSurprise() {
    setSurpriseVisible(true);
    setTimeout(() => {
      surpriseRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  return (
    <div className="birthday-bg relative overflow-hidden flex items-center justify-center min-h-screen px-4 py-12">
      {/* Floating hearts background */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute bottom-0 select-none"
            style={{
              left: `${h.x}%`,
              fontSize: `${h.size}px`,
              animation: `float-up ${h.duration}s ease-in-out ${h.delay}s infinite`,
              opacity: 0,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="birthday-card relative z-10 w-full max-w-2xl rounded-[20px] shadow-[0_8px_60px_rgba(255,100,120,0.25),0_2px_20px_rgba(255,150,160,0.15)] px-8 py-12 sm:px-14 sm:py-14"
      >
        {/* Decorative corner roses */}
        <span
          className="absolute top-5 left-6 text-2xl opacity-50 select-none"
          aria-hidden
        >
          🌸
        </span>
        <span
          className="absolute top-5 right-6 text-2xl opacity-50 select-none"
          aria-hidden
        >
          🌸
        </span>
        <span
          className="absolute bottom-5 left-6 text-xl opacity-40 select-none"
          aria-hidden
        >
          🌷
        </span>
        <span
          className="absolute bottom-5 right-6 text-xl opacity-40 select-none"
          aria-hidden
        >
          🌷
        </span>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-8"
        >
          {/* Heartbeat icon */}
          <div
            className="animate-heartbeat inline-block text-5xl mb-3"
            aria-hidden
          >
            💗
          </div>
          <h1
            className="font-display leading-tight text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-tight"
            style={{ color: "#ff0066" }}
          >
            🎉 Happy Birthday Bestie 🎂
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300 rounded-full" />
            <span className="text-pink-400 text-sm">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300 rounded-full" />
          </div>
        </motion.div>

        {/* Messages */}
        <div className="space-y-5 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="text-[1.05rem] leading-relaxed font-body"
            style={{ color: "#333" }}
          >
            Today is a very special day because it&apos;s the birthday of the
            most amazing girl I know. You are kind, beautiful, caring, and truly
            one of a kind. Your smile brightens everyone&apos;s day and your
            heart is full of kindness.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-[1.05rem] leading-relaxed font-body"
            style={{ color: "#333" }}
          >
            Thank you for being such a wonderful best friend. You make life more
            fun, more beautiful, and more meaningful. I&apos;m really lucky to
            have a friend like you.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="text-[1.05rem] leading-relaxed font-body"
            style={{ color: "#333" }}
          >
            May your birthday be filled with happiness, laughter, love, and all
            the success you deserve. Stay the same wonderful person forever! 💖
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
        />

        {/* Surprise button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center"
        >
          <motion.button
            data-ocid="surprise.primary_button"
            onClick={handleSurprise}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(255, 0, 102, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative font-body font-semibold text-white text-lg px-8 py-3.5 rounded-xl cursor-pointer transition-colors duration-200 overflow-hidden"
            style={{ background: surpriseVisible ? "#cc0052" : "#ff0066" }}
            disabled={surpriseVisible}
          >
            {/* Shimmer overlay */}
            {!surpriseVisible && (
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"
                aria-hidden
              />
            )}
            {surpriseVisible
              ? "🎁 Surprise Revealed! 💖"
              : "Click for a Surprise 🎁"}
          </motion.button>
        </motion.div>

        {/* Surprise message */}
        <AnimatePresence>
          {surpriseVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <div className="relative rounded-2xl px-6 py-5 text-center bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/60 shadow-inner">
                {/* Sparkle decorations */}
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl animate-sparkle"
                  aria-hidden
                >
                  ✨
                </span>
                <p
                  ref={surpriseRef}
                  data-ocid="surprise.success_state"
                  className="font-body text-[1.05rem] leading-relaxed font-medium"
                  style={{ color: "#cc0052" }}
                >
                  ✨ You are not just my best friend, you are a blessing in my
                  life. Happy Birthday once again! 🎉💖
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-xs text-rose-300/70 font-body">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-pink-400" aria-label="love">
            ♥
          </span>{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-300/90 hover:text-rose-400 transition-colors underline-offset-2 hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

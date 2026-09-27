import confetti from "canvas-confetti";

export function triggerTweetConfetti() {
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { y: 0.85, x: 0.85 },
    colors: ["#00e5ff", "#38bdf8", "#16181f", "#ff4d4f", "#ffd666"],
    ticks: 180,
    gravity: 1.2,
    scalar: 0.8,
  });
}

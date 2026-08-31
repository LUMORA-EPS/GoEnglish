// ============================================================
// GoEnglish — interações da interface
// ============================================================

/* ---------- Toast ---------- */
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  menuBtn.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  if (isOpen) {
    closeMobileMenu();
  } else {
    mobileMenu.classList.remove("hidden");
    menuBtn.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* ---------- Theme toggle (dark default, light prepared) ---------- */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("goenglish-theme", theme); } catch (e) {}
}

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("goenglish-theme"); } catch (e) {}
  applyTheme(saved === "light" ? "light" : "dark");
})();

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- Your English Journey: level switcher ---------- */
const levelData = {
  beginner: { lessons: 32, words: 210, streak: 6, percent: "38%", bars: [55, 30, 20, 25] },
  intermediate: { lessons: 86, words: 512, streak: 14, percent: "63%", bars: [80, 55, 47, 65] },
  advanced: { lessons: 154, words: 1180, streak: 27, percent: "88%", bars: [95, 90, 82, 88] },
};

const levelSwitcher = document.getElementById("level-switcher");
const statLessons = document.getElementById("stat-lessons");
const statWords = document.getElementById("stat-words");
const statStreak = document.getElementById("stat-streak");
const statPercent = document.getElementById("stat-percent");
const progressBars = document.querySelectorAll("#journey .bar-fill");
const progressValues = document.querySelectorAll("#journey .progress-row span[data-value]");

function setJourney(levelKey) {
  const data = levelData[levelKey];
  if (!data) return;

  statLessons.textContent = data.lessons;
  statWords.textContent = data.words;
  statStreak.textContent = data.streak;
  statPercent.textContent = data.percent;

  progressBars.forEach((bar, i) => {
    const value = data.bars[i];
    bar.dataset.width = value;
    bar.style.width = value + "%";
  });
  progressValues.forEach((el, i) => {
    const value = data.bars[i];
    el.dataset.value = value;
    el.textContent = value + "%";
  });
}

levelSwitcher?.addEventListener("click", (e) => {
  const btn = e.target.closest(".level-btn");
  if (!btn) return;
  levelSwitcher.querySelectorAll(".level-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  setJourney(btn.dataset.level);
});

/* ---------- Animate progress bars when scrolled into view ---------- */
const journeySection = document.getElementById("journey");
let journeyAnimated = false;

const journeyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !journeyAnimated) {
        journeyAnimated = true;
        progressBars.forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
      }
    });
  },
  { threshold: 0.3 }
);
if (journeySection) {
  // start bars at 0 until in view
  progressBars.forEach((bar) => (bar.style.width = "0%"));
  journeyObserver.observe(journeySection);
}

/* ---------- Daily goal ring ---------- */
const goalRing = document.getElementById("goal-ring");
const goalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && goalRing) {
        goalRing.style.setProperty("--ring-pct", "70");
        goalObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);
if (goalRing) goalObserver.observe(goalRing);

/* ---------- Generic reveal-on-scroll (subtle, once per section) ---------- */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- English of the Day: audio playback ---------- */
const dailyAudioBtn = document.getElementById("daily-audio-btn");
dailyAudioBtn?.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    showToast("Audio isn't supported in this browser.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance("Wanna. Do you wanna go?");
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
});

/* ---------- Quick quiz ---------- */
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
let quizAnswered = false;

quizOptions?.addEventListener("click", (e) => {
  const btn = e.target.closest(".quiz-option");
  if (!btn || quizAnswered) return;
  quizAnswered = true;

  const isCorrect = btn.dataset.correct === "true";
  quizOptions.querySelectorAll(".quiz-option").forEach((opt) => {
    if (opt.dataset.correct === "true") opt.classList.add("correct");
    else if (opt === btn) opt.classList.add("wrong");
  });

  if (quizFeedback) {
    quizFeedback.textContent = isCorrect
      ? "Nice! \"Gonna\" is short for \"going to\"."
      : "Not quite — \"gonna\" is short for \"going to\".";
    quizFeedback.style.color = isCorrect ? "var(--green)" : "#f87171";
  }
});

/* ---------- Search (placeholder action) ---------- */
document.getElementById("search-btn")?.addEventListener("click", () => {
  showToast("Search is coming soon.");
});

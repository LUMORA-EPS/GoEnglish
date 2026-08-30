// script.js — Lógica principal e integração com Web Speech API

// ---------------------------------------------------------------------------
// Base de dados de lições
// ---------------------------------------------------------------------------
const lessonsData = [
  { en: "Hello", pt: "Olá", phonetic: "/həˈloʊ/", category: "cumprimentos" },
  { en: "Good morning", pt: "Bom dia", phonetic: "/ɡʊd ˈmɔːrnɪŋ/", category: "cumprimentos" },
  { en: "Nice to meet you", pt: "Prazer em conhecê-lo", phonetic: "/naɪs tuː miːt juː/", category: "cumprimentos" },
  { en: "How are you doing", pt: "Como você está", phonetic: "/haʊ ɑːr juː ˈduːɪŋ/", category: "cumprimentos" },
  { en: "See you later", pt: "Até mais", phonetic: "/siː juː ˈleɪtər/", category: "cumprimentos" },

  { en: "How much is this", pt: "Quanto custa isto", phonetic: "/haʊ mʌtʃ ɪz ðɪs/", category: "viagem" },
  { en: "Where is the airport", pt: "Onde fica o aeroporto", phonetic: "/wɛr ɪz ði ˈɛrpɔːrt/", category: "viagem" },
  { en: "I am lost", pt: "Eu estou perdido", phonetic: "/aɪ æm lɔːst/", category: "viagem" },
  { en: "Can you help me", pt: "Você pode me ajudar", phonetic: "/kæn juː hɛlp miː/", category: "viagem" },
  { en: "What time does it open", pt: "Que horas abre", phonetic: "/wʌt taɪm dʌz ɪt ˈoʊpən/", category: "viagem" },

  { en: "I would like a coffee", pt: "Eu gostaria de um café", phonetic: "/aɪ wʊd laɪk ə ˈkɔːfi/", category: "comida" },
  { en: "The check please", pt: "A conta, por favor", phonetic: "/ðə tʃɛk pliːz/", category: "comida" },
  { en: "This is delicious", pt: "Isto está delicioso", phonetic: "/ðɪs ɪz dɪˈlɪʃəs/", category: "comida" },
  { en: "Do you have a menu", pt: "Você tem um cardápio", phonetic: "/duː juː hæv ə ˈmɛnjuː/", category: "comida" },
  { en: "I am allergic to nuts", pt: "Eu sou alérgico a nozes", phonetic: "/aɪ æm əˈlɜːrdʒɪk tuː nʌts/", category: "comida" },

  { en: "I work from home", pt: "Eu trabalho de casa", phonetic: "/aɪ wɜːrk frʌm hoʊm/", category: "trabalho" },
  { en: "Let's schedule a meeting", pt: "Vamos agendar uma reunião", phonetic: "/lɛts ˈskɛdʒuːl ə ˈmiːtɪŋ/", category: "trabalho" },
  { en: "I sent you the report", pt: "Eu enviei o relatório para você", phonetic: "/aɪ sɛnt juː ðə rɪˈpɔːrt/", category: "trabalho" },
  { en: "Can we push the deadline", pt: "Podemos adiar o prazo", phonetic: "/kæn wiː pʊʃ ðə ˈdɛdlaɪn/", category: "trabalho" },
  { en: "The project is on track", pt: "O projeto está no caminho certo", phonetic: "/ðə ˈprɒdʒɛkt ɪz ɒn træk/", category: "trabalho" },

  { en: "What do you do for fun", pt: "O que você faz por diversão", phonetic: "/wʌt duː juː duː fɔːr fʌn/", category: "social" },
  { en: "I had a great time", pt: "Eu me diverti muito", phonetic: "/aɪ hæd ə ɡreɪt taɪm/", category: "social" },
  { en: "Let's stay in touch", pt: "Vamos manter contato", phonetic: "/lɛts steɪ ɪn tʌtʃ/", category: "social" },
  { en: "Congratulations on the news", pt: "Parabéns pela notícia", phonetic: "/kənˌɡrætʃuˈleɪʃənz ɒn ðə njuːz/", category: "social" },
];

// ---------------------------------------------------------------------------
// Estado
// ---------------------------------------------------------------------------
const state = {
  category: "todos",
  search: "",
};

const STORAGE_KEY = "falaLabProgress";
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore corrupt storage */ }
  return { attempts: 0, scoreSum: 0, streak: 0, learned: [] };
}
function saveProgress(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) { /* storage unavailable */ }
}
let progress = loadProgress();

// ---------------------------------------------------------------------------
// Elementos do DOM
// ---------------------------------------------------------------------------
const cardsGrid = document.getElementById("cards-grid");
const emptyState = document.getElementById("empty-state");
const categoryBtns = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("search-input");
const mobileMenuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

const lessonSelect = document.getElementById("lesson-select");
const targetPhraseInput = document.getElementById("target-phrase");
const targetPhoneticEl = document.getElementById("target-phonetic");
const listenTargetBtn = document.getElementById("listen-target-btn");
const startRecordBtn = document.getElementById("start-record-btn");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackPlaceholder = document.getElementById("feedback-placeholder");
const recognizedTextEl = document.getElementById("recognized-text");
const feedbackMessageEl = document.getElementById("feedback-message");
const diffOutputEl = document.getElementById("diff-output");

const statAttempts = document.getElementById("stat-attempts");
const statAccuracy = document.getElementById("stat-accuracy");
const statStreak = document.getElementById("stat-streak");
const statLearned = document.getElementById("stat-learned");
const resetProgressBtn = document.getElementById("reset-progress-btn");

// ---------------------------------------------------------------------------
// Menu mobile
// ---------------------------------------------------------------------------
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

// ---------------------------------------------------------------------------
// Renderizar cards de vocabulário
// ---------------------------------------------------------------------------
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getFilteredLessons() {
  const term = normalize(state.search.trim());
  return lessonsData.filter((item) => {
    const matchesCategory = state.category === "todos" || item.category === state.category;
    const matchesSearch = !term || normalize(item.en).includes(term) || normalize(item.pt).includes(term);
    return matchesCategory && matchesSearch;
  });
}

function renderCards() {
  const filtered = getFilteredLessons();
  cardsGrid.innerHTML = "";
  emptyState.classList.toggle("hidden", filtered.length > 0);

  filtered.forEach((item) => {
    const isMastered = progress.learned.includes(item.en);
    const card = document.createElement("div");
    card.className = "lesson-card";
    card.innerHTML = `
      ${isMastered ? '<span class="mastered-badge">✓ dominada</span>' : ""}
      <div>
        <span class="tag">${item.category}</span>
        <h3 class="text-xl font-display font-semibold text-[--ink] mt-4">${item.en}</h3>
        <p class="text-[--ink]/50 text-sm mt-1">${item.pt}</p>
        <p class="text-xs text-[--ink]/35 mt-2 font-mono">${item.phonetic}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-[--ink]/10 grid grid-cols-2 gap-2">
        <button class="speak-btn" data-en="${escapeAttr(item.en)}">🔊 Ouvir</button>
        <button class="practice-btn" data-en="${escapeAttr(item.en)}">🎯 Praticar</button>
      </div>
    `;
    cardsGrid.appendChild(card);
  });
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// Delegação de eventos nos cards (evita quebrar com aspas em frases como "Let's...")
cardsGrid.addEventListener("click", (e) => {
  const speakBtn = e.target.closest(".speak-btn");
  const practiceBtn = e.target.closest(".practice-btn");
  if (speakBtn) {
    speakText(speakBtn.dataset.en);
  } else if (practiceBtn) {
    setTargetPhrase(practiceBtn.dataset.en);
    document.getElementById("laboratorio").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// Filtros de categoria
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.category = btn.getAttribute("data-category");
    renderCards();
  });
});

// Busca
searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderCards();
});

// ---------------------------------------------------------------------------
// Laboratório de fala — seleção de frase
// ---------------------------------------------------------------------------
function populateLessonSelect() {
  lessonSelect.innerHTML = "";
  const categories = [...new Set(lessonsData.map((l) => l.category))];
  categories.forEach((cat) => {
    const group = document.createElement("optgroup");
    group.label = cat;
    lessonsData.filter((l) => l.category === cat).forEach((l) => {
      const opt = document.createElement("option");
      opt.value = l.en;
      opt.textContent = `${l.en} — ${l.pt}`;
      group.appendChild(opt);
    });
    lessonSelect.appendChild(group);
  });
}

function setTargetPhrase(en) {
  targetPhraseInput.value = en;
  lessonSelect.value = en;
  updateTargetPhonetic();
}

function updateTargetPhonetic() {
  const match = lessonsData.find((l) => l.en.toLowerCase() === targetPhraseInput.value.trim().toLowerCase());
  targetPhoneticEl.textContent = match ? match.phonetic : "";
}

lessonSelect.addEventListener("change", () => setTargetPhrase(lessonSelect.value));
targetPhraseInput.addEventListener("input", updateTargetPhonetic);

// ---------------------------------------------------------------------------
// Web Speech API — Synthesis (Ouvir)
// ---------------------------------------------------------------------------
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Seu navegador não suporta síntese de fala. Tente usar o Google Chrome.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9; // Velocidade levemente reduzida para iniciantes
  window.speechSynthesis.speak(utterance);
}

listenTargetBtn.addEventListener("click", () => {
  const text = targetPhraseInput.value.trim();
  if (text) speakText(text);
});

// ---------------------------------------------------------------------------
// Web Speech API — Recognition (Falar / Testar) + comparação por palavra
// ---------------------------------------------------------------------------
const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

function cleanWords(str) {
  return normalize(str)
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

// Diferença palavra-a-palavra baseada em LCS, para marcar acertos, erros e extras.
function diffWords(targetWords, spokenWords) {
  const n = targetWords.length, m = spokenWords.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = targetWords[i - 1] === spokenWords[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Reconstrói o alinhamento
  const tokens = [];
  let i = n, j = m;
  while (i > 0 && j > 0) {
    if (targetWords[i - 1] === spokenWords[j - 1]) {
      tokens.unshift({ word: targetWords[i - 1], type: "match" });
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      tokens.unshift({ word: targetWords[i - 1], type: "miss" });
      i--;
    } else {
      tokens.unshift({ word: spokenWords[j - 1], type: "extra" });
      j--;
    }
  }
  while (i > 0) { tokens.unshift({ word: targetWords[i - 1], type: "miss" }); i--; }
  while (j > 0) { tokens.unshift({ word: spokenWords[j - 1], type: "extra" }); j--; }

  const matches = dp[n][m];
  const accuracy = n === 0 ? 0 : Math.round((matches / n) * 100);
  return { tokens, accuracy };
}

function renderDiff(tokens) {
  diffOutputEl.innerHTML = "";
  tokens.forEach((t) => {
    const span = document.createElement("span");
    span.className = `diff-word ${t.type}`;
    span.textContent = t.type === "miss" ? t.word : t.type === "extra" ? `+${t.word}` : t.word;
    diffOutputEl.appendChild(span);
  });
}

function setRecordingUI(active) {
  isListening = active;
  startRecordBtn.disabled = active;
  startRecordBtn.classList.toggle("recording", active);
  startRecordBtn.textContent = active ? "🎙️ Ouvindo…" : "🎤 Falar / Testar";
}

startRecordBtn.addEventListener("click", () => {
  if (isListening) return;

  if (!SpeechRecognitionCtor) {
    alert("Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.");
    return;
  }
  const targetText = targetPhraseInput.value.trim();
  if (!targetText) {
    alert("Digite ou escolha uma frase para praticar primeiro.");
    return;
  }

  recognition = new SpeechRecognitionCtor();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setRecordingUI(true);
  recognition.start();

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.trim();
    feedbackPlaceholder.classList.add("hidden");
    feedbackContainer.classList.remove("hidden");
    recognizedTextEl.textContent = `"${speechResult}"`;

    const targetWords = cleanWords(targetText);
    const spokenWords = cleanWords(speechResult);
    const { tokens, accuracy } = diffWords(targetWords, spokenWords);
    renderDiff(tokens);
    applyFeedbackStyle(accuracy);
    recordAttempt(targetText, accuracy);
  };

  recognition.onerror = (event) => {
    feedbackPlaceholder.classList.add("hidden");
    feedbackContainer.classList.remove("hidden");
    feedbackContainer.className = "p-5 rounded-2xl text-left border bg-amber-50 border-amber-200";
    recognizedTextEl.textContent = "Não foi possível capturar o áudio.";
    diffOutputEl.innerHTML = "";
    feedbackMessageEl.className = "font-bold mb-3 text-amber-700";
    feedbackMessageEl.textContent = `Erro: ${event.error === "not-allowed" ? "permissão de microfone negada" : event.error}`;
  };

  recognition.onend = () => setRecordingUI(false);
});

function applyFeedbackStyle(accuracy) {
  let colorClasses, textClass, message;
  if (accuracy >= 90) {
    colorClasses = "bg-emerald-50 border-emerald-200";
    textClass = "text-emerald-700";
    message = "✔ Excelente! Pronúncia muito próxima do modelo.";
  } else if (accuracy >= 60) {
    colorClasses = "bg-amber-50 border-amber-200";
    textClass = "text-amber-700";
    message = "➤ Quase lá! Reveja as palavras destacadas abaixo.";
  } else {
    colorClasses = "bg-rose-50 border-rose-200";
    textClass = "text-rose-700";
    message = "✖ Tente de novo, ouvindo o modelo com atenção.";
  }
  feedbackContainer.className = `p-5 rounded-2xl text-left border ${colorClasses}`;
  feedbackMessageEl.className = `font-bold mb-3 ${textClass}`;
  feedbackMessageEl.textContent = `${message} (${accuracy}% de acerto)`;
}

// ---------------------------------------------------------------------------
// Progresso (persistido em localStorage)
// ---------------------------------------------------------------------------
function recordAttempt(phraseEn, accuracy) {
  progress.attempts += 1;
  progress.scoreSum += accuracy;
  progress.streak = accuracy >= 60 ? progress.streak + 1 : 0;
  if (accuracy >= 90 && !progress.learned.includes(phraseEn)) {
    progress.learned.push(phraseEn);
  }
  saveProgress(progress);
  renderStats();
  renderCards(); // atualiza badge "dominada" se aplicável
}

function renderStats() {
  statAttempts.textContent = progress.attempts;
  statAccuracy.textContent = progress.attempts ? `${Math.round(progress.scoreSum / progress.attempts)}%` : "—";
  statStreak.textContent = progress.streak;
  statLearned.textContent = progress.learned.length;
}

resetProgressBtn.addEventListener("click", () => {
  if (!confirm("Reiniciar todo o progresso salvo neste navegador?")) return;
  progress = { attempts: 0, scoreSum: 0, streak: 0, learned: [] };
  saveProgress(progress);
  renderStats();
  renderCards();
  feedbackContainer.classList.add("hidden");
  feedbackPlaceholder.classList.remove("hidden");
});

// ---------------------------------------------------------------------------
// Onda decorativa no herói (puramente visual)
// ---------------------------------------------------------------------------
function drawHeroWave() {
  const canvas = document.getElementById("hero-wave");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
  }
  resize();
  window.addEventListener("resize", resize);

  const bars = 46;
  let t = 0;

  function frame() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const barWidth = w / bars;
    for (let i = 0; i < bars; i++) {
      const phase = i * 0.4 + t;
      const amp = (Math.sin(phase) * 0.35 + Math.sin(phase * 1.7) * 0.2 + 0.55);
      const barHeight = Math.max(4, amp * h * 0.75);
      ctx.fillStyle = i % 5 === 0 ? "#F2A541" : "rgba(43,103,119,0.55)";
      ctx.fillRect(i * barWidth + barWidth * 0.25, (h - barHeight) / 2, barWidth * 0.5, barHeight);
    }
    if (!reduceMotion) {
      t += 0.045;
      requestAnimationFrame(frame);
    }
  }
  frame();
}

// ---------------------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  populateLessonSelect();
  setTargetPhrase("Hello");
  renderStats();
  drawHeroWave();
});

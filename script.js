// ============================================
// GOENGLISH - COMPLETE APPLICATION
// ============================================

// Global App Object
const app = {
    // User Data
    userData: {
        name: 'Student',
        currentLevel: 'A1',
        xp: 0,
        streak: 0,
        lessonsCompleted: 0,
        wordsLearned: 0,
        minutesStudied: 0,
        completedLessons: [],
        achievements: [],
        dailyGoal: 0,
        lastStudyDate: new Date().toDateString()
    },

    // Settings
    settings: {
        theme: 'dark',
        soundEnabled: true,
        autoPlayAudio: true,
        audioSpeed: 1
    },

    // Current Page
    currentPage: 'dashboard',

    // Content Data
    content: {
        lessons: [
            {
                id: 'a1-alphabet',
                level: 'A1',
                title: 'Letters & Alphabet',
                description: 'Master the English alphabet and pronunciation',
                xpReward: 50,
                completed: false,
                content: `
                    <h4>The English Alphabet</h4>
                    <p>The English alphabet has 26 letters. Let's learn them all!</p>
                    <div class="alphabet-grid">
                        ${['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                            .map(letter => `<div class="alphabet-item"><strong>${letter}</strong> - /eɪ/ /${letter}/ Sound</div>`)
                            .join('')}
                    </div>
                    <p style="margin-top: 1rem;"><strong>Try:</strong> Say each letter aloud multiple times to practice pronunciation.</p>
                `
            },
            {
                id: 'a1-greetings',
                level: 'A1',
                title: 'Basic Greetings',
                description: 'Learn how to greet people in English',
                xpReward: 50,
                completed: false,
                content: `
                    <h4>Common Greetings</h4>
                    <div class="greeting-list">
                        <div class="greeting-item">
                            <strong>Hello</strong> - Olá
                            <button class="audio-btn" onclick="app.playAudio('Hello')">🔊 Listen</button>
                        </div>
                        <div class="greeting-item">
                            <strong>Hi</strong> - Oi
                            <button class="audio-btn" onclick="app.playAudio('Hi')">🔊 Listen</button>
                        </div>
                        <div class="greeting-item">
                            <strong>Good morning</strong> - Bom dia
                            <button class="audio-btn" onclick="app.playAudio('Good morning')">🔊 Listen</button>
                        </div>
                        <div class="greeting-item">
                            <strong>Good afternoon</strong> - Boa tarde
                            <button class="audio-btn" onclick="app.playAudio('Good afternoon')">🔊 Listen</button>
                        </div>
                        <div class="greeting-item">
                            <strong>Good evening</strong> - Boa noite
                            <button class="audio-btn" onclick="app.playAudio('Good evening')">🔊 Listen</button>
                        </div>
                        <div class="greeting-item">
                            <strong>How are you?</strong> - Como você está?
                            <button class="audio-btn" onclick="app.playAudio('How are you')">🔊 Listen</button>
                        </div>
                    </div>
                `
            },
            {
                id: 'a1-numbers',
                level: 'A1',
                title: 'Numbers 0-20',
                description: 'Learn basic numbers in English',
                xpReward: 50,
                completed: false,
                content: `
                    <h4>English Numbers</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: var(--bg-tertiary);">
                            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">Number</th>
                            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">English</th>
                            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">Português</th>
                        </tr>
                        ${[
                            {num: 0, en: 'Zero', pt: 'Zero'},
                            {num: 1, en: 'One', pt: 'Um'},
                            {num: 2, en: 'Two', pt: 'Dois'},
                            {num: 3, en: 'Three', pt: 'Três'},
                            {num: 4, en: 'Four', pt: 'Quatro'},
                            {num: 5, en: 'Five', pt: 'Cinco'},
                            {num: 10, en: 'Ten', pt: 'Dez'},
                            {num: 15, en: 'Fifteen', pt: 'Quinze'},
                            {num: 20, en: 'Twenty', pt: 'Vinte'}
                        ].map(n => `
                            <tr>
                                <td style="padding: 0.5rem; border: 1px solid var(--border-color); text-align: center;"><strong>${n.num}</strong></td>
                                <td style="padding: 0.5rem; border: 1px solid var(--border-color);">${n.en}</td>
                                <td style="padding: 0.5rem; border: 1px solid var(--border-color);">${n.pt}</td>
                            </tr>
                        `).join('')}
                    </table>
                `
            }
        ],

        grammar: [
            {
                id: 'grammar-to-be',
                level: 'A1',
                title: 'The Verb "To Be"',
                simple: 'The most important verb in English',
                detailed: 'The verb "to be" is fundamental in English. It means "ser" or "estar".',
                examples: [
                    { en: 'I am a student', pt: 'Eu sou um estudante' },
                    { en: 'You are happy', pt: 'Você está feliz' },
                    { en: 'He is a teacher', pt: 'Ele é um professor' }
                ]
            },
            {
                id: 'grammar-articles',
                level: 'A1',
                title: 'Articles: A, An, The',
                simple: 'Understanding English articles',
                detailed: 'Articles are small words that come before nouns.',
                examples: [
                    { en: 'a book (one book)', pt: 'um livro' },
                    { en: 'an apple (one apple)', pt: 'uma maçã' },
                    { en: 'the book (specific book)', pt: 'o livro' }
                ]
            },
            {
                id: 'grammar-pronouns',
                level: 'A1',
                title: 'Pronouns',
                simple: 'I, you, he, she, it, we, they',
                detailed: 'Pronouns replace nouns in sentences.',
                examples: [
                    { en: 'I like coffee', pt: 'Eu gosto de café' },
                    { en: 'He plays football', pt: 'Ele joga futebol' },
                    { en: 'They are students', pt: 'Eles são estudantes' }
                ]
            }
        ],

        vocabulary: [
            // Daily Life
            { id: 'vocab-hello', category: 'daily', word: 'Hello', translation: 'Olá', level: 'A1', example: 'Hello, how are you?' },
            { id: 'vocab-goodbye', category: 'daily', word: 'Goodbye', translation: 'Adeus', level: 'A1', example: 'Goodbye, see you tomorrow!' },
            { id: 'vocab-thank', category: 'daily', word: 'Thank you', translation: 'Obrigado', level: 'A1', example: 'Thank you very much!' },
            { id: 'vocab-please', category: 'daily', word: 'Please', translation: 'Por favor', level: 'A1', example: 'Please give me water.' },
            { id: 'vocab-yes', category: 'daily', word: 'Yes', translation: 'Sim', level: 'A1', example: 'Yes, I agree.' },
            { id: 'vocab-no', category: 'daily', word: 'No', translation: 'Não', level: 'A1', example: 'No, I don\'t like it.' },
            { id: 'vocab-sorry', category: 'daily', word: 'Sorry', translation: 'Desculpe', level: 'A1', example: 'Sorry, I was late.' },
            { id: 'vocab-excuse', category: 'daily', word: 'Excuse me', translation: 'Com licença', level: 'A1', example: 'Excuse me, where is the bathroom?' },

            // Family
            { id: 'vocab-mother', category: 'family', word: 'Mother', translation: 'Mãe', level: 'A1', example: 'My mother is a doctor.' },
            { id: 'vocab-father', category: 'family', word: 'Father', translation: 'Pai', level: 'A1', example: 'My father likes football.' },
            { id: 'vocab-sister', category: 'family', word: 'Sister', translation: 'Irmã', level: 'A1', example: 'My sister is studying.' },
            { id: 'vocab-brother', category: 'family', word: 'Brother', translation: 'Irmão', level: 'A1', example: 'My brother plays guitar.' },
            { id: 'vocab-brother', category: 'family', word: 'Grandmother', translation: 'Avó', level: 'A1', example: 'My grandmother is very kind.' },
            { id: 'vocab-grandfather', category: 'family', word: 'Grandfather', translation: 'Avô', level: 'A1', example: 'My grandfather is 80 years old.' },

            // Food
            { id: 'vocab-water', category: 'food', word: 'Water', translation: 'Água', level: 'A1', example: 'Please give me a glass of water.' },
            { id: 'vocab-food', category: 'food', word: 'Food', translation: 'Comida', level: 'A1', example: 'This food is delicious!' },
            { id: 'vocab-bread', category: 'food', word: 'Bread', translation: 'Pão', level: 'A1', example: 'I eat bread for breakfast.' },
            { id: 'vocab-apple', category: 'food', word: 'Apple', translation: 'Maçã', level: 'A1', example: 'An apple a day keeps the doctor away.' },
            { id: 'vocab-coffee', category: 'food', word: 'Coffee', translation: 'Café', level: 'A1', example: 'I drink coffee every morning.' },

            // Travel
            { id: 'vocab-airport', category: 'travel', word: 'Airport', translation: 'Aeroporto', level: 'A1', example: 'The airport is very busy.' },
            { id: 'vocab-hotel', category: 'travel', word: 'Hotel', translation: 'Hotel', level: 'A1', example: 'We stayed in a nice hotel.' },
            { id: 'vocab-train', category: 'travel', word: 'Train', translation: 'Trem', level: 'A1', example: 'The train is very fast.' },
            { id: 'vocab-bus', category: 'travel', word: 'Bus', translation: 'Ônibus', level: 'A1', example: 'I take the bus to work.' },
            { id: 'vocab-car', category: 'travel', word: 'Car', translation: 'Carro', level: 'A1', example: 'He drives a red car.' },

            // Work
            { id: 'vocab-work', category: 'work', word: 'Work', translation: 'Trabalho', level: 'A1', example: 'I work as an engineer.' },
            { id: 'vocab-job', category: 'work', word: 'Job', translation: 'Emprego', level: 'A1', example: 'I got a new job!' },
            { id: 'vocab-office', category: 'work', word: 'Office', translation: 'Escritório', level: 'A1', example: 'My office is on the 5th floor.' },
            { id: 'vocab-meeting', category: 'work', word: 'Meeting', translation: 'Reunião', level: 'A1', example: 'The meeting starts at 10 AM.' },
            { id: 'vocab-boss', category: 'work', word: 'Boss', translation: 'Chefe', level: 'A1', example: 'My boss is very nice.' },

            // Nature
            { id: 'vocab-tree', category: 'nature', word: 'Tree', translation: 'Árvore', level: 'A1', example: 'There are many trees in the park.' },
            { id: 'vocab-flower', category: 'nature', word: 'Flower', translation: 'Flor', level: 'A1', example: 'The flowers are beautiful.' },
            { id: 'vocab-sun', category: 'nature', word: 'Sun', translation: 'Sol', level: 'A1', example: 'The sun is shining today.' },
            { id: 'vocab-moon', category: 'nature', word: 'Moon', translation: 'Lua', level: 'A1', example: 'The moon is visible tonight.' },
            { id: 'vocab-star', category: 'nature', word: 'Star', translation: 'Estrela', level: 'A1', example: 'The stars are bright.' }
        ],

        verbs: [
            { id: 'verb-be', word: 'be', past: 'was/were', pastParticiple: 'been', type: 'irregular', meaning: 'ser/estar' },
            { id: 'verb-have', word: 'have', past: 'had', pastParticiple: 'had', type: 'irregular', meaning: 'ter' },
            { id: 'verb-do', word: 'do', past: 'did', pastParticiple: 'done', type: 'irregular', meaning: 'fazer' },
            { id: 'verb-go', word: 'go', past: 'went', pastParticiple: 'gone', type: 'irregular', meaning: 'ir' },
            { id: 'verb-see', word: 'see', past: 'saw', pastParticiple: 'seen', type: 'irregular', meaning: 'ver' },
            { id: 'verb-get', word: 'get', past: 'got', pastParticiple: 'got/gotten', type: 'irregular', meaning: 'obter' },
            { id: 'verb-make', word: 'make', past: 'made', pastParticiple: 'made', type: 'irregular', meaning: 'fazer' },
            { id: 'verb-take', word: 'take', past: 'took', pastParticiple: 'taken', type: 'irregular', meaning: 'pegar' },
            { id: 'verb-come', word: 'come', past: 'came', pastParticiple: 'come', type: 'irregular', meaning: 'vir' },
            { id: 'verb-think', word: 'think', past: 'thought', pastParticiple: 'thought', type: 'irregular', meaning: 'pensar' },
            { id: 'verb-walk', word: 'walk', past: 'walked', pastParticiple: 'walked', type: 'regular', meaning: 'caminhar' },
            { id: 'verb-talk', word: 'talk', past: 'talked', pastParticiple: 'talked', type: 'regular', meaning: 'falar' },
            { id: 'verb-play', word: 'play', past: 'played', pastParticiple: 'played', type: 'regular', meaning: 'jogar' },
            { id: 'verb-work', word: 'work', past: 'worked', pastParticiple: 'worked', type: 'regular', meaning: 'trabalhar' },
            { id: 'verb-live', word: 'live', past: 'lived', pastParticiple: 'lived', type: 'regular', meaning: 'viver' }
        ],

        realEnglish: [
            { phrase: "What's up?", meaning: 'Como vai?', formal: false, context: 'Greeting with friends' },
            { phrase: "How's it going?", meaning: 'Como está?', formal: false, context: 'Casual greeting' },
            { phrase: "I\'m gonna...", meaning: 'Vou...', formal: false, context: 'Future plans (informal)' },
            { phrase: "I wanna...", meaning: 'Quero...', formal: false, context: 'Desires (very informal)' },
            { phrase: "I gotta...", meaning: 'Tenho que...', formal: false, context: 'Obligations (informal)' },
            { phrase: 'Let me know', meaning: 'Me deixa saber', formal: false, context: 'Request for information' },
            { phrase: 'No worries', meaning: 'Sem problema', formal: false, context: 'Reassurance' },
            { phrase: 'Sounds good', meaning: 'Soa bem', formal: false, context: 'Agreement' },
            { phrase: 'My bad', meaning: 'Minha culpa', formal: false, context: 'Taking responsibility' },
            { phrase: 'What do you mean?', meaning: 'O que você quer dizer?', formal: false, context: 'Asking for clarification' }
        ],

        phrasalVerbs: [
            { phrase: 'get up', meaning: 'acordar/levantar', example: 'I get up at 6 AM.' },
            { phrase: 'wake up', meaning: 'acordar', example: 'Wake up! You\'re late for school.' },
            { phrase: 'look for', meaning: 'procurar', example: 'I\'m looking for my keys.' },
            { phrase: 'find out', meaning: 'descobrir', example: 'I found out the truth.' },
            { phrase: 'give up', meaning: 'desistir', example: 'Don\'t give up on your dreams.' },
            { phrase: 'put on', meaning: 'colocar (roupa)', example: 'Put on your jacket, it\'s cold.' },
            { phrase: 'turn on', meaning: 'ligar', example: 'Turn on the light, please.' },
            { phrase: 'turn off', meaning: 'desligar', example: 'Turn off the TV.' },
            { phrase: 'pick up', meaning: 'apanhar/pegar', example: 'Can you pick up the phone?' },
            { phrase: 'hang out', meaning: 'sair com amigos', example: 'Let\'s hang out this weekend.' }
        ],

        quizzes: [
            {
                id: 'quiz-greetings',
                title: 'Basic Greetings Quiz',
                level: 'A1',
                questions: [
                    {
                        question: 'What do you say when you meet someone?',
                        options: ['Goodbye', 'Hello', 'Good night', 'Sorry'],
                        correct: 1
                    },
                    {
                        question: 'How do you say "obrigado" in English?',
                        options: ['Please', 'Sorry', 'Thank you', 'Goodbye'],
                        correct: 2
                    },
                    {
                        question: 'What is the correct answer to "How are you?"',
                        options: ['I\'m fine', 'Goodbye', 'Hello', 'Thank you'],
                        correct: 0
                    }
                ]
            },
            {
                id: 'quiz-verbs',
                title: 'Irregular Verbs Quiz',
                level: 'A1',
                questions: [
                    {
                        question: 'What is the past tense of "go"?',
                        options: ['goed', 'went', 'gone', 'goes'],
                        correct: 1
                    },
                    {
                        question: 'Complete: I have _____ my homework.',
                        options: ['do', 'done', 'did', 'does'],
                        correct: 1
                    },
                    {
                        question: 'She _____ a teacher.',
                        options: ['are', 'am', 'is', 'be'],
                        correct: 2
                    }
                ]
            }
        ],

        achievements: [
            { id: 'ach-first', icon: '🌟', name: 'First Lesson', description: 'Complete your first lesson' },
            { id: 'ach-100words', icon: '📚', name: '100 Words', description: 'Learn 100 vocabulary words' },
            { id: 'ach-7streak', icon: '🔥', name: '7 Day Streak', description: 'Study 7 days in a row' },
            { id: 'ach-grammar', icon: '📖', name: 'Grammar Master', description: 'Complete all grammar lessons' },
            { id: 'ach-listening', icon: '🎧', name: 'Listening Master', description: 'Complete 20 listening exercises' },
            { id: 'ach-speaking', icon: '🗣', name: 'Speaking Champion', description: 'Complete 10 speaking exercises' },
            { id: 'ach-1000xp', icon: '⭐', name: '1000 XP', description: 'Earn 1000 XP' },
            { id: 'ach-30days', icon: '📅', name: '30 Day Challenge', description: 'Study for 30 days' },
            { id: 'ach-allverbs', icon: '⚡', name: 'Verb Master', description: 'Learn all major English verbs' }
        ]
    },

    // Initialize App
    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.updateDashboard();
        this.renderAllContent();
        this.checkStreak();
    },

    // Setup Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.goToPage(page);
            });
        });

        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Menu Toggle (Mobile)
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });

        // Search
        document.getElementById('globalSearch').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.search(e.target.value);
            }
        });

        // Settings
        document.getElementById('soundEnabled').addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.saveData();
        });

        document.getElementById('autoPlayAudio').addEventListener('change', (e) => {
            this.settings.autoPlayAudio = e.target.checked;
            this.saveData();
        });

        document.getElementById('audioSpeed').addEventListener('change', (e) => {
            this.settings.audioSpeed = parseFloat(e.target.value);
            this.saveData();
        });
    },

    // Page Navigation
    goToPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const page = document.getElementById(pageName);
        if (page) {
            page.classList.add('active');
            this.currentPage = pageName;
            document.getElementById('pageTitle').textContent = this.getPageTitle(pageName);

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

            // Close mobile menu
            document.querySelector('.sidebar').classList.remove('active');

            // Render page content
            this.renderPageContent(pageName);
        }
    },

    getPageTitle(pageName) {
        const titles = {
            dashboard: 'Dashboard',
            learn: 'Start Learning',
            grammar: 'Grammar',
            vocabulary: 'Vocabulary',
            verbs: 'English Verbs',
            pronunciation: 'Pronunciation',
            speaking: 'Speaking Practice',
            listening: 'Listening Practice',
            reading: 'Reading',
            writing: 'Writing Practice',
            realEnglish: 'Real English',
            phrasal: 'Phrasal Verbs',
            review: 'Review Mode',
            achievements: 'Achievements',
            profile: 'Profile',
            settings: 'Settings'
        };
        return titles[pageName] || 'GoEnglish';
    },

    // Theme Management
    setTheme(theme) {
        document.body.className = '';
        if (theme === 'light') document.body.classList.add('light-theme');
        if (theme === 'purple') document.body.classList.add('purple-theme');
        
        this.settings.theme = theme;
        this.saveData();

        // Update theme button text
        const emoji = theme === 'dark' ? '☀️' : theme === 'light' ? '💜' : '🌙';
        document.getElementById('themeToggle').textContent = emoji;
    },

    toggleTheme() {
        const themes = ['dark', 'light', 'purple'];
        const current = this.settings.theme;
        const currentIndex = themes.indexOf(current);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        this.setTheme(nextTheme);
    },

    applyTheme() {
        this.setTheme(this.settings.theme);
    },

    // Render Content
    renderPageContent(pageName) {
        switch(pageName) {
            case 'grammar':
                this.renderGrammar();
                break;
            case 'vocabulary':
                this.renderVocabulary();
                break;
            case 'verbs':
                this.renderVerbs();
                break;
            case 'pronunciation':
                this.renderPronunciation();
                break;
            case 'speaking':
                this.renderSpeaking();
                break;
            case 'listening':
                this.renderListening();
                break;
            case 'reading':
                this.renderReading();
                break;
            case 'writing':
                this.renderWriting();
                break;
            case 'realEnglish':
                this.renderRealEnglish();
                break;
            case 'phrasal':
                this.renderPhrasal();
                break;
            case 'achievements':
                this.renderAchievements();
                break;
            case 'profile':
                this.renderProfile();
                break;
        }
    },

    renderAllContent() {
        this.renderLessons();
        this.renderGrammar();
        this.renderVocabulary();
    },

    renderLessons() {
        const container = document.getElementById('lessonsList');
        if (!container) return;

        container.innerHTML = this.content.lessons.map(lesson => `
            <div class="lesson-item-full" onclick="app.startLesson('${lesson.id}')">
                <h4>${lesson.title}</h4>
                <p>${lesson.description}</p>
                <p class="text-accent">+${lesson.xpReward} XP</p>
            </div>
        `).join('');
    },

    renderGrammar() {
        const container = document.getElementById('grammarList');
        if (!container) return;

        const filtered = this.currentFilterLevel === 'all' 
            ? this.content.grammar 
            : this.content.grammar.filter(g => g.level === this.currentFilterLevel);

        container.innerHTML = filtered.map(grammar => `
            <div class="grammar-item" onclick="app.showGrammarDetail('${grammar.id}')">
                <h4>${grammar.title}</h4>
                <p>${grammar.simple}</p>
                <p class="text-muted">${grammar.level}</p>
            </div>
        `).join('');
    },

    renderVocabulary() {
        const container = document.getElementById('vocabularyGrid');
        if (!container) return;

        let filtered = this.content.vocabulary;
        if (this.currentFilterCategory && this.currentFilterCategory !== 'all') {
            filtered = filtered.filter(v => v.category === this.currentFilterCategory);
        }

        container.innerHTML = filtered.map(vocab => `
            <div class="vocab-card" onclick="app.showVocabDetail('${vocab.id}')">
                <h4>${vocab.word}</h4>
                <p>${vocab.translation}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
                    <em>"${vocab.example}"</em>
                </p>
                <p class="text-muted" style="margin-top: 0.5rem;">${vocab.level}</p>
            </div>
        `).join('');
    },

    renderVerbs() {
        const container = document.getElementById('verbsTable');
        if (!container) return;

        let filtered = this.content.verbs;
        if (this.currentVerbFilter && this.currentVerbFilter !== 'all') {
            filtered = filtered.filter(v => v.type === this.currentVerbFilter);
        }

        container.innerHTML = filtered.map(verb => `
            <div class="verb-card">
                <table>
                    <tr>
                        <th colspan="4" style="font-size: 1.1rem; text-align: left; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: white;">
                            ${verb.word.toUpperCase()}
                        </th>
                    </tr>
                    <tr>
                        <th>Base</th>
                        <th>Past</th>
                        <th>Past Participle</th>
                        <th>Meaning</th>
                    </tr>
                    <tr>
                        <td>${verb.word}</td>
                        <td>${verb.past}</td>
                        <td>${verb.pastParticiple}</td>
                        <td>${verb.meaning}</td>
                    </tr>
                </table>
            </div>
        `).join('');
    },

    renderPronunciation() {
        const container = document.getElementById('pronunciationList');
        if (!container) return;

        const sounds = [
            { sound: 'TH', description: 'Think, This, The' },
            { sound: 'R', description: 'Red, Rock, Run' },
            { sound: 'L', description: 'Love, Light, Like' },
            { sound: 'SH', description: 'She, Show, Ship' },
            { sound: 'CH', description: 'Chat, Check, Child' }
        ];

        container.innerHTML = sounds.map(s => `
            <div class="pronunciation-item">
                <h4>/${s.sound}/</h4>
                <p>${s.description}</p>
                <button class="audio-btn" onclick="app.playAudio('${s.sound} sound')">🔊 Listen</button>
            </div>
        `).join('');
    },

    renderSpeaking() {
        const container = document.getElementById('speakingScenarios');
        if (!container) return;

        const scenarios = [
            { title: 'Airport', dialogue: [
                { speaker: 'Agent', text: 'Good morning. How can I help you?' },
                { speaker: 'You', text: 'Hello, I need a ticket to New York.' }
            ]},
            { title: 'Restaurant', dialogue: [
                { speaker: 'Waiter', text: 'What would you like to order?' },
                { speaker: 'You', text: 'I\'ll have chicken and rice, please.' }
            ]},
            { title: 'Hotel', dialogue: [
                { speaker: 'Receptionist', text: 'Welcome to our hotel. Do you have a reservation?' },
                { speaker: 'You', text: 'Yes, under the name John Smith.' }
            ]}
        ];

        container.innerHTML = scenarios.map(scenario => `
            <div class="speaking-scenario">
                <h4>${scenario.title}</h4>
                <div class="dialogue">
                    ${scenario.dialogue.map(line => `
                        <div class="dialogue-line">
                            <div class="speaker">${line.speaker}</div>
                            <div class="dialogue-text">${line.text}</div>
                        </div>
                    `).join('')}
                </div>
                <button class="audio-btn" onclick="app.playAudio('${scenario.title} dialogue')">🔊 Listen</button>
            </div>
        `).join('');
    },

    renderListening() {
        const container = document.getElementById('listeningExercises');
        if (!container) return;

        const exercises = [
            {
                instruction: 'Listen and answer: What is the person\'s name?',
                options: ['John', 'Jane', 'James', 'Jessica']
            },
            {
                instruction: 'Listen and answer: What time is it?',
                options: ['10:30', '10:15', '10:45', '10:00']
            },
            {
                instruction: 'Listen and answer: What is the weather like?',
                options: ['Sunny', 'Rainy', 'Cloudy', 'Snowy']
            }
        ];

        container.innerHTML = exercises.map((ex, i) => `
            <div class="listening-exercise">
                <h4>Exercise ${i + 1}</h4>
                <button class="play-btn" onclick="app.playAudio('listening exercise ${i + 1}')">▶️ Listen</button>
                <div class="listening-question">
                    <p class="question-text">${ex.instruction}</p>
                    <div class="options">
                        ${ex.options.map((opt, j) => `
                            <button class="option-btn" onclick="app.checkAnswer(this, ${j === 0})">
                                ${String.fromCharCode(65 + j)}) ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderReading() {
        const container = document.getElementById('readingTexts');
        if (!container) return;

        const texts = [
            {
                title: 'My Daily Routine',
                text: 'My name is Tom. I wake up at 7 AM every day. I take a shower and have breakfast. Then I go to work at 8:30 AM. I work as an engineer. I like my job very much. I have lunch at 12:00 PM. After work, I play football with my friends. I come home at 6 PM and have dinner. In the evening, I read books or watch TV. I go to bed at 10 PM.',
                level: 'A1'
            },
            {
                title: 'A Day at the Beach',
                text: 'Last Sunday, I went to the beach with my family. The weather was beautiful. We played football on the sand. My sister collected shells. We had a picnic. After lunch, we went swimming. The water was very cold but nice. We stayed until sunset. It was a wonderful day. I will go again next weekend.',
                level: 'A1'
            }
        ];

        container.innerHTML = texts.map((t, i) => `
            <div class="reading-text">
                <h4>${t.title}</h4>
                <div class="reading-text-content">
                    ${t.text}
                </div>
                <div class="reading-questions">
                    <button class="btn btn-secondary" onclick="app.showReading('${i}')">Answer Questions</button>
                </div>
            </div>
        `).join('');
    },

    renderWriting() {
        const container = document.getElementById('writingExercises');
        if (!container) return;

        const exercises = [
            {
                type: 'complete',
                title: 'Complete the Sentence',
                instruction: 'Complete: I like to _____ in the park.',
                answer: 'play'
            },
            {
                type: 'translate',
                title: 'Translate to English',
                instruction: 'Translate: "Meu nome é João"',
                answer: 'My name is Joao'
            },
            {
                type: 'organize',
                title: 'Organize the Words',
                instruction: 'Organize: is / teacher / a / She',
                answer: 'She is a teacher'
            }
        ];

        container.innerHTML = exercises.map((ex, i) => `
            <div class="writing-exercise">
                <h4>${ex.title}</h4>
                <p>${ex.instruction}</p>
                <textarea class="exercise-input" placeholder="Your answer..."></textarea>
                <button class="btn btn-primary" onclick="app.checkWriting(this, '${ex.answer}')">Check Answer</button>
            </div>
        `).join('');
    },

    renderRealEnglish() {
        const container = document.getElementById('realEnglishList');
        if (!container) return;

        container.innerHTML = this.content.realEnglish.map(re => `
            <div class="real-english-item">
                <h4>"${re.phrase}"</h4>
                <p><strong>Meaning:</strong> ${re.meaning}</p>
                <p><strong>Context:</strong> ${re.context}</p>
                <p><strong>Formality:</strong> ${re.formal ? 'Formal' : 'Informal'}</p>
                <button class="audio-btn" onclick="app.playAudio('${re.phrase}')">🔊 Listen</button>
            </div>
        `).join('');
    },

    renderPhrasal() {
        const container = document.getElementById('phrasalList');
        if (!container) return;

        container.innerHTML = this.content.phrasalVerbs.map(pv => `
            <div class="phrasal-item">
                <h4>${pv.phrase}</h4>
                <p><strong>Meaning:</strong> ${pv.meaning}</p>
                <p><strong>Example:</strong> <em>"${pv.example}"</em></p>
                <button class="audio-btn" onclick="app.playAudio('${pv.phrase}')">🔊 Listen</button>
            </div>
        `).join('');
    },

    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;

        container.innerHTML = this.content.achievements.map(ach => {
            const unlocked = this.userData.achievements.includes(ach.id);
            return `
                <div class="achievement-card ${unlocked ? 'unlocked' : ''}">
                    <div class="achievement-icon">${ach.icon}</div>
                    <p class="achievement-name">${ach.name}</p>
                    <p class="achievement-desc">${ach.description}</p>
                </div>
            `;
        }).join('');
    },

    renderProfile() {
        document.getElementById('profileName').textContent = this.userData.name;
        document.getElementById('profileLevel').textContent = this.userData.currentLevel + ' - Level';
        document.getElementById('profileXP').textContent = this.userData.xp;
        document.getElementById('profileLessons').textContent = this.userData.lessonsCompleted;
        document.getElementById('profileWords').textContent = this.userData.wordsLearned;
        document.getElementById('profileStreak').textContent = this.userData.streak;

        const achievementsContainer = document.getElementById('profileAchievements');
        achievementsContainer.innerHTML = this.content.achievements
            .filter(ach => this.userData.achievements.includes(ach.id))
            .map(ach => `
                <div class="achievement-card unlocked">
                    <div class="achievement-icon">${ach.icon}</div>
                    <p class="achievement-name">${ach.name}</p>
                </div>
            `).join('');

        document.getElementById('userName').value = this.userData.name;
    },

    // Update Dashboard
    updateDashboard() {
        document.getElementById('dashboardUserName').textContent = this.userData.name;
        document.getElementById('sidebarUserName').textContent = this.userData.name;
        document.getElementById('sidebarUserLevel').textContent = this.userData.currentLevel;

        document.getElementById('statLevel').textContent = this.userData.currentLevel + ' - Beginner';
        document.getElementById('statXP').textContent = this.userData.xp;
        document.getElementById('statStreak').textContent = this.userData.streak + ' days';
        document.getElementById('statLessons').textContent = this.userData.lessonsCompleted;
        document.getElementById('statWords').textContent = this.userData.wordsLearned;
        document.getElementById('statMinutes').textContent = this.userData.minutesStudied;

        const progress = Math.min((this.userData.xp / 5000) * 100, 100);
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressPercent').textContent = Math.floor(progress) + '%';

        // Daily Goal
        document.getElementById('goalFill').style.width = (this.userData.dailyGoal / 5) * 100 + '%';
        document.getElementById('goalCount').textContent = this.userData.dailyGoal;

        // Recent Lessons
        const recentContainer = document.getElementById('recentLessons');
        const recent = this.content.lessons.filter(l => this.userData.completedLessons.includes(l.id)).slice(-3);
        recentContainer.innerHTML = recent.length > 0 
            ? recent.map(l => `<div class="lesson-item" onclick="app.startLesson('${l.id}')">${l.title}</div>`).join('')
            : '<p class="empty-state">No lessons completed yet</p>';

        // Recent Achievements
        const achContainer = document.getElementById('recentAchievements');
        const unlockedAchs = this.content.achievements.filter(a => this.userData.achievements.includes(a.id)).slice(-3);
        achContainer.innerHTML = unlockedAchs.length > 0
            ? unlockedAchs.map(a => `<div class="achievement-item">${a.icon} ${a.name}</div>`).join('')
            : '<p class="empty-state">No achievements yet</p>';

        // Recommended Lesson
        const nextLesson = this.content.lessons.find(l => !this.userData.completedLessons.includes(l.id));
        if (nextLesson) {
            document.getElementById('recommendedTitle').textContent = nextLesson.title;
            document.getElementById('recommendedDesc').textContent = nextLesson.description;
        }
    },

    // Filters
    currentFilterLevel: 'all',
    currentFilterCategory: 'all',
    currentVerbFilter: 'all',

    filterByLevel(level, button) {
        this.currentFilterLevel = level;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        this.renderGrammar();
    },

    filterByCategory(category, button) {
        this.currentFilterCategory = category;
        document.querySelectorAll('.vocab-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        this.renderVocabulary();
    },

    filterVerbs(type, button) {
        this.currentVerbFilter = type;
        document.querySelectorAll('.verbs-filter .tab-btn').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        this.renderVerbs();
    },

    // Lesson Management
    startLesson(lessonId) {
        const lesson = this.content.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        const modal = document.getElementById('contentModal');
        const body = document.getElementById('modalBody');
        
        body.innerHTML = `
            <h3>${lesson.title}</h3>
            ${lesson.content}
            <button class="btn btn-primary" style="margin-top: 1rem;" onclick="app.completeLesson('${lessonId}')">
                ✓ Mark as Complete
            </button>
        `;

        modal.classList.add('active');
    },

    completeLesson(lessonId) {
        if (!this.userData.completedLessons.includes(lessonId)) {
            this.userData.completedLessons.push(lessonId);
            this.userData.lessonsCompleted++;
            this.userData.xp += 50;
            this.userData.dailyGoal = Math.min(this.userData.dailyGoal + 1, 5);
            this.userData.wordsLearned += 5;
            this.userData.minutesStudied += 10;

            this.checkAchievements();
            this.saveData();
            this.updateDashboard();
            this.closeModal();

            alert('🎉 Lesson completed! You earned 50 XP!');
        } else {
            alert('You already completed this lesson!');
        }
    },

    selectLevel(level) {
        this.userData.currentLevel = level;
        this.saveData();
        this.updateDashboard();
        const filtered = this.content.lessons.filter(l => l.level === level);
        const container = document.getElementById('lessonsList');
        container.innerHTML = filtered.map(lesson => `
            <div class="lesson-item-full" onclick="app.startLesson('${lesson.id}')">
                <h4>${lesson.title}</h4>
                <p>${lesson.description}</p>
                <p class="text-accent">+${lesson.xpReward} XP</p>
            </div>
        `).join('');
    },

    // Show Details
    showGrammarDetail(grammarId) {
        const grammar = this.content.grammar.find(g => g.id === grammarId);
        if (!grammar) return;

        const modal = document.getElementById('contentModal');
        const body = document.getElementById('modalBody');

        body.innerHTML = `
            <h3>${grammar.title}</h3>
            <p><strong>${grammar.detailed}</strong></p>
            <h4 style="margin-top: 1rem; color: var(--accent-primary);">Examples:</h4>
            ${grammar.examples.map(ex => `
                <div class="example">
                    <div class="example-en">${ex.en}</div>
                    <div class="example-pt">${ex.pt}</div>
                </div>
            `).join('')}
            <button class="btn btn-primary" style="margin-top: 1rem;" onclick="app.closeModal()">Close</button>
        `;

        modal.classList.add('active');
    },

    showVocabDetail(vocabId) {
        const vocab = this.content.vocabulary.find(v => v.id === vocabId);
        if (!vocab) return;

        const modal = document.getElementById('contentModal');
        const body = document.getElementById('modalBody');

        body.innerHTML = `
            <h3>${vocab.word}</h3>
            <p><strong>Tradução:</strong> ${vocab.translation}</p>
            <p><strong>Nível:</strong> ${vocab.level}</p>
            <p><strong>Exemplo:</strong> <em>"${vocab.example}"</em></p>
            <button class="audio-btn" onclick="app.playAudio('${vocab.word}')">🔊 Listen</button>
            <button class="btn btn-primary" style="margin-top: 1rem;" onclick="app.closeModal()">Close</button>
        `;

        modal.classList.add('active');
    },

    // Search
    search(query) {
        const results = [];
        const q = query.toLowerCase();

        // Search vocabulary
        results.push(...this.content.vocabulary.filter(v => 
            v.word.toLowerCase().includes(q) || v.translation.toLowerCase().includes(q)
        ));

        // Search phrasal verbs
        results.push(...this.content.phrasalVerbs.filter(pv => 
            pv.phrase.toLowerCase().includes(q)
        ));

        // Search grammar
        results.push(...this.content.grammar.filter(g => 
            g.title.toLowerCase().includes(q)
        ));

        alert(`Found ${results.length} result(s) for "${query}"`);
    },

    // Audio Playback
    playAudio(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = this.settings.audioSpeed;
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Speech synthesis not supported');
        }
    },

    // Quiz & Interactive
    checkAnswer(button, isCorrect) {
        if (isCorrect) {
            button.classList.add('correct');
            this.userData.xp += 10;
            this.userData.dailyGoal = Math.min(this.userData.dailyGoal + 1, 5);
        } else {
            button.classList.add('incorrect');
        }
        button.disabled = true;
        this.saveData();
        this.updateDashboard();
    },

    checkWriting(button, correctAnswer) {
        const input = button.previousElementSibling;
        const userAnswer = input.value.trim().toLowerCase();
        const correct = correctAnswer.toLowerCase();

        if (userAnswer === correct || userAnswer.includes(correct.split(' ')[0])) {
            alert('✓ Correct!');
            this.userData.xp += 15;
            this.userData.dailyGoal = Math.min(this.userData.dailyGoal + 1, 5);
        } else {
            alert(`✗ Incorrect. Correct answer: ${correctAnswer}`);
        }
        this.saveData();
        this.updateDashboard();
    },

    // Modal Control
    closeModal() {
        document.getElementById('contentModal').classList.remove('active');
    },

    closeQuiz() {
        document.getElementById('quizModal').classList.remove('active');
    },

    // Achievements
    checkAchievements() {
        // First Lesson
        if (this.userData.lessonsCompleted === 1 && !this.userData.achievements.includes('ach-first')) {
            this.userData.achievements.push('ach-first');
            alert('🏆 Achievement Unlocked: First Lesson!');
        }

        // 100 Words
        if (this.userData.wordsLearned >= 100 && !this.userData.achievements.includes('ach-100words')) {
            this.userData.achievements.push('ach-100words');
            alert('🏆 Achievement Unlocked: 100 Words!');
        }

        // 1000 XP
        if (this.userData.xp >= 1000 && !this.userData.achievements.includes('ach-1000xp')) {
            this.userData.achievements.push('ach-1000xp');
            alert('🏆 Achievement Unlocked: 1000 XP!');
        }
    },

    // Streak Management
    checkStreak() {
        const today = new Date().toDateString();
        if (this.userData.lastStudyDate !== today) {
            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
            if (this.userData.lastStudyDate === yesterday) {
                this.userData.streak++;
            } else {
                this.userData.streak = 1;
            }
            this.userData.lastStudyDate = today;
        }

        // 7 Day Streak Achievement
        if (this.userData.streak === 7 && !this.userData.achievements.includes('ach-7streak')) {
            this.userData.achievements.push('ach-7streak');
            alert('🏆 Achievement Unlocked: 7 Day Streak!');
        }

        // 30 Day Challenge
        if (this.userData.streak === 30 && !this.userData.achievements.includes('ach-30days')) {
            this.userData.achievements.push('ach-30days');
            alert('🏆 Achievement Unlocked: 30 Day Challenge!');
        }

        this.saveData();
    },

    // Settings
    saveName() {
        const name = document.getElementById('userName').value.trim();
        if (name) {
            this.userData.name = name;
            this.saveData();
            this.updateDashboard();
            alert('Name saved!');
        }
    },

    exportData() {
        const data = JSON.stringify(this.userData, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'goenglish-progress.json';
        a.click();
    },

    resetProgress() {
        if (confirm('Are you sure? This will reset all your progress!')) {
            this.userData = {
                name: 'Student',
                currentLevel: 'A1',
                xp: 0,
                streak: 0,
                lessonsCompleted: 0,
                wordsLearned: 0,
                minutesStudied: 0,
                completedLessons: [],
                achievements: [],
                dailyGoal: 0,
                lastStudyDate: new Date().toDateString()
            };
            this.saveData();
            this.updateDashboard();
            alert('Progress reset!');
        }
    },

    // Data Management
    saveData() {
        const data = {
            userData: this.userData,
            settings: this.settings
        };
        localStorage.setItem('goenglish_data', JSON.stringify(data));
    },

    loadData() {
        const stored = localStorage.getItem('goenglish_data');
        if (stored) {
            const data = JSON.parse(stored);
            this.userData = { ...this.userData, ...data.userData };
            this.settings = { ...this.settings, ...data.settings };
        }
    }
};

// Initialize App on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Continue Studying Button
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('continueStudyBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            const nextLesson = app.content.lessons.find(l => !app.userData.completedLessons.includes(l.id));
            if (nextLesson) {
                app.startLesson(nextLesson.id);
            } else {
                alert('You\'ve completed all lessons! Great job! 🎉');
            }
        });
    }
});

console.log("Portfolio Loaded");

/* ── Theme Toggle ── */
const themeToggleButton = document.querySelector('.theme-toggle');
const themeIcon = themeToggleButton?.querySelector('i');

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);

    if (themeToggleButton) {
        themeToggleButton.setAttribute('data-active', theme === 'dark');
        themeToggleButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        themeToggleButton.setAttribute('aria-pressed', String(theme === 'dark'));
    }

    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    localStorage.setItem('theme', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

initTheme();

/* ── Contact Form (Supabase) ── */
const SUPABASE_URL = 'https://azbleaxqsmxznuicbnii.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_LXxPRqpBxGqLVAfst9CALg_LxZ1vSln';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function kirimPesanSupabase(event) {
    event.preventDefault();

    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const subjekInput = document.getElementById('subjek');
    const pesanInput = document.getElementById('pesan');
    const btnSubmit = document.getElementById('btn-submit');
    const statusText = document.getElementById('form-status');

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const subjek = subjekInput.value.trim();
    const pesan = pesanInput.value.trim();

    if (!nama || !email || !subjek || !pesan) return;

    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Sending...';
    statusText.textContent = '';
    statusText.className = 'form-status';

    const { error } = await supabaseClient
        .from('pesan_kontak')
        .insert([{ nama: nama, email: email, subjek: subjek, pesan: pesan }]);

    if (error) {
        console.error('Supabase Error:', error);
        statusText.textContent = 'Gagal mengirim pesan. Silakan coba lagi.';
        statusText.classList.add('error');
    } else {
        statusText.textContent = 'Terima kasih! Pesan kamu sudah terkirim.';
        statusText.classList.add('success');
        namaInput.value = '';
        emailInput.value = '';
        subjekInput.value = '';
        pesanInput.value = '';
    }

    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Submit Form';
}

/* ── Image Modal ── */
function openImage(src) {
    document.getElementById('imageModal').style.display = 'flex';
    document.getElementById('modalImage').src = src;
}

function closeImage() {
    document.getElementById('imageModal').style.display = 'none';
}

/* ── Skill Detail Modal ── */
const skillsData = {
    javascript: {
        title: 'JavaScript',
        badge: 'LANGUAGE & WEB',
        iconClass: 'js-icon',
        iconHtml: '<i class="fa-brands fa-js"></i>',
        level: 85,
        description: 'Bahasa pemrograman utama untuk membangun interaktivitas halaman web modern, manipulasi DOM, event handling, serta integrasi data asynchronous dengan API maupun backend seperti Supabase.',
        useCases: [
            'Membangun interaksi dinamis, filter proyek, modal preview, dan validasi form di web portofolio',
            'Menghubungkan form kontak & aplikasi web langsung ke database Supabase secara realtime'
        ]
    },
    php: {
        title: 'PHP',
        badge: 'BACKEND LANGUAGE',
        iconClass: 'php-icon',
        iconHtml: '<i class="fa-brands fa-php"></i>',
        level: 80,
        description: 'Bahasa pemrograman sisi server yang banyak digunakan untuk pengembangan aplikasi web dinamis, pengelolaan autentikasi pengguna, logika bisnis, serta pemrosesan data terhubung basis data.',
        useCases: [
            'Mengembangkan logika backend aplikasi web dan manajemen data berbasis form',
            'Menjadi fondasi utama pengembangan aplikasi berbasis framework Laravel'
        ]
    },
    tailwind: {
        title: 'Tailwind CSS',
        badge: 'CSS FRAMEWORK',
        iconClass: 'tw-icon',
        iconHtml: '<i class="fa-solid fa-wind"></i>',
        level: 88,
        description: 'Framework CSS utility-first yang mempercepat pembuatan antarmuka responsif, konsisten, dan modern langsung di markup tanpa harus menulis banyak aturan CSS terpisah.',
        useCases: [
            'Menyusun layout responsif mobile-first dengan spacing, warna, dan tipografi yang konsisten',
            'Mempercepat pembuatan kartu, navbar, dan komponen UI modern'
        ]
    },
    laravel: {
        title: 'Laravel',
        badge: 'PHP MVC FRAMEWORK',
        iconClass: 'laravel-icon',
        iconHtml: '<i class="fa-brands fa-laravel"></i>',
        level: 82,
        description: 'Framework PHP berarsitektur MVC (Model-View-Controller) yang menyediakan struktur rapi untuk routing, autentikasi, ORM Eloquent, validasi, serta pengelolaan dashboard aplikasi web.',
        useCases: [
            'Membangun aplikasi web terstruktur dengan sistem autentikasi dan hak akses pengguna',
            'Mengelola data CRUD serta panel admin secara efisien'
        ]
    },
    mysql: {
        title: 'MySQL',
        badge: 'RELATIONAL DATABASE',
        iconClass: 'mysql-icon',
        iconHtml: '<i class="fa-solid fa-database"></i>',
        level: 78,
        description: 'Sistem manajemen basis data relasional (RDBMS) untuk merancang skema tabel, relasi antar entitas, query SQL, serta menyimpan data aplikasi secara terstruktur dan aman.',
        useCases: [
            'Merancang tabel dan relasi data untuk aplikasi web serta sistem informasi',
            'Melakukan query penyimpanan, pembaruan, dan pengambilan data terstruktur'
        ]
    },
    java: {
        title: 'Java',
        badge: 'OOP & DESKTOP',
        iconClass: 'java-icon',
        iconHtml: '<i class="fa-brands fa-java"></i>',
        level: 75,
        description: 'Bahasa pemrograman berorientasi objek (OOP) yang kuat untuk melatih struktur kode modular, pewarisan/enkapsulasi, logika algoritma, dan pengembangan aplikasi.',
        useCases: [
            'Menerapkan konsep Object-Oriented Programming (OOP) pada tugas kuliah dan aplikasi',
            'Melatih logika pemrograman terstruktur dan pemecahan masalah'
        ]
    },
    firebase: {
        title: 'Firebase',
        badge: 'BACKEND AS A SERVICE',
        iconClass: 'firebase-icon',
        iconHtml: '<i class="fa-solid fa-fire"></i>',
        level: 70,
        description: 'Platform pengembangan aplikasi dari Google yang menyediakan layanan autentikasi pengguna, database realtime, dan dukungan cloud untuk mempercepat pengembangan fitur aplikasi.',
        useCases: [
            'Mengelola autentikasi pengguna dan penyimpanan data aplikasi',
            'Mendukung fitur sinkronisasi data secara praktis'
        ]
    },
    kotlin: {
        title: 'Kotlin',
        badge: 'MOBILE DEVELOPMENT',
        iconClass: 'kotlin-icon',
        iconHtml: '<i class="fa-solid fa-k"></i>',
        level: 72,
        description: 'Bahasa pemrograman modern yang ringkas dan aman untuk pengembangan aplikasi Android native, dengan dukungan penuh terhadap komponen UI, navigasi, dan integrasi data.',
        useCases: [
            'Mengembangkan aplikasi mobile seperti marketplace barang bekas mahasiswa',
            'Menghubungkan antarmuka aplikasi Android dengan layanan backend/database'
        ]
    },
    nodejs: {
        title: 'Node.js',
        badge: 'RUNTIME ENVIRONMENT',
        iconClass: 'node-icon',
        iconHtml: '<i class="fa-brands fa-node"></i>',
        level: 68,
        description: 'Runtime environment berbasis JavaScript untuk menjalankan kode di sisi server, membangun API, mengelola dependensi proyek, dan mengembangkan aplikasi full-stack.',
        useCases: [
            'Menjalankan tooling pengembangan web modern dan skrip otomatisasi',
            'Membangun layanan sisi server serta integrasi API berbasis JavaScript'
        ]
    },
    figma: {
        title: 'Figma',
        badge: 'UI/UX & PROTOTYPING',
        iconClass: 'figma-icon',
        iconHtml: '<i class="fa-brands fa-figma"></i>',
        level: 90,
        description: 'Aplikasi desain antarmuka dan prototyping kolaboratif untuk merancang wireframe, design system, alur pengguna (user flow), serta prototype interaktif sebelum masuk tahap coding.',
        useCases: [
            'Merancang desain UI/UX kompetisi seperti proyek CERIA+ dan konsep SecondLife',
            'Membuat wireframe, komponen desain, dan prototype alur aplikasi'
        ]
    }
};

const skillModal = document.getElementById('skillModal');
const skillModalTitle = document.getElementById('skillModalTitle');
const skillModalBadge = document.getElementById('skillModalBadge');
const skillModalIcon = document.getElementById('skillModalIcon');
const skillModalDesc = document.getElementById('skillModalDesc');
const skillModalUseCases = document.getElementById('skillModalUseCases');
const skillModalLevelText = document.getElementById('skillModalLevelText');
const skillModalLevelBar = document.getElementById('skillModalLevelBar');

function openSkillModal(skillKey) {
    const data = skillsData[skillKey];
    if (!data || !skillModal) return;

    skillModalTitle.textContent = data.title;
    skillModalBadge.textContent = data.badge;
    skillModalIcon.className = `skill-modal-icon ${data.iconClass}`;
    skillModalIcon.innerHTML = data.iconHtml;
    skillModalDesc.textContent = data.description;
    skillModalLevelText.textContent = `${data.level}%`;

    skillModalUseCases.innerHTML = data.useCases
        .map(item => `<li>${item}</li>`)
        .join('');

    skillModal.style.display = 'flex';
    skillModalLevelBar.style.width = '0%';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            skillModalLevelBar.style.width = `${data.level}%`;
        });
    });
}

function closeSkillModal() {
    if (!skillModal) return;
    skillModal.style.display = 'none';
    if (skillModalLevelBar) skillModalLevelBar.style.width = '0%';
}

document.querySelectorAll('.skill-card[data-skill]').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', () => {
        openSkillModal(card.dataset.skill);
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSkillModal(card.dataset.skill);
        }
    });
});

window.addEventListener('click', (event) => {
    const imageModal = document.getElementById('imageModal');
    if (event.target === imageModal) closeImage();
    if (event.target === skillModal) closeSkillModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImage();
        closeSkillModal();
    }
});

/* ── Typing Effect ── */
const typedEl = document.getElementById('typedText');
const phrases = ['Web Solutions.', 'Mobile Apps.', 'UI/UX Design.', 'Full-Stack Apps.'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typedEl) return;

    const current = phrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();

/* ── Scroll Progress Bar ── */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
}, { passive: true });

/* ── Back to Top ── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Mobile Menu ── */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

/* ── Active Nav Link on Scroll ── */
const sections = document.querySelectorAll('section[id], header.hero');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height && id) {
            navLinkEls.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Counter Animation ── */
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

/* ── Skill Bar Animation ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.dataset.level;
            entry.target.style.width = level + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillFills.forEach(bar => skillObserver.observe(bar));

/* ── Project Filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            const show = filter === 'all' || categories.includes(filter);
            card.classList.toggle('hidden', !show);

            if (show) {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = '';
            }
        });
    });
});


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

/* ── WhatsApp Form ── */
function sendWA() {
    const nama = document.getElementById('nama').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    if (!nama || !pesan) {
        alert("Mohon isi nama dan pesan Anda.");
        return;
    }

    const text = `Halo, nama saya ${nama}.%0A%0A${pesan}`;
    window.open(`https://wa.me/6282199600742?text=${text}`, '_blank');
}

/* ── Image Modal ── */
function openImage(src) {
    document.getElementById('imageModal').style.display = 'flex';
    document.getElementById('modalImage').src = src;
}

function closeImage() {
    document.getElementById('imageModal').style.display = 'none';
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) closeImage();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeImage();
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

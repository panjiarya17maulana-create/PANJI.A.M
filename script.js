
console.log("Portfolio Loaded");

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
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
}

initTheme();

function sendWA() {
    const nama = document.getElementById('nama').value;
    const pesan = document.getElementById('pesan').value;

    if (!nama || !pesan) {
        alert("Mohon isi nama dan pesan Anda.");
        return;
    }

    const noWA = "6282199600742"; // Format number without plus sign
    const text = `Halo, nama saya ${nama}.%0A%0A${pesan}`;

    // Redirect to WhatsApp API
    window.open(`https://wa.me/${noWA}?text=${text}`, '_blank');
}
function openImage(src) {

    document.getElementById("imageModal").style.display = "flex";

    document.getElementById("modalImage").src = src;

}

function closeImage() {

    document.getElementById("imageModal").style.display = "none";

}

window.onclick = function (event) {

    let modal = document.getElementById("imageModal");

    if (event.target === modal) {

        closeImage();

    }

}

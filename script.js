
console.log("Portfolio Loaded");

function sendWA() {
    const nama = document.getElementById('nama').value;
    const pesan = document.getElementById('pesan').value;
    
    if(!nama || !pesan) {
        alert("Mohon isi nama dan pesan Anda.");
        return;
    }
    
    const noWA = "6282199600742"; // Format number without plus sign
    const text = `Halo, nama saya ${nama}.%0A%0A${pesan}`;
    
    // Redirect to WhatsApp API
    window.open(`https://wa.me/${noWA}?text=${text}`, '_blank');
}

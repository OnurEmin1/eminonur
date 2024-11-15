// Učitavanje broja novčića iz localStorage (ako želiš da prikažeš broj novčića, ali se neće trošiti)
let coins = parseInt(localStorage.getItem('coins')) || 0;
const coinsDisplay = document.getElementById('coinsDisplay');

// Funkcija za ažuriranje broja novčića na ekranu
function updateCoinsDisplay() {
    coinsDisplay.textContent = `Coins: ${coins}`;
    localStorage.setItem('coins', coins); // Čuvanje novčića u localStorage
}

// Funkcija za kupovinu života (besplatno)
document.getElementById('DARK-BLUE cube').addEventListener('click', function() {
    // Ovdje nema smanjenja novčića, jer je besplatno
    alert('You bought for free!');
    updateCoinsDisplay(); // Ažuriraj prikaz novčića (ako želiš da prikazuješ broj)
});

// Funkcija za kupovinu brzine (besplatno)
document.getElementById('ORANGE cube').addEventListener('click', function() {
    // Ovdje nema smanjenja novčića, jer je besplatno
    alert('You bought for free!');
    updateCoinsDisplay(); // Ažuriraj prikaz novčića (ako želiš da prikazuješ broj)
});

// Inicijalno ažuriraj prikaz novčića
updateCoinsDisplay();

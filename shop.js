// Učitavanje broja novčića iz localStorage
let coins = parseInt(localStorage.getItem('coins')) || 100;
const coinsDisplay = document.getElementById('coinsDisplay');

// Funkcija za ažuriranje broja novčića na ekranu
function updateCoinsDisplay() {
    coinsDisplay.textContent = `Coins: ${coins}`;
    localStorage.setItem('coins', coins); // Čuvanje novčića u localStorage
}

// Funkcija za kupovinu života
document.getElementById('AddHeart').addEventListener('click', function() {
    if (coins >= 50) {
        coins -= 50; // Smanji broj novčića za 50
        alert('You bought a life!');
        updateCoinsDisplay(); // Ažuriraj prikaz novčića
    } else {
        alert('Not enough coins!');
    }
});

// Funkcija za kupovinu brzine
document.getElementById('SuperSpeed').addEventListener('click', function() {
    if (coins >= 30) {
        coins -= 30; // Smanji broj novčića za 30
        alert('You bought speed!');
        updateCoinsDisplay(); // Ažuriraj prikaz novčića
    } else {
        alert('Not enough coins!');
    }
});

// Inicijalno ažuriraj prikaz novčića
updateCoinsDisplay();

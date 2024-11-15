// Učitavanje broja novčića iz localStorage (ako želiš da prikažeš broj novčića, ali se neće trošiti)
let coins = parseInt(localStorage.getItem('coins')) || 0;
const coinsDisplay = document.getElementById('coinsDisplay');

// Funkcija za ažuriranje broja novčića na ekranu
function updateCoinsDisplay() {
    coinsDisplay.textContent = `Coins: ${coins}`;
    localStorage.setItem('coins', coins); // Čuvanje novčića u localStorage
}

// Funkcija za kupovinu tamno plave kocke (besplatno)
document.getElementById('buyDarkBlueCube').addEventListener('click', function() {
    // Postavljamo boju kocke u localStorage
    localStorage.setItem('cubeColor', 'darkblue');
    alert('You bought a DARK-BLUE Cube!');
    updateCoinsDisplay(); // Ažuriraj prikaz novčića (ako želiš da prikazuješ broj)
});

// Inicijalno ažuriraj prikaz novčića
updateCoinsDisplay();

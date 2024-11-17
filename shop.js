// Učitavanje broja novčića iz localStorage
let coins = parseInt(localStorage.getItem('coins')) || 0;
const coinsDisplay = document.getElementById('coinsDisplay');

// Funkcija za ažuriranje broja novčića na ekranu
function updateCoinsDisplay() {
    coinsDisplay.textContent = `Coins: ${coins}`;
    localStorage.setItem('coins', coins); // Čuvanje novčića u localStorage
}

// Funkcija za postavljanje boje kocke
function setCubeColor() {
    const cubeColor = localStorage.getItem('cubeColor') || 'default'; // Default boja
    const gameCube = document.getElementById('gameCube'); // Pretpostavimo da postoji element sa ovim ID-om
    gameCube.style.backgroundColor = cubeColor;
}

// Funkcija za kupovinu tamno plave kocke (besplatno)
document.getElementById('buyDarkBlueCube').addEventListener('click', function () {
    localStorage.setItem('cubeColor', 'darkblue');
    alert('You bought a DARK-BLUE Cube!');
    updateCoinsDisplay();
    setCubeColor(); // Primeni novu boju
});

// Funkcija za kupovinu narančaste kocke (besplatno)
document.getElementById('buyOrangeCube').addEventListener('click', function () {
    localStorage.setItem('cubeColor', 'orange');
    alert('You bought an ORANGE Cube!');
    updateCoinsDisplay();
    setCubeColor(); // Primeni novu boju
});

// Inicijalno ažuriraj prikaz novčića i boju kocke
updateCoinsDisplay();
setCubeColor();

// script.js
function openNewWindow() {
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write("<h1>The game will be here soon...</h1>");
    newWindow.document.body.style.backgroundColor = "white";
    
    newWindow.document.body.addEventListener('click', function() {
        alert('Kliknuli ste u novom prozoru!');
    });
}

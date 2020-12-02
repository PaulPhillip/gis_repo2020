"use strict";
async function main() {
    //Elemente binden
    let topElementRow = document.getElementById('row_top');
    let middleElementRow = document.getElementById('row_middle');
    let bottomElementRow = document.getElementById('row_bottom');
    let backButton = document.getElementById('back');
    //LocalStorage auslesen
    let localStorageTop = localStorage.getItem('top');
    let localStorageMiddle = localStorage.getItem('middle');
    let localStorageBottom = localStorage.getItem('bottom');
    //Fehlerfall - etwas im LocalStorage fehlt
    if (!localStorageTop || !localStorageMiddle || !localStorageBottom) {
        window.location.replace('index.html');
        return;
    }
    //Zurück-Button: Weiterleitung zurück auf index.html
    backButton.addEventListener('click', () => {
        window.location.replace('index.html');
    });
    //Top-Image erzeugen und mit LocalStorage-Daten füllen
    let imgTop = document.createElement('img');
    imgTop.setAttribute('src', `img/${localStorageTop}`);
    topElementRow.appendChild(imgTop);
    //Middle-Image erzeugen und mit LocalStorage-Daten füllen
    let imgMiddle = document.createElement('img');
    imgMiddle.setAttribute('src', `img/${localStorageMiddle}`);
    middleElementRow.appendChild(imgMiddle);
    //Bottom-Image erzeugen und mit LocalStorage-Daten füllen
    let imgBottom = document.createElement('img');
    imgBottom.setAttribute('src', `img/${localStorageBottom}`);
    bottomElementRow.appendChild(imgBottom);
    let browserCacheData = { top: localStorageTop, middle: localStorageMiddle, bottom: localStorageBottom };
    let baseUrl = 'https://gis-communication.herokuapp.com';
    console.log(baseUrl);
    //Query String erzeugen
    let query = new URLSearchParams(browserCacheData);
    baseUrl = baseUrl + "?" + query.toString();
    //GET-Request an URL
    let send = await fetch(baseUrl);
    let result = await send.json();
    //Antwort in Messagebox darstellen
    if (result && !result.error) {
        displayMessage('success', result.message);
        return;
    }
    displayMessage('error', result.error);
}
function displayMessage(type, message) {
    let messageElement = document.getElementById('message');
    if (type === 'error') {
        messageElement.innerHTML = `<p style="color: #ff0000">${message}</p>`;
        return;
    }
    messageElement.innerHTML = `<p>${message}</p>`;
}
main();
//# sourceMappingURL=finished.js.map
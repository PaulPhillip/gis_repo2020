export default class CharacterCreation {
    constructor(data) {
        //alle html elemente auslesen die es gibt
        this.bindElements();
        //event listener hinzufügen
        this.addListeners();
        //bilder erzeugen
        this.init(data);
    }
    static finished() {
        //weiterleitung auf character.html
        window.location.replace("character.html");
    }
    bindElements() {
        this.messageElement = document.getElementById("message");
        this.topElementRow = document.getElementById("row_top");
        this.middleElementRow = document.getElementById("row_middle");
        this.bottomElementRow = document.getElementById("row_bottom");
        this.submitButton = document.getElementById("submit_choice");
    }
    addListeners() {
        this.submitButton.addEventListener("click", () => {
            //fehlerfall - nicht in jeder Zeile wurde etwas selektiert
            if (!this.topSelectedImg || !this.middleSelectedImg || !this.bottomSelectedImg) {
                this.displayMessage("Du musst in jeder Reihe ein Element selektieren");
                return;
            }
            //erfolgsfall - die selektion kann gespeichert werden (localStorage)
            this.saveSelection();
            //weiterleitung auf die neue Seite
            CharacterCreation.finished();
        });
    }
    saveSelection() {
        //localstorage beschreiben mit gesammelten Daten
        localStorage.clear();
        localStorage.setItem("top", this.topSelectedImg);
        localStorage.setItem("middle", this.middleSelectedImg);
        localStorage.setItem("bottom", this.bottomSelectedImg);
    }
    init(data) {
        //check ob die json-Daten gültig sind
        if (!data || !data.top || !data.middle || !data.bottom || data.top.length === 0 || data.bottom.length === 0 || data.middle.length === 0) {
            this.displayMessage("Die übergebenen Daten sind ungültig");
            return;
        }
        //iteration über die json-Daten für den Kopf
        data.top.forEach((src) => {
            //Bildelement erzeugen
            let img = document.createElement("img");
            //Entsprechendes Attribut ans erzeugte Element schreiben
            img.setAttribute("src", `img/${src}`);
            //Eventlistener an das Bild schreiben (für die Selektierung
            img.addEventListener("click", this.select.bind(this, "top", src, img, this.topElementRow));
            this.topElementRow.appendChild(img);
        });
        //iteration über die json-Daten für den Körper
        data.middle.forEach((src) => {
            let img = document.createElement("img");
            img.setAttribute("src", `img/${src}`);
            img.addEventListener("click", this.select.bind(this, "middle", src, img, this.middleElementRow));
            this.middleElementRow.appendChild(img);
        });
        //iteration über die json-Daten für die Beine
        data.bottom.forEach((src) => {
            let img = document.createElement("img");
            img.setAttribute("src", `img/${src}`);
            img.addEventListener("click", this.select.bind(this, "bottom", src, img, this.bottomElementRow));
            this.bottomElementRow.appendChild(img);
        });
    }
    displayMessage(message) {
        this.messageElement.innerHTML = message;
    }
    select(row, imageSrc, imgElem, rowElem) {
        //die selected Klasse von jedem Element der row entfernen
        let children = rowElem.children;
        for (var i = 0; i < children.length; i++) {
            let tableChild = children[i];
            tableChild.classList.remove("selected");
        }
        //selektierung speichern
        switch (row) {
            case "top":
                this.topSelectedImg = imageSrc;
                this.middleElementRow.classList.remove("hide");
                break;
            case "middle":
                this.middleSelectedImg = imageSrc;
                this.bottomElementRow.classList.remove("hide");
                break;
            case "bottom":
                this.bottomSelectedImg = imageSrc;
                break;
        }
        imgElem.classList.add("selected");
    }
}
//# sourceMappingURL=CharacterCreation.js.map
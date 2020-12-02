import CharacterCreation from "./CharacterCreation.js";
async function main() {
    //daten aus json datei auslesen
    let data = await fetch('json/data.json');
    let result = await data.json();
    //console.log(result);
    //wenn keine daten vorhanden, abbruch
    if (!result) {
        return;
    }
    //Applikation erzeugen
    new CharacterCreation(result);
}
main();
//# sourceMappingURL=main.js.map
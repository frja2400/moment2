"use strict";

//Skapar en asynkron funktion för att hämta data från en URL.
async function fetchData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
        //Väntar på svar och konverterar till json-format.
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

//Asynkron funktion för att bearbeta datan.
async function processData() {
    try {

        //Väntar på att hämta data från fetchData-funktionen.
        const result = await fetchData();

        const tableBody = document.getElementById('tableBody');
        const searchInput = document.getElementById('search');
        const codeSort = document.getElementById('codeHeader');
        const courseSort = document.getElementById('courseHeader');
        const progressionSort = document.getElementById('progressionHeader');

        //Funktion som uppdaterar tabellen med datan.
        function updateTable(data) {
            tableBody.innerHTML = ''; //Rensar tabellen.
            //För varje objekt så adderas en ny rad med attribut code, coursename och progression.
            data.forEach(item => {
                const newRow = `
            <tr>
            <td>${item.code}</td>
            <td>${item.coursename}</td>
            <td>${item.progression}</td>
            </tr>
            `;
            //Den nya raden adderas till table i HTML.
                tableBody.innerHTML += newRow;
            });
        }

        //Sorterar varje tabellrubrik genom att addera en händelselyssnare.
        codeSort.addEventListener('click', () => {
            result.sort((a, b) => a.code > b.code ? 1 : -1);
            //Uppdaterar tabellen med den sorterade datan.
            updateTable(result);
        });

        courseSort.addEventListener('click', () => {
            result.sort((a, b) => a.coursename > b.coursename ? 1 : -1);
            updateTable(result);
        });

        progressionSort.addEventListener('click', () => {
            result.sort((a, b) => a.progression > b.progression ? 1 : -1);
            updateTable(result);
        });

        //Adderar en händelselyssnare på inputfältet.
        searchInput.addEventListener('input', () => {
            //Hämtar sökordet.
            const searchWord = searchInput.value.toLowerCase();
            //Filtrerar datan baserat på sökordet.
            const filteredData = result.filter(item =>
                item.code.toLowerCase().includes(searchWord) ||
                item.coursename.toLowerCase().includes(searchWord)
            );
            //Uppdaterar tabellen med den filtrerade datan.
            updateTable(filteredData);
        });
        //Visar hela tabellen från start.
        updateTable(result);

    } catch (error) {
        console.error('Process error:', error);
    }
}

processData();


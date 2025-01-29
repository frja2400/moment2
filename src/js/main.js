"use strict";

async function fetchData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function processData() {
    try {
        const result = await fetchData();

        const tableBody = document.getElementById('tableBody');
        const searchInput = document.getElementById('search');

        function updateTable(data) {
            tableBody.innerHTML = '';
        data.forEach(item => {
            const newRow = `
            <tr>
            <td>${item.code}</td>
            <td>${item.coursename}</td>
            <td>${item.progression}</td>
            </tr>
            `;
            tableBody.innerHTML += newRow;
        });
    }

        searchInput.addEventListener('input', () => {
            const searchWord = searchInput.value.toLowerCase();
            const filteredData = result.filter (item =>
                item.code.toLowerCase().includes(searchWord) ||
                item.coursename.toLowerCase().includes(searchWord)
            );
            updateTable(filteredData);
        });
        updateTable(result);

    } catch (error) {
        console.error('Process error:', error);
    }
}

processData();

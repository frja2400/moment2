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
        tableBody.innerHTML = '';

        result.forEach (item => {
            const newRow = `
            <tr>
            <td>${item.code}</td>
            <td>${item.coursename}</td>
            <td>${item.progression}</td>
            </tr>
            `;
            tableBody.innerHTML += newRow;
        });
    } catch (error) {
        console.error('Process error:', error);
    }
}

processData();

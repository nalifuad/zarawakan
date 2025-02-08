// Airtable API details
const apiKey = 'بەستن'; // Your Airtable API Key
const baseId = 'appPMRn6taSjy5Cuw'; // Your Airtable Base ID
const tableName = 'database2'; // Your Airtable Table Name

const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

// Fetch data from Airtable
fetch(url, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
        const records = data.records;
        const container = document.getElementById('results');

        records.forEach((record) => {
            const inputText = record.fields['سۆرانی']; // Input text column
            const outputTextOne = record.fields['بادینی']; // Output 1 column
            const outputTextTwo = record.fields['هەورامی']; // Output 2 column

            const div = document.createElement('div');
            div.classList.add('result');

            div.innerHTML = `
                <h3>${inputText}</h3>
                <p>Output 1: ${outputTextOne}</p>
                <p>Output 2: ${outputTextTwo}</p>
            `;

            container.appendChild(div);
        });
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

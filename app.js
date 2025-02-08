// Fetch data from Airtable
let airtableData = [];

function fetchDataFromAirtable() {
    fetch('https://api.airtable.com/v0/appPMRn6taSjy5Cuw/database2', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer patZmLxJKMbZNydLd.065cf2139f1bca7b1023308c02d5e016b71bab0c06999fef72b14253be8fb24b',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.records && data.records.length > 0) {
            airtableData = data.records;
        } else {
            document.getElementById('outputContainer').innerHTML = "هیچ ئەنجامێك نەدۆزرایەوە.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('outputContainer').innerHTML = "هەڵەیەک ڕویدا لە کاتی وەرگرتنی داتاکان.";
    });
}

// Display data in the output container
function displayData(data, searchTerm) {
    let outputHTML = '';
    data.forEach(record => {
        let topColumn = '';
        let otherColumns = '';

        // Check if the record matches the search term in any of the columns
        if (record.fields["بادینی"] && record.fields["بادینی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<span style="font-size: 20px; color: #4CAF50;">${record.fields["بادینی"]}</span><br><br>`;
            otherColumns = `
                <strong>سۆرانی:</strong> ${record.fields["سۆرانی"]}<br>
                <strong>هەورامی:</strong> ${record.fields["هەورامی"]}<br>
            `;
        } else if (record.fields["سۆرانی"] && record.fields["سۆرانی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<span style="font-size: 20px; color: #4CAF50;">${record.fields["سۆرانی"]}</span><br><br>`;
            otherColumns = `
                <strong>بادینی:</strong> ${record.fields["بادینی"]}<br>
                <strong>هەورامی:</strong> ${record.fields["هەورامی"]}<br>
            `;
        } else if (record.fields["هەورامی"] && record.fields["هەورامی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<span style="font-size: 20px; color: #4CAF50;">${record.fields["هەورامی"]}</span><br><br>`;
            otherColumns = `
                <strong>سۆرانی:</strong> ${record.fields["سۆرانی"]}<br>
                <strong>بادینی:</strong> ${record.fields["بادینی"]}<br>
            `;
        }

        // Append the HTML for each result
        outputHTML += `
            <div>
                <strong>ئەنجامەکان:</strong><br>
                ${topColumn}
                ${otherColumns}
            </div>`;
    });

    document.getElementById('outputContainer').innerHTML = outputHTML;
}

// Filter and search data
function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = airtableData.filter(record => {
        return Object.values(record.fields).some(fieldValue => fieldValue.toString().toLowerCase().includes(searchTerm));
    });

    if (filteredData.length > 0) {
        displayData(filteredData, searchTerm);
    } else {
        document.getElementById('outputContainer').innerHTML = "هیچ ئەنجامێك نەدۆزرایەوە.";
    }
}

// Add event listener for the search button
document.getElementById('searchButton').addEventListener('click', searchData);

// Initialize by fetching data
fetchDataFromAirtable();

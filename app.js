// Airtable API Fetch Code
let airtableData = [];

fetch('https://api.airtable.com/v0/appPMRn6taSjy5Cuw/database2', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer patsyevU4rLpgRvph.5238f65bb6cf4ae8280ca355e9191d279de068f64576da699af731c26e2e26c8',
  },
})
.then(response => response.json())
.then(data => {
  if (data.records && data.records.length > 0) {
    // Store the fetched data
    airtableData = data.records;
    // Initial empty output box
    document.getElementById('output').innerHTML = ""; // Start with an empty output box
  } else {
    document.getElementById('output').innerHTML = "هیچ ئەنجامێك نەدۆزرایەوە.";
  }
})
.catch(error => {
  console.error('Error:', error);
  document.getElementById('output').innerHTML = "هەڵەیەک ڕویدا لە کاتی وەرگرتنی داتاکان.";
});

// Function to display data in a cleaner format (excluding the formula column)
function displayData(data, searchTerm) {
  let outputHTML = '';
  data.forEach(record => {
    let topColumn = '';
    let otherColumns = '';

    // Check which column the search term is in and display it on top
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

    outputHTML += `
      <div style="padding: 15px; border: 1px solid #ccc; margin-bottom: 10px; background-color: #fff;">
        <strong>ئەنجامەکان:</strong><br>
        ${topColumn}
        ${otherColumns}
      </div>`;
  });

  document.getElementById('output').innerHTML = outputHTML;

  // Optionally, log raw data in the console for debugging
  document.getElementById('rawOutput').innerText = JSON.stringify(data, null, 2);
}

// Search functionality
function searchData() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = airtableData.filter(record => {
    return Object.values(record.fields).some(fieldValue => fieldValue.toString().toLowerCase().includes(searchTerm));
  });

  if (filteredData.length > 0) {
    displayData(filteredData, searchTerm);
  } else {
    document.getElementById('output').innerHTML = "هیچ ئەنجامێك نەدۆزرایەوە.";
  }
}

// Make the button work properly
document.getElementById('searchButton').addEventListener('click', function () {
  searchData();
});

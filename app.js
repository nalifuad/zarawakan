// Your Airtable API setup
const airtableToken = 'patChQMUnczMPuIv6.1daa01fa13b723ec1b299eec21f351f2eb077ce6407d2a13d3207d215ec78070';
const baseId = 'appPMRn6taSjy5Cuw'; // Your Airtable Base ID
const tableName = 'database2'; // Your Airtable Table Name

// Function to fetch data from Airtable
async function fetchData(inputText) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${airtableToken}`
        }
    });

    const data = await response.json();
    const records = data.records;

    // Check for a match in the input fields
    const result = records.find(record =>
        record.fields['سۆرانی'] === inputText ||
        record.fields['بادینی'] === inputText ||
        record.fields['هەورامی'] === inputText
    );

    if (result) {
        return {
            sorani: result.fields['سۆرانی'],
            badini: result.fields['بادینی'],
            hawrami: result.fields['هەورامی']
        };
    } else {
        return { sorani: 'Not found', badini: 'Not found', hawrami: 'Not found' };
    }
}

// Call the function with an example input
fetchData('سۆرانی')
    .then(result => console.log(result))
    .catch(error => console.error('Error fetching data:', error));

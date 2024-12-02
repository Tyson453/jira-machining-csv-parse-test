import moment from 'moment';

const processCSVButton = document.getElementById('processBtn');
const csvFileInput = document.getElementById('csvFile');
const statusElement = document.getElementById('status');

processCSVButton.addEventListener('click', process);

function process() {
  const file = csvFileInput.files[0];

  if (!file) {
    statusElement.textContent = 'No file selected';
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const csvData = event.target.result;
    const parsedData = parseCSV(csvData);
    console.log(parsedData);
    
    downloadNewCSV(parsedData);

    statusElement.textContent = 'CSV parsed successfully';
  };

  reader.readAsText(file);
}

function parseCSV(csvData) {
  return csvData;
}

function downloadNewCSV(csvData) {
  const formattedDate = moment().format('YYYY-MM-DD_HH-mm-ss')
  const filename = `jira-generated-machining-tasks_${formattedDate}.csv`;
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
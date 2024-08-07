// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "civicalertoriginal.firebaseapp.com",
    databaseURL: "https://civicalertoriginal-default-rtdb.firebaseio.com",
    projectId: "civicalertoriginal",
    storageBucket: "civicalertoriginal.appspot.com",
    messagingSenderId: "858192785417",
    appId: "1:858192785417:web:424b1bec909661ab29c8d8",
    measurementId: "G-KJ0C1TE4JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('report-table-body');
    const reportsRef = ref(database, 'Make Report Instance/');

    onValue(reportsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Data retrieved from Firebase:', data); // Logging the data

        tableBody.innerHTML = '';  // Clear existing table rows

        if (data) {
            for (let key in data) {
                const report = data[key];
                if (report.incidentType === 'Water') {  // Filter by category if needed
                    const row = document.createElement('tr');

                    // Create cells for each field
                    const userIDCell = document.createElement('td');
                    userIDCell.textContent = report.userUID;
                    row.appendChild(userIDCell);

                    const categoryCell = document.createElement('td');
                    categoryCell.textContent = report.incidentType;
                    row.appendChild(categoryCell);

                    const dateCell = document.createElement('td');
                    dateCell.textContent = report.dateTime;
                    row.appendChild(dateCell);

                    const refNumberCell = document.createElement('td');
                    refNumberCell.textContent = report.refNumber;
                    row.appendChild(refNumberCell);

                    const locationCell = document.createElement('td');
                    locationCell.textContent = report.location;
                    row.appendChild(locationCell);

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = report.description;
                    row.appendChild(descriptionCell);

                    const statusCell = document.createElement('td');
                    statusCell.textContent = report.status;
                    row.appendChild(statusCell);

                    const actionCell = document.createElement('td');
                    const button = document.createElement('button');
                    button.textContent = 'View';
                    actionCell.appendChild(button);
                    row.appendChild(actionCell);

                    tableBody.appendChild(row);
                }
            }
        } else {
            console.error('No data available');
        }
    }, {
        onlyOnce: true
    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function displayReports(reports) {
    const reportsContainer = document.getElementById('reports-container');
    reportsContainer.innerHTML = ''; // Clear previous content

    const groupedReports = {};

    // Grouping reports by incident type
    for (const key in reports) {
        const report = reports[key];
        const incidentType = report.incidentType;

        if (!groupedReports[incidentType]) {
            groupedReports[incidentType] = [];
        }

        groupedReports[incidentType].push(report);
    }

    // Displaying grouped reports
    for (const incidentType in groupedReports) {
        const reportSection = document.createElement('div');
        reportSection.classList.add('report-section');

        const reportTitle = document.createElement('h2');
        reportTitle.textContent = incidentType;
        reportSection.appendChild(reportTitle);

        const reportTable = document.createElement('table');
        const tableHeader = `
            <thead>
                <tr>
                    <th>UserID</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Reference Number</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
        `;
        reportTable.innerHTML = tableHeader;

        const tableBody = document.createElement('tbody');

        groupedReports[incidentType].forEach(report => {
            const reportRow = `
                <tr>
                    <td>${report.userUID}</td>
                    <td>${report.incidentType}</td>
                    <td>${report.dateTime}</td>
                    <td>${report.refNumber}</td>
                    <td>${report.location}</td>
                    <td>${report.description}</td>
                    <td>${report.status}</td>
                    <td>
                        <button>View</button>
                        <button>Upload</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += reportRow;
        });

        reportTable.appendChild(tableBody);
        reportSection.appendChild(reportTable);
        reportsContainer.appendChild(reportSection);
    }
}

async function fetchReports() {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, 'Make Report Instance'));
        if (snapshot.exists()) {
            displayReports(snapshot.val());
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

fetchReports();

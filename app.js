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
            const reportRow = document.createElement('tr');
            reportRow.innerHTML = `
                <td>${report.userUID}</td>
                <td>${report.incidentType}</td>
                <td>${report.dateTime}</td>
                <td>${report.refNumber}</td>
                <td>${report.location}</td>
                <td>${report.description}</td>
                <td>${report.status}</td>
                <td>
                    <button class="view-btn" data-report='${JSON.stringify(report)}'>View</button>
                </td>
            `;
            tableBody.appendChild(reportRow);
        });

        reportTable.appendChild(tableBody);
        reportSection.appendChild(reportTable);
        reportsContainer.appendChild(reportSection);
    }

    // Add event listeners to all view buttons
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', event => {
            const report = JSON.parse(event.target.getAttribute('data-report'));
            showModal(report);
        });
    });
}

function showModal(report) {
    const modal = document.getElementById('reportModal');
    const modalContent = document.getElementById('reportDetails');
    
    modalContent.innerHTML = `
        <p><strong>UserID:</strong> ${report.userUID}</p>
        <p><strong>Category:</strong> ${report.incidentType}</p>
        <p><strong>Date:</strong> ${report.dateTime}</p>
        <p><strong>Reference Number:</strong> ${report.refNumber}</p>
        <p><strong>Location:</strong> ${report.location}</p>
        <p><strong>Description:</strong> ${report.description}</p>
        <p><strong>Status:</strong> ${report.status}</p>
    `;

    modal.style.display = "block";

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
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

const reports = [
    {
        title: "Traffic Light",
        description: "Traffic Light Before Sonpark Spar Not Working",
        location: "West Acres, Mbombela, Geelhout Avenue",
        status: "Agent Looking At It",
        referenceID: "xxxxxxxxxxx"
    },
    {
        title: "Water Leakage",
        description: "Major Water Leakage near Riverside Mall",
        location: "Riverside, Mbombela, Waterfall Avenue",
        status: "Under Investigation",
        referenceID: "yyyyyyyyyyy"
    },
    {
        title: "Pothole",
        description: "Large pothole causing traffic disruption",
        location: "CBD, Mbombela, Main Street",
        status: "Scheduled for Repair",
        referenceID: "zzzzzzzzzzz"
    }
];

let currentIndex = 0;

function displayReport(index) {
    const report = reports[index];
    const reportCard = document.getElementById('report-card');
    reportCard.innerHTML = `
        <img src="imageicon.jpg" alt="Report Image">
        <div class="report-details">
            <h3>${report.title}</h3>
            <p><strong>Report Description:</strong> ${report.description}</p>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Status:</strong> <span class="status">${report.status}</span></p>
            <p><strong>Reference ID:</strong> ${report.referenceID}</p>
        </div>
    `;
}

document.getElementById('prevReport').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + reports.length) % reports.length;
    displayReport(currentIndex);
});

document.getElementById('nextReport').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % reports.length;
    displayReport(currentIndex);
});

// Initial display
displayReport(currentIndex);

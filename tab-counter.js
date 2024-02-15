let tabCount = 0;

// Increment tab count without preventing default tab behavior
document.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
        tabCount++;
        updateDisplay();
    }
});

function updateDisplay() {
    const display = document.getElementById('tab-counter');
    if (display) display.innerText = `Tab count: ${tabCount}`;
}

// Reset button functionality
document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            tabCount = 0;
            updateDisplay();
        });
    }
});

// Since JavaScript cannot directly write to a file, we use localStorage for demonstration
function saveCount() {
    localStorage.setItem('tabCount', tabCount);
}

window.onbeforeunload = saveCount; // Save the count when the user leaves the page

// Load the saved count when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const savedCount = localStorage.getItem('tabCount');
    if (savedCount !== null) {
        tabCount = parseInt(savedCount, 10);
        updateDisplay();
    }
});

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

    // Highlight gallery item on Enter key press and remove highlight on Tab or Shift+Tab press
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                removeHighlight();
                this.classList.add('highlight');
            }
        });

        item.addEventListener('blur', function (event) {
            this.classList.remove('highlight');
        });
    });
});

// Function to remove highlight from all items
function removeHighlight() {
    document.querySelectorAll('.gallery-item.highlight').forEach(item => {
        item.classList.remove('highlight');
    });
}

// Save and Load tab count to/from localStorage
function saveCount() {
    localStorage.setItem('tabCount', tabCount);
}

window.onbeforeunload = saveCount;

document.addEventListener('DOMContentLoaded', function () {
    const savedCount = localStorage.getItem('tabCount');
    if (savedCount !== null) {
        tabCount = parseInt(savedCount, 10);
        updateDisplay();
    }
});

// script.js
window.addEventListener('scroll', function() {
    console.log('User is scrolling');
});


// Track when the user switches between tabs
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User switched to another tab');
    } else {
        console.log('User returned to the tab');
    }
});


let idleTime = 0;

// Reset idle time on user activity
function resetIdleTime() {
    idleTime = 0;
}

// Increment idle time every second
setInterval(function() {
    idleTime++;
    if (idleTime >= 10) { // Assume 10 seconds of inactivity as idle
        console.log('User is idle');
    }
}, 1000);

// Reset idle time on any activity
window.onmousemove = resetIdleTime;
window.onkeypress = resetIdleTime;





let userData = {
    scrollEvents: 0,
    tabSwitches: 0,
    idleTime: 0
};

// Track scrolling
window.addEventListener('scroll', function() {
    userData.scrollEvents++;
    console.log('Scroll event count:', userData.scrollEvents);
});

// Track tab visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        userData.tabSwitches++;
        console.log('Tab switches count:', userData.tabSwitches);
    }
});

// Track idle time
setInterval(function() {
    userData.idleTime++;
    if (idleTime >= 10) {
        console.log('User idle time (seconds):', userData.idleTime);
    }
}, 1000);

// Reset idle time on activity
function resetIdleTime() {
    userData.idleTime = 0;
}

window.onmousemove = resetIdleTime;
window.onkeypress = resetIdleTime;




// Function to send data to the backend
function sendDataToBackend() {
    fetch('http://127.0.0.1:5000/submit_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => console.log('Data sent successfully:', data))
    .catch(error => console.error('Error:', error));
}

// Example: Send data every 30 seconds
setInterval(sendDataToBackend, 30000);





let mouseMovements = [];

// Track mouse movement
window.addEventListener('mousemove', function(event) {
    mouseMovements.push({
        x: event.clientX,
        y: event.clientY,
        time: Date.now()
    });

    // Log the current position
    console.log('Mouse position:', { x: event.clientX, y: event.clientY });
});

// Add the mouse movement data to the userData object
userData.mouseMovements = mouseMovements;




let clickPositions = [];

// Track click positions
window.addEventListener('click', function(event) {
    clickPositions.push({
        x: event.clientX,
        y: event.clientY,
        time: Date.now()
    });

    // Log the click position
    console.log('Click position:', { x: event.clientX, y: event.clientY });
});

// Add the click position data to the userData object
userData.clickPositions = clickPositions;





let keyPresses = [];

// Track keypress events
window.addEventListener('keypress', function(event) {
    keyPresses.push({
        key: event.key,
        time: Date.now()
    });

    // Log the key press
    console.log('Key pressed:', event.key);
});

// Add the keypress data to the userData object
userData.keyPresses = keyPresses;

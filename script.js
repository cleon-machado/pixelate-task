function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the requested page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation buttons visibility
    const loginBtn  = document.getElementById('navLoginBtn');
    const logoutBtn = document.getElementById('navLogoutBtn');

    if (pageName === 'dashboard') {
        loginBtn.style.display  = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display  = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Login Handler

function handleLogin() {
    const email       = document.getElementById('email').value.trim();
    const password    = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';
    errorMessage.classList.remove('show');

    if (!email || !password) {
        errorMessage.textContent = 'Please enter both email and password';
        errorMessage.classList.add('show');
        return;
    }

    // Email format check (skip for admin)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== 'admin' && !emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.classList.add('show');
        return;
    }

    // Simple admin check 
    if (email === 'admin' && password === 'admin123') {
        showPage('dashboard');
        return;
    }

    // Login failed
    errorMessage.textContent = 'Invalid email or password. Please try again.';
    errorMessage.classList.add('show');
}

// Logout Handler
function handleLogout() {

    document.getElementById('email').value    = '';
    document.getElementById('password').value = '';

    // Go back to landing page
    showPage('landing');
}


// Trailing cursor animation


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = Array(22).fill("#F97316"); 


circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index];
});

window.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {

        circle.style.left = `${x - 12}px`;
        circle.style.top  = `${y - 12}px`;


        circle.style.scale = (circles.length - index) / circles.length;


        const tempX = circle.x;
        const tempY = circle.y;
        circle.x = x;
        circle.y = y;


        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - tempX) * 0.3;
        y += (nextCircle.y - tempY) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

// Start animation loop
animateCircles();
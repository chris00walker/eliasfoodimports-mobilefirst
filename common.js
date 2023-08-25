document.addEventListener("DOMContentLoaded", function () {

    // Check for larger screens
    function isLargerScreen() {
        return window.innerWidth >= parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md'));
    }

    // Handle window resize to adjust menu behavior for larger screens
    window.addEventListener("resize", function () {
        if (isLargerScreen()) {
            nav.classList.remove('active');
            body.classList.remove('menu-active');
            overlay.classList.remove('active');
        }
    });

    // Menu Functionality
    const menuButton = document.getElementById('menu-button');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    const body = document.body;
    const overlay = document.createElement('div');
    const shopIcon = document.getElementById('shop-section');

    overlay.className = 'overlay';
    body.appendChild(overlay);

    if (shopIcon) {
        shopIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    if (menuButton && close && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.add('active');
            body.classList.add('menu-active');
            overlay.classList.add('active');
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
            body.classList.remove('menu-active');
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            nav.classList.remove('active');
            body.classList.remove('menu-active');
            overlay.classList.remove('active');
        });
    }

    // Slide-in Menu Code
    const slideInMenu = document.getElementById('slide-in-menu');
    const menuItems = document.querySelectorAll('#slide-in-menu .menu-item a');

    if (menuButton && slideInMenu) {
        menuButton.addEventListener('click', () => {
            slideInMenu.classList.toggle('active'); // Change is here
        });
    }

    if (menuItems) {
        menuItems.forEach((item) => {
            item.addEventListener('click', () => {
                slideInMenu.classList.remove('active');
            });
        });
    }

    // Search Functionality
    const searchIcon = document.getElementById('search-icon');
    const closeIcon = document.getElementById('close-icon');
    const searchInput = document.getElementById('search-input');

    if (searchIcon && closeIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            // Show the search input field and the close icon
            searchInput.classList.add('active');
            closeIcon.classList.add('active');

            // Hide the search icon
            searchIcon.classList.add('inactive');
        });

        closeIcon.addEventListener('click', () => {
            // Hide the search input field and the close icon
            searchInput.classList.remove('active');
            closeIcon.classList.remove('active');

            // Show the search icon
            searchIcon.classList.remove('inactive');

            // Clear the input field
            searchInput.value = '';
        });
    };

    // Define hours
    const hours = [...Array(12).keys()].map(i => i + 1);

    // Get the 'hour-indicators' group
    const hourIndicatorsGroup = document.getElementById('hour-indicators');

    // Add hour indicators and numbers
    hours.forEach((hour, index) => {
        const angle = (index * 30) * (Math.PI / 180);
        const x1 = 100 + (90 * Math.sin(angle));
        const y1 = 100 - (90 * Math.cos(angle));
        const x2 = 100 + (100 * Math.sin(angle));
        const y2 = 100 - (100 * Math.cos(angle));
        const numberX = 100 + (80 * Math.sin(angle));
        const numberY = 100 - (80 * Math.cos(angle));

        // Add hour number
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', numberX);
        text.setAttribute('y', numberY);
        text.setAttribute('font-size', '14');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = hour;
        hourIndicatorsGroup.appendChild(text);

        // Add hour line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        hourIndicatorsGroup.appendChild(line);
    });

    // Add shading for hours of operation (from 10 am to 6 pm)
    const startAngle = (10 * 30 - 90) * (Math.PI / 180);
    const endAngle = (18 * 30 - 90) * (Math.PI / 180);
    const startX = 100 + (96 * Math.cos(startAngle));
    const startY = 100 + (96 * Math.sin(startAngle));
    const endX = 100 + (96 * Math.cos(endAngle));
    const endY = 100 + (96 * Math.sin(endAngle));
    const largeArcFlag = (endAngle - startAngle <= Math.PI) ? '0' : '1';

    // Get the 'shading-arc' path
    const shadingArc = document.getElementById('shading-arc');
    shadingArc.setAttribute('d', `M 100 100 L ${startX} ${startY} A 96 96 0 ${largeArcFlag} 1 ${endX} ${endY} Z`);

    // Newsletter section
    document.getElementById('newsletterForm').addEventListener('submit', function (event) {
        const emailInput = document.getElementById('email');
        const errorMessage = document.getElementById('error-message');
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Basic regex for email validation

        if (!emailPattern.test(emailInput.value)) {
            event.preventDefault(); // Prevents form submission
            errorMessage.textContent = 'Please enter a valid email address.';
        } else {
            errorMessage.textContent = ''; // Clear the error message
        }
    });
})
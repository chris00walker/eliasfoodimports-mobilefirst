document.addEventListener("DOMContentLoaded", function () {
    // Menu Functionality
    const menuButton = document.getElementById('menu-button');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    const body = document.body;
    const overlay = document.createElement('div');
    const shopIcon = document.getElementById('shop-section');

    overlay.className = 'overlay';
    body.appendChild(overlay);

    // Check for larger screens
    const isLargerScreen = () => window.innerWidth >= parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md'));

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
});

// Handle window resize to adjust menu behavior for larger screens
window.addEventListener("resize", function () {
    if (isLargerScreen()) {
        nav.classList.remove('active');
        body.classList.remove('menu-active');
        overlay.classList.remove('active');
    }
});

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

// Product data
const featuredProductsData = [
    {
        img: "img/products/f1.jpg",
        alt: "Pickled Wild Cucumbers",
        brand: "BM MECHAALANY",
        name: "Pickled Wild Cucumbers",
        stars: 5,
        price: 28
    },
    {
        img: "img/products/f2.jpg",
        alt: "Extra-Virgin Olive Oil",
        brand: "EL KOURA",
        name: "Extra-Virgin Olive Oil",
        stars: 5,
        price: 70
    },
    {
        img: "img/products/f3.jpg",
        alt: "Fava Beans",
        brand: "CORTAS",
        name: "Fava Beans",
        stars: 5,
        price: 40
    },
    {
        img: "img/products/f4.jpg",
        alt: "Grape Leaves",
        brand: "ORLANDO",
        name: "Grape Leaves",
        stars: 5,
        price: 52
    },
    {
        img: "img/products/f5.jpg",
        alt: "Green Olives",
        brand: "ACORSA",
        name: "Green Olives",
        stars: 5,
        price: 25
    },
    {
        img: "img/products/f6.jpg",
        alt: "Mixed Nuts",
        brand: "AL KAZZI",
        name: "Mixed Nuts",
        stars: 5,
        price: 78
    },
    {
        img: "img/products/f7.jpg",
        alt: "Arabic Coffee - Regular",
        brand: "NAJJAR",
        name: "Arabic Coffee - Regular",
        stars: 5,
        price: 78
    },
    {
        img: "img/products/f8.jpg",
        alt: "Arabic Coffee - Decaf",
        brand: "NAJJAR",
        name: "Arabic Coffee - Decaf",
        stars: 5,
        price: 28
    },
]

const newArrivalsData = [
    {
        img: "img/products/n1.jpg",
        alt: "Long Bread Sticks from Moulin D'or",
        brand: "MOULIN D'OR",
        name: "Long Bread Sticks",
        stars: 5,
        price: 10
    },
    {
        img: "img/products/n2.jpg",
        alt: "Rose Water from Cortas",
        brand: "CORTAS",
        name: "Rose Water",
        stars: 5,
        price: 15
    },
    {
        img: "img/products/n3.jpg",
        alt: "Chick Peas from Cortas",
        brand: "CORTAS",
        name: "Chick Peas",
        stars: 5,
        price: 8
    },
    {
        img: "img/products/n4.jpg",
        alt: "#1 Dark Brown Bulgar Wheat from Sunnyland Mills",
        brand: "SUNNYLAND MILLS",
        name: "#1 Dark Brown Bulgar Wheat",
        stars: 5,
        price: 52
    },
    {
        img: "img/products/n5.jpg",
        alt: "White, Bulgar Wheat, Fine from OliveNation",
        brand: "OLIVENATION",
        name: "White, Bulgar Wheat, Fine",
        stars: 5,
        price: 5
    },
    {
        img: "img/products/n6.jpg",
        alt: "Orange Blossom Water by CORTAS",
        brand: "CORTAS",
        name: "Orange Blossom Water",
        stars: 5,
        price: 18
    },
    {
        img: "img/products/n7.jpg",
        alt: "Pomegranate Molasses by CORTAS",
        brand: "CORTAS",
        name: "Pomegranate Molasses",
        stars: 5,
        price: 15
    },
    {
        img: "img/products/n8.jpg",
        alt: "Pitted Pressed Dates by BAROODY",
        brand: "BAROODY",
        name: "Pitted Pressed Dates",
        stars: 5,
        price: 20
    }
];


// Function to generate HTML for a product

function createProductHTML(product) {
    return `
        <article class="product-card">
            <img src="${product.img}" alt="${product.alt}">
            <div class="description">
                <span class="product-brand">${product.brand}</span>
                <h5 class="product-name">${product.name}</h5>
                <div class="star">
                    ${'<i class="fas fa-star"></i>'.repeat(product.stars)}
                </div>
                <div class="product-info">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart button">Add to Cart</button>
                    <span class="cart"><i class="fal fa-shopping-cart"></i></span>
                </div>
            </div>
        </article>
    `;
}


// Get product containers
const proContainer1 = document.querySelector('#featured-products .pro-container');
const proContainer2 = document.querySelector('#new-arrivals .pro-container');

// Generate and append product HTML for section 1
let featuredProductsHTML = '';
featuredProductsData.forEach(product => {
    featuredProductsHTML += createProductHTML(product);
});
proContainer1.innerHTML = featuredProductsHTML;

// Generate and append product HTML for new-arrivals section
let newArrivalsHTML = '';
newArrivalsData.forEach(product => {
    newArrivalsHTML += createProductHTML(product);
});
proContainer2.innerHTML = newArrivalsHTML;

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




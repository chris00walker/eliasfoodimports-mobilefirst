import { updateCartIconUtility } from './cartUtility.js';  // Import the utility function

// Initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to validate a product object
function isValidProduct(product) {
    return product && product.hasOwnProperty('price') && product.hasOwnProperty('name') && product.hasOwnProperty('img');
}

// Function to add a product to the cart
function addToCart(productToAdd) {
    if (isValidProduct(productToAdd)) {
        cart.push(productToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIconUtility(cart);  // Use the utility function here
    } else {
        console.error("Invalid product object. Cannot add to cart.");
    }
}

// Function to remove a product from the cart by index
function removeFromCart(cartIndex) {
    if (cartIndex >= 0 && cartIndex < cart.length) {
        cart.splice(cartIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIconUtility(cart);  // Use the utility function here
        renderCart();
    } else {
        console.error("Invalid cart index. Cannot remove item.");
    }
}

// Function to render the entire cart dynamically
function renderCart() {
    const mainElement = document.querySelector('main');
    if (mainElement) {
        let totalPrice = 0;

        // Create the cart table section
        const cartSection = document.createElement('section');
        cartSection.id = 'cart-container';
        const cartTable = document.createElement('table');
        cartTable.width = "100%";

        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Remove', 'Image', 'Product', 'Price', 'Quantity', 'Subtotal'].forEach(headerText => {
            const th = document.createElement('td');
            th.innerText = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        cartTable.appendChild(thead);

        // Add table body
        const tbody = document.createElement('tbody');
        tbody.id = 'cart';

        if (cart.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 6;
            cell.innerText = 'Your cart is empty.';
            row.appendChild(cell);
            tbody.appendChild(row);
        } else {
            cart.forEach((product, index) => {
                totalPrice += product.price;
                const row = document.createElement('tr');

                ['button', 'img', 'name', 'price', 'quantity', 'subtotal'].forEach(cellType => {
                    const cell = document.createElement('td');
                    if (cellType === 'button') {
                        const btn = document.createElement('button');
                        btn.innerText = 'Remove';
                        cell.appendChild(btn);
                    } else if (cellType === 'img') {
                        const img = document.createElement('img');
                        img.src = product.img;
                        img.alt = product.alt;
                        img.width = 50;
                        cell.appendChild(img);
                    } else if (cellType === 'name') {
                        cell.innerText = product.name;
                    } else if (cellType === 'price') {
                        cell.innerText = `$${product.price}`;
                    } else if (cellType === 'quantity') {
                        cell.innerText = '1';
                    } else if (cellType === 'subtotal') {
                        cell.innerText = `$${product.price}`;
                    }
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        }
        cartTable.appendChild(tbody);
        cartSection.appendChild(cartTable);

        // Event delegation for Remove button
        cartSection.addEventListener('click', function (event) {
            if (event.target && event.target.nodeName === "BUTTON" && event.target.innerText === 'Remove') {
                const rowIndex = Array.from(event.target.closest('tbody').rows).indexOf(event.target.closest('tr'));
                removeFromCart(rowIndex);
            }
        });

        // Create the cart totals section
        const cartAddSection = document.createElement('section');
        cartAddSection.id = 'cart-add';
        const subtotalDiv = document.createElement('div');
        subtotalDiv.id = 'subtotal';
        const h6 = document.createElement('h6');
        h6.innerText = 'Cart Totals';
        const totalTable = document.createElement('table');

        [['Cart Subtotal', totalPrice.toFixed(2), 'cart-subtotal'],
        ['Shipping', 'Free', null],
        ['Total', `<strong>$${totalPrice.toFixed(2)}</strong>`, 'cart-total']].forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach((cellData, index) => {
                const cell = document.createElement('td');
                if (index === 1) {
                    cell.innerHTML = cellData;
                    if (rowData[2]) {
                        cell.id = rowData[2];
                    }
                } else {
                    cell.innerText = cellData;
                }
                row.appendChild(cell);
            });
            totalTable.appendChild(row);
        });


        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'normal';
        checkoutBtn.innerText = 'Proceed To Checkout';

        subtotalDiv.appendChild(h6);
        subtotalDiv.appendChild(totalTable);
        cartAddSection.appendChild(subtotalDiv);
        cartAddSection.appendChild(checkoutBtn);

        // Append everything to the main element
        mainElement.innerHTML = '';  // Clear existing content if any
        mainElement.appendChild(cartSection);
        mainElement.appendChild(cartAddSection);

        // Update local storage and cart icon
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIconUtility(cart);
    } else {
        console.error("Main element not found.");
    }
}

// Initialize the cart when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    updateCartIconUtility(cart);  // Use the utility function here
    // Only render the cart if on the cart.html page
    const mainElement = document.querySelector('main[data-page="cart"]');
    if (mainElement) {
        renderCart();
    }
});

export { addToCart, removeFromCart, renderCart };


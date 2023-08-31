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

                // New: Initialize quantity if not present
                if (!('quantity' in product)) {
                    product.quantity = 1;
                }

                ['button', 'img', 'name', 'price', 'quantity', 'subtotal'].forEach(cellType => {
                    const cell = document.createElement('td');
                    if (cellType === 'button') {
                        const btn = document.createElement('button');
                        btn.className = "remove-item";
                        btn.innerHTML = '<i class="fas fa-times-circle"></i>';
                        cell.appendChild(btn);
                    } else if (cellType === 'img') {
                        const img = document.createElement('img');
                        img.src = product.img;
                        img.alt = product.alt;
                        img.width = 50;
                        const anchor = document.createElement('a');
                        anchor.href = `single-product.html?type=featured&index=0`;
                        anchor.appendChild(img);
                        cell.appendChild(anchor);
                    } else if (cellType === 'name') {
                        cell.innerText = product.name;
                    } else if (cellType === 'price') {
                        cell.innerText = `$${product.price}`;
                    } else if (cellType === 'quantity') {
                        const quantityInput = document.createElement('input');
                        quantityInput.type = 'number';
                        quantityInput.min = 1;
                        quantityInput.value = product.quantity;
                        quantityInput.addEventListener('change', function () {
                            const newQuantity = parseInt(this.value);
                            if (isNaN(newQuantity) || newQuantity < 1) {
                                return;  // Invalid entry
                            }
                            // Update the product quantity
                            product.quantity = newQuantity;
                            // Update local storage
                            localStorage.setItem('cart', JSON.stringify(cart));
                            // Update the subtotal for this product
                            const subtotalCell = row.querySelector('.subtotal');
                            if (subtotalCell) {
                                subtotalCell.innerText = `$${product.price * newQuantity}`;
                            }
                            // Update the total price
                            const totalCell = document.querySelector('#cart-total');
                            if (totalCell) {
                                const newTotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
                                totalCell.innerHTML = `<strong>$${newTotal.toFixed(2)}</strong>`;
                            }
                            // Update cart icon
                            updateCartIconUtility(cart);
                        });
                        cell.appendChild(quantityInput);
                    } else if (cellType === 'subtotal') {
                        cell.className = 'subtotal';
                        cell.innerText = `$${product.price * product.quantity}`;
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
            if (
                (event.target && event.target.nodeName === "BUTTON") ||
                (event.target && event.target.nodeName === "I" && event.target.classList.contains("fas"))
            ) {
                let rowIndex;
                if (event.target.nodeName === "I") {  // if the clicked element is the icon
                    rowIndex = Array.from(event.target.closest('tbody').rows).indexOf(event.target.closest('tr'));
                } else {  // if the clicked element is the button
                    rowIndex = Array.from(event.target.closest('tbody').rows).indexOf(event.target.closest('tr'));
                }

                removeFromCart(rowIndex);
            }
        });


        // Create the cart totals section
        const cartAddSection = document.createElement('section');
        cartAddSection.id = 'cart-add';
        const subtotalDiv = document.createElement('div');
        subtotalDiv.id = 'subtotal';
        const cartTotals = document.createElement('h4');
        cartTotals.innerText = 'Cart Totals';
        const totalTable = document.createElement('table');

        [['Cart Subtotal', `$${totalPrice.toFixed(2)}`, 'cart-subtotal'],
        ['Shipping', 'Free', null],
        ['Total', `<strong>$${totalPrice.toFixed(2)}</strong>`, 'cart-total']
        ].forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach((cellData, index) => {
                const cell = document.createElement('td');
                if (index === 1) {
                    cell.innerHTML = cellData;
                    if (rowData[2]) {
                        cell.id = rowData[2];
                    }
                } else if (index !== 2) {
                    // Prevent the ID from being displayed
                    cell.innerText = cellData;
                }
                row.appendChild(cell);
            });
            totalTable.appendChild(row);
        });

        // Create the Continue Shopping button
        const continueShoppingBtn = document.createElement('button');
        continueShoppingBtn.className = 'continue-shopping';  // Add a class for styling
        continueShoppingBtn.innerText = 'Continue Shopping';
        continueShoppingBtn.addEventListener('click', function () {
            window.location.href = 'shop.html';  // Redirect to the shop page
        });

        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'checkout';
        checkoutBtn.innerText = 'Checkout';

        subtotalDiv.appendChild(cartTotals);
        subtotalDiv.appendChild(totalTable);
        cartAddSection.appendChild(subtotalDiv);
        cartAddSection.appendChild(checkoutBtn);

        // Append everything to the main element
        mainElement.innerHTML = '';  // Clear existing content if any
        mainElement.appendChild(cartSection);
        mainElement.appendChild(cartAddSection);
        mainElement.appendChild(continueShoppingBtn);// Append the Continue Shopping button to the main element

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


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
        updateCartHTML();
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    } else {
        console.error("Invalid product object. Cannot add to cart.");
    }
}

// Function to update cart icon
function updateCartIcon() {
    const cartCount = cart.length;
    const cartIcons = document.querySelectorAll('.cart');
    if (cartIcons) {
        cartIcons.forEach(cartIcon => {
            cartIcon.innerHTML = `<i class="fal fa-shopping-cart"></i> ${cartCount}`;
        });
    } else {
        console.error("Cart icon elements not found.");
    }
}

// Function to remove a product from the cart by index
function removeFromCart(cartIndex) {
    if (cartIndex >= 0 && cartIndex < cart.length) {
        cart.splice(cartIndex, 1);
        updateCartHTML();
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    } else {
        console.error("Invalid cart index. Cannot remove item.");
    }
}

// Function to update the cart's HTML dynamically
function updateCartHTML() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        let cartHTML = '';
        let totalPrice = 0;
        cart.forEach((product, index) => {
            totalPrice += product.price;
            cartHTML += `
                <div class="cart-item">
                    <img src="${product.img}" alt="${product.alt}">
                    <p>${product.name}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
        cartHTML += `<div class="cart-total">Total: $${totalPrice}</div>`;
        cartContainer.innerHTML = cartHTML;
        // Update cart totals in HTML
        const cartSubtotal = document.getElementById("cart-subtotal");
        const cartTotal = document.getElementById("cart-total");
        if (cartSubtotal && cartTotal) {
            cartSubtotal.innerText = `$ ${totalPrice}`;
            cartTotal.innerText = `$ ${totalPrice}`;
        } else {
            console.error("Cart total elements not found.");
        }
    } else {
        console.error("Cart container element not found.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize cart icon
    updateCartIcon();
});

export { addToCart, removeFromCart };
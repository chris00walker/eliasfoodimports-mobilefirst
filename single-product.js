import { featuredProductsData, newArrivalsData } from './data.js';
import { addToCart } from './cart.js';
import { updateCartIconUtility } from './cartUtility.js';

// Keep the data arrays separate
const featuredProducts = featuredProductsData;
const newArrivals = newArrivalsData;

document.addEventListener("DOMContentLoaded", function () {
    try {
        console.log("DOMContentLoaded fired");  // Debug 1

        function generateSingleProductHTML(product) {
            return `
    <article class="product-card single-product-card">
        <img src="${product.img}" alt="${product.alt}" class="product-image">
        <div class="description">
            <span class="product-brand">${product.brand}</span>
            <h5 class="product-name">${product.name}</h5>
            <div class="star">
                ${'<i class="fas fa-star"></i>'.repeat(product.stars)}
            </div>
            <div class="product-info">
                <span class="product-price">$${product.price}</span>
                <button class="add-to-cart button" data-product="${encodeURIComponent(JSON.stringify(product))}">Add to Cart</button>
                <span class="cart"><i class="fal fa-shopping-cart"></i></span>
            </div>
        </div>
    </article>
        `;
        }

        function displaySingleProduct() {
            const { index, type } = getProductIdFromURL();  // Updated
            console.log("Product Index from URL: ", index, " Type: ", type);

            if (index === null) {
                console.error("Invalid product index.");
                return;
            }

            const product = getProductById(index, type);  // Updated
            console.log("Product Data: ", product);

            const productContainer = document.getElementById('product-container');
            const html = generateSingleProductHTML(product);
            productContainer.innerHTML = html;
        }

        function getProductIdFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            const index = parseInt(urlParams.get('index'), 10);
            const type = urlParams.get('type');  // New line to get 'type'
            return { index: isNaN(index) ? null : index, type: type || null };  // Updated to return an object
        }

        function getProductById(index, type) {
            // Choose the right array based on 'type'
            const productsData = type === 'featured' ? featuredProducts : newArrivals;
            return productsData[index];
        }

        displaySingleProduct();

        // Load cart size from local storage and update the icon
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            console.error("Error parsing cart from local storage:", e);
            cart = [];
        }

        updateCartIconUtility(cart);
    } catch (err) {
        console.error("An error occurred: ", err);
    }
});

document.body.addEventListener("click", function (event) {
    if (event.target.matches('.add-to-cart')) {
        try {
            const productToAdd = JSON.parse(decodeURIComponent(event.target.getAttribute('data-product')));
            if (!productToAdd) {
                console.error("Invalid product data.");
                return;
            }
            addToCart(productToAdd);
        } catch (err) {
            console.error("An error occurred while adding to cart: ", err);
        }
    }
});

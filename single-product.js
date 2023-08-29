import { featuredProductsData, newArrivalsData } from './data.js';
import { addToCart } from './cart.js';

const productsData = [...featuredProductsData, ...newArrivalsData];

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
                <button class="add-to-cart button" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                <span class="cart"><i class="fal fa-shopping-cart"></i></span>
            </div>
        </div>
    </article>
        `;
        }

        function displaySingleProduct() {
            const index = getProductIdFromURL();
            console.log("Product Index from URL: ", index);  // Debug 2

            if (index === null || index >= productsData.length) {
                console.error("Invalid product index.");
                return;
            }

            const product = getProductById(index);
            console.log("Product Data: ", product);  // Debug 3

            const productContainer = document.getElementById('product-container');

            if (!productContainer) {
                console.error("Product container not found.");
                return;
            }

            const html = generateSingleProductHTML(product);
            productContainer.innerHTML = html;
        }

        function getProductIdFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            const index = parseInt(urlParams.get('index'), 10);
            return isNaN(index) ? null : index;
        }

        function getProductById(index) {
            return productsData[index];
        }

        displaySingleProduct();

        // Load cart size from local storage and update the icon
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.length;
        const cartIcons = document.querySelectorAll('.cart');

        if (!cartIcons.length) {
            console.error("Cart icons not found.");
            return;
        }

        cartIcons.forEach(cartIcon => {
            cartIcon.innerHTML = `<i class="fal fa-shopping-cart"></i> ${cartCount}`;
        });
    } catch (err) {
        console.error("An error occurred: ", err);
    }
});

document.body.addEventListener("click", function (event) {
    if (event.target.matches('.add-to-cart')) {
        try {
            const productToAdd = JSON.parse(event.target.getAttribute('data-product'));
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

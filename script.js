import { featuredProductsData, newArrivalsData } from './data.js';
import { addToCart } from './cart.js';
import { updateCartIconUtility } from './cartUtility.js';

try {
    document.addEventListener("DOMContentLoaded", function () {
        try {
            // Function to generate HTML for a product
            function createProductHTML(product, index, arrayType) {
                return `
                    <article class="product-card">
                        <a href="single-product.html?type=${arrayType}&index=${index}">
                            <img src="${product.img}" alt="${product.alt}" class="product-image" data-index="${index}">
                        </a>
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

            // Get product containers
            const proContainer1 = document.querySelector('#featured-products .pro-container');
            const proContainer2 = document.querySelector('#new-arrivals .pro-container');

            if (!proContainer1 || !proContainer2) {
                throw new Error("Product containers not found");
            }

            // Generate and append product HTML for section 1
            let featuredProductsHTML = '';
            featuredProductsData.forEach((product, index) => {
                featuredProductsHTML += createProductHTML(product, index, 'featured');
            });
            proContainer1.innerHTML = featuredProductsHTML;

            // Generate and append product HTML for new-arrivals section
            let newArrivalsHTML = '';
            newArrivalsData.forEach((product, index) => {
                newArrivalsHTML += createProductHTML(product, index, 'newArrivals');
            });
            proContainer2.innerHTML = newArrivalsHTML;

            // Load cart size from local storage and update the icon
            let cart;
            try {
                cart = JSON.parse(localStorage.getItem('cart')) || [];
            } catch (e) {
                console.error("Error parsing cart from local storage:", e);
                cart = [];
            }

            updateCartIconUtility(cart);

            // New code for handling "Add to Cart" clicks
            document.body.addEventListener("click", function (event) {
                try {
                    if (event.target.matches('.add-to-cart')) {
                        const productJSON = decodeURIComponent(event.target.getAttribute('data-product'));
                        const product = JSON.parse(productJSON);
                        addToCart(product);
                    }
                } catch (e) {
                    console.error("An error occurred during click event:", e);
                }
            });

        } catch (e) {
            console.error("An error occurred during click event:", e);
        }
    });
} catch (e) {
    console.error("An error occurred in the script:", e);
}

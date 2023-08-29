import { featuredProductsData, newArrivalsData } from './data.js';
import { addToCart } from './cart.js';

try {
    document.addEventListener("DOMContentLoaded", function () {
        try {
            // Function to generate HTML for a product
            function createProductHTML(product, index) {
                return `
                    <article class="product-card">
                        <a href="single-product.html?index=${index}">
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
                                <button class="add-to-cart button" data-product='${JSON.stringify(product)}'>Add to Cart</button>
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
                featuredProductsHTML += createProductHTML(product, index);
            });
            proContainer1.innerHTML = featuredProductsHTML;

            // Generate and append product HTML for new-arrivals section
            let newArrivalsHTML = '';
            newArrivalsData.forEach((product, index) => {
                newArrivalsHTML += createProductHTML(product, index);
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

            const cartCount = cart.length;
            document.querySelectorAll('.cart').forEach(cartIcon => {
                cartIcon.innerHTML = `<i class="fal fa-shopping-cart"></i> ${cartCount}`;
            });
        } catch (e) {
            console.error("An error occurred in DOMContentLoaded:", e);
        }
    });

    document.body.addEventListener("click", function (event) {
        try {
            if (event.target.matches('.add-to-cart')) {
                const productJSON = event.target.getAttribute('data-product');
                const product = JSON.parse(productJSON);
                addToCart(product);
            }
        } catch (e) {
            console.error("An error occurred during click event:", e);
        }
    });
} catch (e) {
    console.error("An error occurred in the script:", e);
}





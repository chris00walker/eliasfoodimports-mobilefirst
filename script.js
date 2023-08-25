import { featuredProductsData, newArrivalsData } from './data.js';

document.addEventListener("DOMContentLoaded", function () {

    // Function to generate HTML for a product

    function createProductHTML(product, index,) {
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
    featuredProductsData.forEach((product, index) => {
        featuredProductsHTML += createProductHTML(product, index, 'featured');
    });

    proContainer1.innerHTML = featuredProductsHTML;

    // Generate and append product HTML for new-arrivals section
    let newArrivalsHTML = '';
    newArrivalsData.forEach((product, index) => {
        newArrivalsHTML += createProductHTML(product, index, 'new');
    });
    proContainer2.innerHTML = newArrivalsHTML;
})
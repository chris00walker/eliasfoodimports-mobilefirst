import { featuredProductsData, newArrivalsData } from './data.js';

const productsData = [...featuredProductsData, ...newArrivalsData];

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded fired");  // Debug 1

    // function generateSingleProductHTML(product) {
    //     const mainImageHTML = `<img src="${product.img}" width="100%" id="MainImg" alt="">`;
    //     return `
    // <div class="pro-container single-pro-image" role="list">
    //     ${mainImageHTML}
    // </div>
    // <div class="single-pro-details">
    //     <h6>${product.brand}</h6>
    //     <h4>${product.name}</h4>
    //     <h2>$${product.price}</h2>
    // </div>
    // `;
    // }

    function generateSingleProductHTML(product, index) {
        return `
<article class="product-card single-product-card">
    <img src="${product.img}" alt="${product.alt}" class="product-image" data-index="${index}">
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


    function displaySingleProduct() {
        const index = getProductIdFromURL();
        console.log("Product Index from URL: ", index);  // Debug 2

        const product = getProductById(index);
        console.log("Product Data: ", product);  // Debug 3

        const html = generateSingleProductHTML(product);
        document.getElementById('product-container').innerHTML = html;
    }

    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const index = parseInt(urlParams.get('index'), 10);
        return index;
    }

    function getProductById(index) {
        return productsData[index];
    }

    displaySingleProduct();
});

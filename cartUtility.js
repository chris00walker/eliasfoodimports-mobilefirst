// cartUtility.js
export function updateCartIconUtility(cart) {
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

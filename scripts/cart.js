document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }
});

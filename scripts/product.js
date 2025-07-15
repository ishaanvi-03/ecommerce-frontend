document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(product => {
                productDetailContainer.innerHTML = `
                    <div class="product-detail-card">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-info">
                            <h2>${product.title}</h2>
                            <p class="product-price">$${product.price}</p>
                            <p>${product.description}</p>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                `;

                // Add to cart button functionality
                const addToCartButton = productDetailContainer.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', () => {
                    addToCart(product);
                    alert('Product added to cart!');
                    alert('Product added to cart!');
updateCartCount(); // Refresh count

                });

            })
            .catch(err => {
                console.error(err);
                productDetailContainer.textContent = 'Failed to load product details.';
            });
    } else {
        productDetailContainer.textContent = 'No product selected.';
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

});

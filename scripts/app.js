document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error');

    // Caching mechanism: check if data exists in localStorage
    const cachedProducts = localStorage.getItem('products');

    if (cachedProducts) {
        displayProducts(JSON.parse(cachedProducts));
        loading.style.display = 'none';
    } else {
        fetchProducts();
    }

    function fetchProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                localStorage.setItem('products', JSON.stringify(products));  // Cache
                displayProducts(products);
                loading.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                errorMessage.textContent = 'Failed to load products. Please try again later.';
                loading.style.display = 'none';
            });
    }

function displayProducts(products) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <h3 class="product-title">${product.title}</h3>
            </a>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

});

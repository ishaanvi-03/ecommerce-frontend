document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');

    // Fetch data from FakeStore API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                // Create product card
                const card = document.createElement('div');
                card.classList.add('product-card');

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;

                productGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productGrid.innerHTML = '<p>Failed to load products.</p>';
        });
});

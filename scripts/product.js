document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    let quantity = 1;

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(product => {
                renderProduct(product);
            })
            .catch(err => {
                productDetailContainer.textContent = 'Failed to load product details.';
            });
    }

    function renderProduct(product) {
        productDetailContainer.innerHTML = `
            <div class="product-detail-card">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.title}" id="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h2>${product.title}</h2>
                    <p id="product-price">$${product.price.toFixed(2)}</p>
                    
                    <div class="variations">
                        <label for="size">Size:</label>
                        <select id="size">
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                        </select>
                    </div>

                    <div class="quantity-selector">
                        <button id="decrease-qty">-</button>
                        <span id="quantity">${quantity}</span>
                        <button id="increase-qty">+</button>
                    </div>

                    <p>Total: <span id="total-price">$${product.price.toFixed(2)}</span></p>

                    <button class="add-to-cart">Add to Cart</button>
                    <p id="feedback" class="feedback"></p>
                </div>
            </div>
        `;

        setupInteractivity(product);
    }

    function setupInteractivity(product) {
        const quantityDisplay = document.getElementById('quantity');
        const totalPriceDisplay = document.getElementById('total-price');
        const feedback = document.getElementById('feedback');
        const basePrice = product.price;

        // Quantity Controls
        document.getElementById('increase-qty').addEventListener('click', () => {
            quantity++;
            updateDisplay();
        });

        document.getElementById('decrease-qty').addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateDisplay();
            }
        });

        function updateDisplay() {
            quantityDisplay.textContent = quantity;
            totalPriceDisplay.textContent = `$${(basePrice * quantity).toFixed(2)}`;
        }

        // Add to Cart
        document.querySelector('.add-to-cart').addEventListener('click', () => {
            const size = document.getElementById('size').value;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                id: product.id,
                title: product.title,
                price: basePrice,
                quantity: quantity,
                size: size,
                image: product.image
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            feedback.textContent = "Added to cart!";
            setTimeout(() => feedback.textContent = '', 2000);
        });

        setupImageZoom();
    }

    function setupImageZoom() {
        const img = document.getElementById('product-image');
        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.5)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
        img.style.transition = 'transform 0.3s ease';
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    let quantity = 1;

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(product => {
                renderProduct(product);
            })
            .catch(err => {
                productDetailContainer.textContent = 'Failed to load product details.';
            });
    }

    function renderProduct(product) {
        productDetailContainer.innerHTML = `
            <div class="product-detail-card">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.title}" id="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h2>${product.title}</h2>
                    <p id="product-price">$${product.price.toFixed(2)}</p>
                    
                    <div class="variations">
                        <label for="size">Size:</label>
                        <select id="size">
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                        </select>
                    </div>

                    <div class="quantity-selector">
                        <button id="decrease-qty">-</button>
                        <span id="quantity">${quantity}</span>
                        <button id="increase-qty">+</button>
                    </div>

                    <p>Total: <span id="total-price">$${product.price.toFixed(2)}</span></p>

                    <button class="add-to-cart">Add to Cart</button>
                    <p id="feedback" class="feedback"></p>
                </div>
            </div>
        `;

        setupInteractivity(product);
    }

    function setupInteractivity(product) {
        const quantityDisplay = document.getElementById('quantity');
        const totalPriceDisplay = document.getElementById('total-price');
        const feedback = document.getElementById('feedback');
        const basePrice = product.price;

        // Quantity Controls
        document.getElementById('increase-qty').addEventListener('click', () => {
            quantity++;
            updateDisplay();
        });

        document.getElementById('decrease-qty').addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateDisplay();
            }
        });

        function updateDisplay() {
            quantityDisplay.textContent = quantity;
            totalPriceDisplay.textContent = `$${(basePrice * quantity).toFixed(2)}`;
        }

        // Add to Cart
        document.querySelector('.add-to-cart').addEventListener('click', () => {
            const size = document.getElementById('size').value;
            const cartItem = {
                id: product.id,
                title: product.title,
                price: basePrice,
                quantity: quantity,
                size: size,
                image: product.image
            };

            addToCart(cartItem);
            feedback.textContent = "✅ Item added to cart!";
            feedback.style.color = "green";
            setTimeout(() => feedback.textContent = '', 2000);
        });

        setupImageZoom();
    }

    function setupImageZoom() {
        const img = document.getElementById('product-image');
        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.5)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
        img.style.transition = 'transform 0.3s ease';
    }

    // Cart Storage with Duplicate Handling
    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists with same size
        const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.size === item.size);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Sum quantities for cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    }

    // Update cart count on page load
    updateCartCount();
});


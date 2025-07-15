document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const checkoutBtn = document.getElementById('checkout');
    const continueShoppingBtn = document.getElementById('continue-shopping');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();

    continueShoppingBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function renderCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutBtn.disabled = true;
            updateCartCount();
            return;
        }

        cartContainer.innerHTML = '';
        let totalCost = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalCost += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-details">
                    <h3>${item.title}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty" data-index="${index}">+</button>
                    </div>
                    <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `<h2>Total: $${totalCost.toFixed(2)}</h2>`;
        cartContainer.appendChild(totalElement);

        checkoutBtn.disabled = false;
        attachEventListeners();
        updateCartCount();
    }

    function attachEventListeners() {
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                cart[index].quantity++;
                saveCart();
            });
        });

        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    saveCart();
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                cart.splice(index, 1);
                saveCart();
            });
        });

        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to checkout...');
            // Redirect or handle checkout logic
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
});

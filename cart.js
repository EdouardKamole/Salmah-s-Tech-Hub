const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    let cartTotal = 0;
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        const cartItem = `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${item.imgSrc}" class="card-img" alt="${item.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price.toFixed(2)}</p>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.name}', -1)">-</button>
                                </div>
                                <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.name}', 1)">+</button>
                                </div>
                            </div>
                            <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem;
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function updateQuantity(productName, change) {
    const item = cartItems.find(item => item.name === productName);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productName);
    } else {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    }
}

function removeFromCart(productName) {
    const itemIndex = cartItems.findIndex(item => item.name === productName);
    if (itemIndex === -1) return;

    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

document.getElementById('checkout-button').addEventListener('click', () => {
    document.getElementById('payment-methods').style.display = 'block';
});

updateCartDisplay();

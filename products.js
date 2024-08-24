const products = [
    {
        name: 'Smart Speaker',
        category: 'smart-speakers',
        brand: 'brand-a',
        price: 49.99,
        imgSrc: 'images/speaker.jpg'
    },
    {
        name: 'Tablet',
        category: 'tablets',
        brand: 'brand-b',
        price: 149.99,
        imgSrc: 'images/tablet.jpg'
    },
    {
        name: 'Home Automation System',
        category: 'home-automation',
        brand: 'brand-a',
        price: 199.99,
        imgSrc: 'images/home-automation.jpg'
    },
    {
        name: 'Smart Thermostat',
        category: 'home-automation',
        brand: 'brand-c',
        price: 99.99,
        imgSrc: 'images/thermostat.jpg'
    },
    {
        name: 'Smart Light Bulb',
        category: 'home-automation',
        brand: 'brand-a',
        price: 29.99,
        imgSrc: 'images/light-bulb.jpg'
    },
    {
        name: 'Smart Watch',
        category: 'wearables',
        brand: 'brand-d',
        price: 199.99,
        imgSrc: 'images/smart-watch.jpg'
    },
    {
        name: 'Fitness Tracker',
        category: 'wearables',
        brand: 'brand-e',
        price: 99.99,
        imgSrc: 'images/fitness-tracker.jpg'
    },
    {
        name: 'Wireless Earbuds',
        category: 'audio',
        brand: 'brand-f',
        price: 79.99,
        imgSrc: 'images/wireless-earbuds.jpg'
    },
    {
        name: 'Bluetooth Headphones',
        category: 'audio',
        brand: 'brand-g',
        price: 129.99,
        imgSrc: 'images/headphones.jpg'
    },
    {
        name: '4K TV',
        category: 'televisions',
        brand: 'brand-h',
        price: 499.99,
        imgSrc: 'images/4k-tv.jpg'
    },
    {
        name: 'Laptop',
        category: 'computers',
        brand: 'brand-i',
        price: 899.99,
        imgSrc: 'images/laptop.jpg'
    },
    {
        name: 'Gaming Console',
        category: 'gaming',
        brand: 'brand-j',
        price: 399.99,
        imgSrc: 'images/gaming-console.jpg'
    },
    {
        name: 'Drone',
        category: 'drones',
        brand: 'brand-k',
        price: 299.99,
        imgSrc: 'images/drone.jpg'
    },
    {
        name: 'Action Camera',
        category: 'cameras',
        brand: 'brand-l',
        price: 199.99,
        imgSrc: 'images/action-camera.jpg'
    },
    {
        name: 'Bluetooth Speaker',
        category: 'audio',
        brand: 'brand-m',
        price: 49.99,
        imgSrc: 'images/bluetooth-speaker.jpg'
    },
    {
        name: 'Smart Lock',
        category: 'home-automation',
        brand: 'brand-n',
        price: 149.99,
        imgSrc: 'images/smart-lock.jpg'
    },
    {
        name: 'Robot Vacuum',
        category: 'home-appliances',
        brand: 'brand-o',
        price: 249.99,
        imgSrc: 'images/robot-vacuum.jpg'
    },
    {
        name: 'Electric Scooter',
        category: 'transportation',
        brand: 'brand-p',
        price: 299.99,
        imgSrc: 'images/electric-scooter.jpg'
    },
    {
        name: 'VR Headset',
        category: 'gaming',
        brand: 'brand-q',
        price: 399.99,
        imgSrc: 'images/vr-headset.jpg'
    },
    {
        name: 'Portable Charger',
        category: 'accessories',
        brand: 'brand-r',
        price: 29.99,
        imgSrc: 'images/portable-charger.jpg'
    }
];

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (!product) return;

    const cartItem = cartItems.find(item => item.name === productName);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${productName} added to cart!`);
}

function displayProducts(productList) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    productList.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.imgSrc}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary mt-auto" onclick="addToCart('${product.name}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

function filterProducts() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const brandFilter = document.getElementById('brand-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesBrand = !brandFilter || product.brand === brandFilter;
        let matchesPrice = true;
        if (priceFilter) {
            const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
            matchesPrice = product.price >= minPrice && (!maxPrice || product.price <= maxPrice);
        }

        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    displayProducts(filteredProducts);
}

document.getElementById('search-bar').addEventListener('input', filterProducts);
document.getElementById('category-filter').addEventListener('change', filterProducts);
document.getElementById('brand-filter').addEventListener('change', filterProducts);
document.getElementById('price-filter').addEventListener('change', filterProducts);

// Initial display
displayProducts(products);

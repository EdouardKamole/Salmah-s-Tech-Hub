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
        name: 'Laptop',
        category: 'laptops',
        brand: 'brand-c',
        price: 899.99,
        imgSrc: 'images/laptop.jpg'
    },
    {
        name: 'Mobile Phone',
        category: 'mobile-phones',
        brand: 'brand-d',
        price: 699.99,
        imgSrc: 'images/mobile-phone.jpg'
    },
    {
        name: 'Headphones',
        category: 'headphones',
        brand: 'brand-e',
        price: 199.99,
        imgSrc: 'images/headphones.jpg'
    },
    {
        name: 'Television',
        category: 'televisions',
        brand: 'brand-f',
        price: 1299.99,
        imgSrc: 'images/television.jpg'
    },
    {
        name: 'Camera',
        category: 'cameras',
        brand: 'brand-g',
        price: 499.99,
        imgSrc: 'images/camera.jpg'
    },
    {
        name: 'Blender',
        category: 'kitchen-appliances',
        brand: 'brand-h',
        price: 99.99,
        imgSrc: 'images/blender1.jpg'
    },
    {
        name: 'Gaming Console',
        category: 'gaming-consoles',
        brand: 'brand-i',
        price: 399.99,
        imgSrc: 'images/gaming-console.jpg'
    },
    {
        name: 'Drill',
        category: 'tools',
        brand: 'brand-j',
        price: 79.99,
        imgSrc: 'images/drill1.jpg'
    },
    {
        name: 'Mixer',
        category: 'kitchen-appliances',
        brand: 'brand-h',
        price: 89.99,
        imgSrc: 'images/mixer.jpg'
    },
    {
        name: 'Wireless Earbuds',
        category: 'headphones',
        brand: 'brand-e',
        price: 149.99,
        imgSrc: 'images/wireless-earbuds.jpg'
    },
    {
        name: 'Smart TV',
        category: 'televisions',
        brand: 'brand-f',
        price: 1599.99,
        imgSrc: 'images/smart-tv.jpg'
    },
    
    
    
    {
        name: 'Soundbar',
        category: 'home-automation',
        brand: 'brand-a',
        price: 299.99,
        imgSrc: 'images/soundbar.jpg'
    },
    
   
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
                <div class="card">
                    <img src="${product.imgSrc}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.name}')">Add to Cart</button>
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

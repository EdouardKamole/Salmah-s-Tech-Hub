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
    
    
];
    

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
                        <a href="#" class="btn btn-primary">Add to Cart</a>
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

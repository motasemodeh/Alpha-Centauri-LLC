// Mock product data
const products = [
    { id: 1, name: "Nuclear Fusion (αFE)", price: 500000, category: "engines", engineType: "fusion", description: "Produces energy by fusing atomic nuclei, a clean and powerful energy source.", img: "images/fusion engine.png", available: true },
    { id: 2, name: "Antimatter (αAME)", price: 300000, category: "engines", engineType: "antimatter", description: "Produces energy through the annihilation of matter with antimatter.", img: "images/antimatter engine.png", available: true },
    { id: 3, name: "Argentum Starflyer", price: 10000, category: "spaceships", engineType: "αFE, αAME", description: "Efficiency Meets Elegance in the Stars.", img: "images/Argentum-Starflyer-2.png", available: true },
    { id: 4, name: "Celestial Navigator", price: 500000, category: "engines", engineType: "fusion", description: "Navigate the Cosmos with Unmatched Luxury", img: "images/Celestial Navigator.png", available: true },
    { id: 5, name: "Titan Hauler", price: 300000, category: "engines", engineType: "antimatter", description: "Hauling Your Dreams Across the Galaxy", img: "images/Titan Hauler.png", available: true },
    { id: 6, name: "Compact Purifier: AquaStar Voyager", price: 10000, category: "spaceships", engineType: "αFE, αAME", description: "Embrace the purity of space with every", img: "images/compact - Aquastar.png", available: true },
    { id: 7, name: "Standard Purifier: HydroGenius 3000", price: 500000, category: "engines", engineType: "fusion", description: "Hydration revolutionized for the spacefarer. With the HydroGenius 3000", img: "images/standard - Hydrogenius.png", available: true },
    { id: 8, name: "Eco-Friendly Purifier: Celestial ClearFlow, price: 300000", category: "engines", engineType: "antimatter", description: "Sustain your space odyssey with nature’s touch. Celestial ClearFlow is …", img: "images/eco - celestial clearflow.png", available: true },
    { id: 9, name: "High-Capacity Purifier: Galactic AquaMaster", price: 10000, category: "spaceships", engineType: "αFE, αAME", description: "Quench the thirst of a crew, or a small colony! Galactic AquaMaster", img: "images/high capacity - AquaMaster.png", available: true },
    { id: 10, name: "Luxury Purifier: Neptune’s Oasis", category: "engines", engineType: "antimatter", description: "Indulge in the luxury of the finest water, even in the void of space.", img: "images/Luxurious - Neptune's Oasis.png", available: true },
    { id: 11, name: "Industrial Purifier: Titan HydroEngine", price: 10000, category: "spaceships", engineType: "αFE, αAME", description: "Designed for the demands of space industries, Titan HydroEngine ", img: "images/industrial - Titan HydroEngine.png", available: true },
];

// Function to update URL query parameters
function updateQueryParams(param, value) {
    const urlParams = new URLSearchParams(window.location.search);

    if (value) {
        urlParams.set(param, value); // Update the parameter value
    } else {
        urlParams.delete(param); // Remove the parameter if no value is provided
    }

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', newUrl); // Update the URL without reloading the page
}

// Function to reset query parameters
function resetQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = ['category', 'price', 'availability', 'engine-type'];
    filters.forEach(filter => urlParams.delete(filter));
    
    // Remove query string if no parameters are left
    const newUrl = urlParams.toString() ? `${window.location.pathname}?${urlParams.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
}

// Function to filter products based on the selected filters
function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    const selectedPrice = urlParams.get('price');
    const selectedAvailability = urlParams.get('availability');
    const selectedEngineType = urlParams.get('engine-type');

    // Filter products
    let filteredProducts = products.filter(product => {
        let matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        let matchesPrice = true;
        if (selectedPrice === 'below-500000') {
            matchesPrice = product.price < 500000;
        } else if (selectedPrice === 'above-500000') {
            matchesPrice = product.price >= 500000;
        }
        let matchesAvailability = selectedAvailability === 'available' ? product.available : selectedAvailability === 'unavailable' ? !product.available : true;
        let matchesEngineType = selectedEngineType ? product.engineType === selectedEngineType : true;

        return matchesCategory && matchesPrice && matchesAvailability && matchesEngineType;
    });

    // Update the product grid with filtered products
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear the current products

    // Display filtered products
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price.toLocaleString()}</p>
                <a href="product.html?id=${product.id}" class="view-product">View Details</a>
            `;
            productGrid.appendChild(productDiv);
        });
    } else {
        productGrid.innerHTML = '<p>No products found matching your filters.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-dropdown button');
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // Toggle dropdown visibility on button click
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const dropdownId = button.id.replace('Btn', 'Dropdown');
            const dropdown = document.getElementById(dropdownId);

            // Hide other dropdowns
            dropdownContents.forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                }
            });

            // Toggle the visibility of the clicked dropdown
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Handle radio button changes
    dropdownContents.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
            const target = e.target;
            if (target.tagName === 'INPUT' && target.type === 'radio') {
                const value = target.value;
                const filterType = dropdown.id.replace('Dropdown', '');

                updateQueryParams(filterType, value);
                filterProducts();
                dropdown.style.display = 'none'; // Hide dropdown after selection
            }
        });
    });

    // Handle clear filters button click
    clearFiltersBtn.addEventListener('click', () => {
        resetQueryParams();
        filterProducts();
    });

    // Hide all dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            dropdownContents.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Apply filters on page load
    filterProducts();
});

// Function to update URL query parameters
function updateQueryParams(param, value) {
    const urlParams = new URLSearchParams(window.location.search);

    if (value) {
        urlParams.set(param, value); // Update the parameter value
    } else {
        urlParams.delete(param); // Remove the parameter if no value is provided
    }

    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState(null, null, newUrl); // Update the URL without reloading the page
}

// Function to reset query parameters
function resetQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = ['category', 'price', 'availability', 'engine-type'];
    filters.forEach(filter => urlParams.delete(filter));

    // Remove query string if no parameters are left
    const newUrl = urlParams.toString() ? `${window.location.pathname}?${urlParams.toString()}` : window.location.pathname;
    window.history.replaceState(null, null, newUrl);
}

// Function to filter products based on the selected filters
function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const priceFilter = urlParams.get('price');
    const availabilityFilter = urlParams.get('availability');
    const engineTypeFilter = urlParams.get('engine-type');

    // Apply filters
    let filteredProducts = products.filter(product => {
        return (!categoryFilter || product.category === categoryFilter) &&
               (!priceFilter || (priceFilter === 'below-500000' ? product.price < 500000 : product.price >= 500000)) &&
               (!availabilityFilter || (availabilityFilter === 'available' ? product.available : !product.available)) &&
               (!engineTypeFilter || product.engineType === engineTypeFilter);
    });

    // Update product display
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        productGrid.innerHTML = ''; // Clear existing products

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="product.html?id=${product.id}" class="view-product">View Details</a>
            `;
            productGrid.appendChild(productDiv);
        });
    }
}


// Function to get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to display product details
function displayProduct() {
    const productId = getUrlParameter('id');
    const product = products.find(p => p.id == productId);

    if (product) {
        document.getElementById('product-image').src = product.img;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `$${product.price.toLocaleString()}`;
    } else {
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
    }
}

// Run on page load
window.addEventListener('DOMContentLoaded', displayProduct);



// get Quote popup

        // JavaScript to handle the form display and submission
        document.addEventListener('DOMContentLoaded', () => {
            const getQuoteBtn = document.getElementById('get-quote-btn');
            const quoteForm = document.getElementById('quote-form');
            const closeQuoteForm = document.getElementById('close-quote-form');
            const quoteRequestForm = document.getElementById('quote-request-form');

            // Show the quote form when "Get a Quote" button is clicked
            getQuoteBtn.addEventListener('click', () => {
                quoteForm.style.display = 'flex';
            });

            // Hide the quote form when the close button is clicked
            closeQuoteForm.addEventListener('click', () => {
                quoteForm.style.display = 'none';
            });

            // Handle form submission
            quoteRequestForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle form data here (e.g., send to server)
                alert('Quote request submitted!');
                quoteForm.style.display = 'none';
                quoteRequestForm.reset(); // Reset the form
            });
        });

// Function to toggle the visibility of the quote form
function toggleQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    const body = document.body;

    if (quoteForm.style.display === 'block') {
        quoteForm.style.display = 'none';
        body.classList.remove('no-scroll'); // Enable scrolling
    } else {
        quoteForm.style.display = 'block';
        body.classList.add('no-scroll'); // Disable scrolling
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the quote form visibility
    function toggleQuoteForm() {
        const form = document.querySelector('.quote-form');
        if (form) {
            form.classList.toggle('visible');
        }
    }

    // Attach click event to the product info button if it exists
    const productButton = document.querySelector('.product-info button');
    if (productButton) {
        productButton.addEventListener('click', toggleQuoteForm);
    }

    // Handle menu toggle for mobile navigation
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-visible');
        });
    }

    // Example function to display product details
    function displayProduct(product) {
        const productDetailElement = document.getElementById('productDetail');
        if (productDetailElement) {
            productDetailElement.innerHTML = `
                <h1>${product.name}</h1>
                <img src="${product.img}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
        }
    }

    // Example usage: Display a product (you would replace this with your actual product data)
    const exampleProduct = {
        name: "Example Product",
        img: "images/example.png",
        description: "This is an example product.",
        price: 10000
    };
    displayProduct(exampleProduct);
});

        
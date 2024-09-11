// Mock product data
const products = [
    { id: 1, name: "الاندماج النووي (αFE)", price: 500000, category: "محركات", engineType: "اندماج", description: "ينتج الطاقة من خلال دمج النوى الذرية، مصدر طاقة نظيف وقوي.", img: "images/fusion engine.png", available: true },
    { id: 2, name: "المادة المضادة (αAME)", price: 300000, category: "محركات", engineType: "مادة مضادة", description: "ينتج الطاقة من خلال تدمير المادة بالمادة المضادة.", img: "images/antimatter engine.png", available: true },
    { id: 3, name: "Argentum Starflyer", price: 10000, category: "سفن فضاء", engineType: "αFE, αAME", description: "الكفاءة تلتقي بالأناقة في النجوم.", img: "images/Argentum-Starflyer-2.png", available: true },
    { id: 4, name: "ملاح النجوم", price: 500000, category: "محركات", engineType: "اندماج", description: "استكشف الكون برفاهية لا مثيل لها", img: "images/Celestial Navigator.png", available: true },
    { id: 5, name: "Titan Hauler", price: 300000, category: "محركات", engineType: "مادة مضادة", description: "نقل أحلامك عبر المجرة", img: "images/Titan Hauler.png", available: true },
    { id: 6, name: "منقى مدمج: AquaStar Voyager", price: 10000, category: "سفن فضاء", engineType: "αFE, αAME", description: "احتضن نقاء الفضاء مع كل ", img: "images/compact - Aquastar.png", available: true },
    { id: 7, name: "منقى قياسي: HydroGenius 3000", price: 500000, category: "محركات", engineType: "اندماج", description: "ثورة في الترطيب للفضائيين. مع HydroGenius 3000", img: "images/standard - Hydrogenius.png", available: true },
    { id: 8, name: "منقى صديق للبيئة: Celestial ClearFlow", price: 300000, category: "محركات", engineType: "مادة مضادة", description: "ادعم رحلتك الفضائية بلمسة طبيعية. Celestial ClearFlow هو ...", img: "images/eco - celestial clearflow.png", available: true },
    { id: 9, name: "منقى عالي السعة: Galactic AquaMaster", price: 10000, category: "سفن فضاء", engineType: "αFE, αAME", description: "اروي عطش طاقم أو مستعمرة صغيرة! Galactic AquaMaster", img: "images/high capacity - AquaMaster.png", available: true },
    { id: 10, name: "منقى فاخر: واحة نبتون", category: "محركات", engineType: "مادة مضادة", description: "استمتع بأرقى المياه، حتى في فضاء الكون.", img: "images/Luxurious - Neptune's Oasis.png", available: true },
    { id: 11, name: "منقى صناعي: Titan HydroEngine", price: 10000, category: "سفن فضاء", engineType: "αFE, αAME", description: "مصمم لتلبية احتياجات الصناعات الفضائية، Titan HydroEngine", img: "images/industrial - Titan HydroEngine.png", available: true },
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

        // Example usage: Open the form on button click
        document.querySelector('.product-info button').addEventListener('click', toggleQuoteForm);
        

        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('menuToggle');
            const mainNav = document.getElementById('mainNav');
        
            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('nav-visible');
            });
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('menuToggle');
            const mainNav = document.getElementById('mainNav');
        
            menuToggle.addEventListener('click', () => {
                console.log('Menu toggle clicked');
                
                if (mainNav.classList.contains('nav-hidden')) {
                    mainNav.classList.remove('nav-hidden');
                    mainNav.classList.add('nav-visible');
                } else {
                    mainNav.classList.remove('nav-visible');
                    mainNav.classList.add('nav-hidden');
                }
            });
        });
        
        
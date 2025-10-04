document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-count").textContent = cartCount;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(productName, productPrice, productImage) {
        let existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }
        saveCart();
        showToast(`${productName} added to cart!`);
    }

    function showToast(message) {
        const toast = document.getElementById("cart-toast");
        toast.textContent = message;
        toast.style.display = "block";
        setTimeout(() => {
            toast.style.display = "none";
        }, 2000);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productElement = this.closest(".product-card");
            let productName = productElement.getAttribute("data-name");
            let productPrice = parseFloat(productElement.getAttribute("data-price"));
            let productImage = productElement.getAttribute("data-image");
            addToCart(productName, productPrice, productImage);
        });
    });

    updateCartCount();
});




const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "21 Mar 2026";

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000);

document.querySelector(".search-bar").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    let searchQuery = document.getElementById("search-input").value.toLowerCase();
    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        let productName = product.getAttribute("data-name").toLowerCase();

        if (productName.includes(searchQuery)) {
            product.style.display = "block"; // Show matching products
        } else {
            product.style.display = "none"; // Hide non-matching products
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResultsContainer = document.getElementById("search-results");

    function searchProducts() {
        const query = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll(".product-card");

        // Clear previous results
        searchResultsContainer.innerHTML = "";

        let found = false;

        products.forEach(product => {
            const name = product.getAttribute("data-name").toLowerCase();
            const price = product.getAttribute("data-price");
            const image = product.getAttribute("data-image");

            if (name.includes(query) && query !== "") {
                found = true;

                // Create a search result card
                let resultCard = document.createElement("div");
                resultCard.classList.add("search-result-card");
                resultCard.innerHTML = `
                    <img src="${image}" alt="${name}">
                    <h3>${name}</h3>
                    <p>₹${price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;

                searchResultsContainer.appendChild(resultCard);
            }
        });

        // Show "No results found" if no matches
        if (!found && query !== "") {
            searchResultsContainer.innerHTML = `<p style="color: red; font-size: 18px;">No products found</p>`;
        }
    }

    // Event listener for search input (live search)
    searchInput.addEventListener("input", searchProducts);

    // Event listener for search button
    searchButton.addEventListener("click", searchProducts);
});

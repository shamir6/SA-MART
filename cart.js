document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.getElementById("cart-table-body");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    function updateCartUI() {
        cartTableBody.innerHTML = "";
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            let row = `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" class="product-img" onerror="this.onerror=null;this.src='images/default.png';"></td>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td>
                        <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        ${item.quantity}
                        <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </td>
                    <td>₹${itemTotal}</td>
                    <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
                </tr>
            `;
            cartTableBody.innerHTML += row;
        });

        cartTotal.textContent = totalPrice;
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    window.changeQuantity = function (index, change) {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    };

    updateCartUI();
});

document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.getElementById("checkout-btn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            window.location.href = "checkout.html"; // Redirect to checkout page
        });
    }
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const sendWhatsApp = document.getElementById("sendWhatsApp");
const clearCart = document.getElementById("clearCart");

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        localStorage.removeItem("cart");

        cartItems.innerHTML = "<h3>🛒 السلة فارغة</h3>";
        cartTotal.textContent = "المجموع: 0 دينار";
        return;
    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.qty;
        total += itemTotal;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>سعر القطعة: ${item.price.toFixed(2)} دينار</p>

                <p>الكمية: ${item.qty}</p>

            </div>

            <div class="cart-price">

                ${itemTotal.toFixed(2)} د

            </div>

            <div class="cart-actions">

                <button class="qty-btn" onclick="minus(${index})">
                    ➖
                </button>

                <button class="qty-btn" onclick="plus(${index})">
                    ➕
                </button>

                <button class="remove-btn" onclick="removeItem(${index})">
                    🗑 حذف
                </button>

            </div>

        </div>

        `;
    });

    cartTotal.textContent = `المجموع: ${total.toFixed(2)} دينار`;

    localStorage.setItem("cart", JSON.stringify(cart));
}

window.plus = function(index) {

    cart[index].qty++;
    renderCart();

};

window.minus = function(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    } else {

        cart.splice(index, 1);

    }

    renderCart();

};

window.removeItem = function(index) {

    cart.splice(index, 1);

    renderCart();

};

sendWhatsApp.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("السلة فارغة");

        return;

    }

    window.location.href = "checkout.html";

});

clearCart.addEventListener("click", () => {

    if (confirm("هل أنت متأكد من إفراغ السلة؟")) {

        cart = [];

        localStorage.removeItem("cart");

        renderCart();

    }

});

renderCart();

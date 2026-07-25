let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const sendWhatsApp = document.getElementById("sendWhatsApp");

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<h3>السلة فارغة 🛒</h3>";
        cartTotal.textContent = "المجموع: 0 دينار";
        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartItems.innerHTML += `
        <div class="sandwich-card">

            <h3>${item.name}</h3>

            <p>السعر: ${item.price} دينار</p>

            <p>الكمية: ${item.qty}</p>

            <button onclick="minus(${index})">➖</button>

            <button onclick="plus(${index})">➕</button>

            <button onclick="removeItem(${index})">🗑 حذف</button>

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

    let message = "السلام عليكم، أريد طلب:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        message += `• ${item.name} × ${item.qty}%0A`;

        total += item.price * item.qty;

    });

    message += `%0Aالمجموع: ${total.toFixed(2)} دينار`;

    window.open(`https://wa.me/962779430623?text=${message}`);

});

renderCart();

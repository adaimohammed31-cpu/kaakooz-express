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

        cartItems.innerHTML = "<h3 style='text-align:center; padding: 30px; color: #5d3922;'>🛒 السلة فارغة</h3>";
        cartTotal.textContent = "المجموع: 0 دينار";
        return;
    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.qty;
        total += itemTotal;

        // تصميم البطاقة المدمجة والأفقية لتتحمل الأصناف الكثيرة بكل سلاسة
        cartItems.innerHTML += `
        <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; background: #fff; padding: 14px 18px; border-radius: 14px; border: 2px solid #ead6bd; gap: 12px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <div class="cart-info" style="flex: 1; text-align: right;">
                <h3 style="font-size: 17px; color: #4a2e1b; margin-bottom: 4px;">${item.name}</h3>
                <p style="font-size: 13px; color: #86684c; margin: 0;">السعر: ${item.price.toFixed(2)} د | الكمية: <strong style="color: #0f6c38; font-size: 15px;">${item.qty}</strong></p>
            </div>

            <div class="cart-price" style="font-size: 18px; font-weight: 900; color: #0f6c38; min-width: 70px; text-align: left;">
                ${itemTotal.toFixed(2)} د
            </div>

            <div class="cart-actions" style="display: flex; align-items: center; gap: 6px;">
                <button class="qty-btn" onclick="minus(${index})" style="width: 32px; height: 32px; border: none; border-radius: 8px; background: #0f6c38; color: #fff; font-size: 16px; font-weight: bold; cursor: pointer;">➖</button>
                <button class="qty-btn" onclick="plus(${index})" style="width: 32px; height: 32px; border: none; border-radius: 8px; background: #0f6c38; color: #fff; font-size: 16px; font-weight: bold; cursor: pointer;">➕</button>
                <button class="remove-btn" onclick="removeItem(${index})" style="border: none; padding: 6px 10px; border-radius: 8px; background: #c62828; color: #fff; font-size: 13px; font-weight: bold; cursor: pointer;">🗑</button>
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

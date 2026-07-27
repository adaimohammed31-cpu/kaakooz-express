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

        // تصميم البطاقة بثلاثي الأبعاد (3D) وألوان مريحة وأنيقة
        cartItems.innerHTML += `
        <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; background: linear-gradient(145deg, #ffffff, #fdfbf7); padding: 16px 20px; border-radius: 18px; border: 2px solid #e6d2bc; gap: 15px; margin-bottom: 16px; box-shadow: 0 8px 20px rgba(74, 46, 27, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);">
            
            <div class="cart-info" style="flex: 1; text-align: right;">
                <h3 style="font-size: 18px; color: #4a2e1b; margin-bottom: 6px; font-weight: 800;">${item.name}</h3>
                <p style="font-size: 13px; color: #8c6d53; margin: 0; font-weight: 600;">السعر: ${item.price.toFixed(2)} د | الكمية: <strong style="color: #107c41; font-size: 15px;">${item.qty}</strong></p>
            </div>

            <div class="cart-price" style="background: linear-gradient(145deg, #107c41, #0c5e32); color: #fff; padding: 8px 14px; border-radius: 12px; font-weight: 800; font-size: 16px; box-shadow: 0 4px 10px rgba(16, 124, 65, 0.25); text-align: center; min-width: 75px;">
                ${itemTotal.toFixed(2)} د
            </div>

            <div class="cart-actions" style="display: flex; align-items: center; gap: 8px;">
                <button class="qty-btn" onclick="minus(${index})" style="width: 36px; height: 36px; border: none; border-radius: 12px; background: linear-gradient(145deg, #d97706, #b45309); color: #fff; font-size: 18px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(217, 119, 6, 0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.1s;">➖</button>
                
                <button class="qty-btn" onclick="plus(${index})" style="width: 36px; height: 36px; border: none; border-radius: 12px; background: linear-gradient(145deg, #107c41, #0c5e32); color: #fff; font-size: 18px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(16, 124, 65, 0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.1s;">➕</button>
                
                <button class="remove-btn" onclick="removeItem(${index})" style="border: none; padding: 8px 12px; border-radius: 12px; background: linear-gradient(145deg, #dc2626, #b91c1c); color: #fff; font-size: 13px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);">🗑 حذف</button>
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

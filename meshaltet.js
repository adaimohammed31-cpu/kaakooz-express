
const orderButtons = document.querySelectorAll(".order-btn");
const cartCount = document.getElementById("cartCount");

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.qty;
    });

    if (cartCount) {
        cartCount.textContent = `(${total})`;
    }
}

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const item = cart.find(p => p.name === name);

        if (item) {
            item.qty++;
        } else {
            cart.push({
                name: name,
                price: price,
                qty: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("✅ تمت إضافة الصنف إلى السلة");

    });

});

updateCartCount();

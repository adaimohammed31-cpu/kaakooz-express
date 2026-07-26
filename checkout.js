const confirmOrder = document.getElementById("confirmOrder");

confirmOrder.addEventListener("click", () => {

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let area = document.getElementById("customerArea").value.trim();
    let street = document.getElementById("customerStreet").value.trim();
    let notes = document.getElementById("customerNotes").value.trim();

    let delivery = document.querySelector('input[name="delivery"]:checked').value;

    if (name === "" || phone === "" || area === "" || street === "") {
        alert("يرجى تعبئة جميع الحقول المطلوبة.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("السلة فارغة.");
        return;
    }

    let message = "🍞 *طلب جديد - كعكوز إكسبرس*%0A%0A";

    message += "👤 الاسم: " + name + "%0A";
    message += "📞 الهاتف: " + phone + "%0A";
    message += "📍 المنطقة: " + area + "%0A";
    message += "🛣️ الشارع: " + street + "%0A";
    message += "🚚 طريقة الاستلام: " + delivery + "%0A";

    if (notes !== "") {
        message += "📝 ملاحظات: " + notes + "%0A";
    }

    message += "%0A====================%0A";
    message += "🛒 الطلب:%0A";

    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} × ${item.qty}%0A`;
        total += item.price * item.qty;
    });

    message += "%0A💰 المجموع: " + total.toFixed(2) + " دينار";

    window.open(`https://wa.me/962779430623?text=${message}`, "_blank");

});

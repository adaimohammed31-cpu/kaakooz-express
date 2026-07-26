const confirmOrder = document.getElementById("confirmOrder");

const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const addressFields = document.getElementById("addressFields");
const getLocation = document.getElementById("getLocation");
const locationStatus = document.getElementById("locationStatus");
const locationBox = document.getElementById("locationBox");

let latitude = "";
let longitude = "";

confirmOrder.addEventListener("click", () => {

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let area = document.getElementById("customerArea").value.trim();
    let street = document.getElementById("customerStreet").value.trim();
    let notes = document.getElementById("customerNotes").value.trim();

    let delivery = document.querySelector('input[name="delivery"]:checked').value;

    if (name === "" || phone === "") {
        alert("يرجى إدخال الاسم ورقم الهاتف.");
        return;
    }

    if (delivery === "توصيل" && (area === "" || street === "")) {
        alert("يرجى إدخال المنطقة والشارع للتوصيل.");
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
    message += "🚚 طريقة الاستلام: " + delivery + "%0A";

    if (delivery === "توصيل") {
        message += "📍 المنطقة: " + area + "%0A";
        message += "🛣️ الشارع: " + street + "%0A";
    }

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

    if (latitude && longitude) {
        message += `%0A📍 الموقع:%0Ahttps://maps.google.com/?q=${latitude},${longitude}`;
    }

    window.open(`https://wa.me/962779430623?text=${message}`, "_blank");

});

if (document.querySelector('input[name="delivery"]:checked').value === "استلام من المحل") {
    addressFields.style.display = "none";
    locationBox.style.display = "none";
}

deliveryOptions.forEach(option => {

    option.addEventListener("change", () => {

        if (option.value === "استلام من المحل" && option.checked) {
            addressFields.style.display = "none";
            locationBox.style.display = "none";
        } else {
            addressFields.style.display = "block";
            locationBox.style.display = "block";
        }

    });

});

getLocation.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("جهازك لا يدعم تحديد الموقع.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        locationStatus.innerHTML = "✅ تم تحديد موقعك بنجاح";

    }, () => {

        alert("تعذر الحصول على الموقع.");

    });

});

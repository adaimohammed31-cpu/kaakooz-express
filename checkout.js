const confirmOrder = document.getElementById("confirmOrder");

const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const addressFields = document.getElementById("addressFields");
const locationBox = document.getElementById("locationBox");
const locationStatus = document.getElementById("locationStatus");

const customerArea = document.getElementById("customerArea");
const customerStreet = document.getElementById("customerStreet");

let latitude = "";
let longitude = "";

let map;
let marker;
// =========================
// إنشاء الخريطة
// =========================

function initMap() {

    map = L.map("map").setView([31.9552, 35.9450], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    map.on("click", function (e) {

        latitude = e.latlng.lat;
        longitude = e.latlng.lng;

        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }

        locationStatus.innerHTML = "✅ تم اختيار الموقع من الخريطة";

        getAddress(latitude, longitude);

    });

}

// =========================
// تحديد الموقع تلقائياً
// =========================

function getCurrentLocation() {

    if (!navigator.geolocation) {

        locationStatus.innerHTML = "❌ المتصفح لا يدعم تحديد الموقع.";
        return;

    }

    locationStatus.innerHTML = "⏳ جارٍ تحديد موقعك...";

    navigator.geolocation.getCurrentPosition(

        (position) => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            const userLocation = [latitude, longitude];

            map.setView(userLocation, 17);

            if (marker) {

                marker.setLatLng(userLocation);

            } else {

                marker = L.marker(userLocation).addTo(map);

            }

            locationStatus.innerHTML = "✅ تم تحديد موقعك";

            getAddress(latitude, longitude);

        },

(error) => {

    locationStatus.innerHTML =
        "❌ رقم الخطأ: " + error.code +
        "<br>" + error.message;

    console.log(error);

},
        {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 60000
        }

    );

}
// =========================
// إظهار أو إخفاء خيارات التوصيل
// =========================

function updateDeliveryFields() {

    const delivery =
        document.querySelector('input[name="delivery"]:checked').value;

    if (delivery === "استلام من المحل") {

        addressFields.style.display = "none";
        locationBox.style.display = "none";

    } else {

        addressFields.style.display = "block";
        locationBox.style.display = "block";

        setTimeout(() => {

            if (!map) {

                initMap();

                // تحديد الموقع تلقائياً
                getCurrentLocation();

            } else {

                map.invalidateSize();

            }

        }, 300);

    }

}

updateDeliveryFields();

deliveryOptions.forEach(option => {

    option.addEventListener("change", updateDeliveryFields);

});

// =========================
// جلب العنوان من الإحداثيات
// =========================

async function getAddress(lat, lng) {

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        const address = data.address || {};
        const fullAddress = data.display_name || "";

        customerArea.value =
            address.suburb ||
            address.city_district ||
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            "";

        customerStreet.value =
            address.road ||
            address.residential ||
            address.pedestrian ||
            address.neighbourhood ||
            "";

        locationStatus.innerHTML += "<br>📍 تم تعبئة المنطقة والشارع تلقائياً";

        if (fullAddress) {
            locationStatus.innerHTML +=
                "<br><small>" + fullAddress + "</small>";
        }

    } catch (error) {

        console.error(error);

    }

}
// =========================
// إرسال الطلب
// =========================

confirmOrder.addEventListener("click", () => {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const area = customerArea.value.trim();
    const street = customerStreet.value.trim();
    const notes = document.getElementById("customerNotes").value.trim();

    const delivery =
        document.querySelector('input[name="delivery"]:checked').value;

    if (name === "") {
    alert("يرجى إدخال الاسم.");
    return;
}
const nameRegex = /^(?=.{2,50}$)[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;

if (!nameRegex.test(name)) {
    alert("يرجى إدخال اسم صحيح (حروف فقط).");
    return;
}

    if (phone === "") {
    alert("يرجى إدخال رقم الهاتف.");
    return;
}

const phoneRegex = /^(07\d{8}|9627\d{8}|\+9627\d{8}|\+?[1-9]\d{7,14})$/;

if (!phoneRegex.test(phone)) {
    alert("يرجى إدخال رقم هاتف صحيح.");
    return;
}

    if (delivery === "توصيل" && (area === "" || street === "")) {
        alert("يرجى تحديد موقعك أو إدخال المنطقة والشارع.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("السلة فارغة.");
        return;
    }

    let message = "🍞 *طلب جديد - كعكوز إكسبرس*%0A%0A";

    message += `👤 الاسم: ${name}%0A`;
    message += `📞 الهاتف: ${phone}%0A`;
    message += `🚚 طريقة الاستلام: ${delivery}%0A`;

    if (delivery === "توصيل") {
        message += `📍 المنطقة: ${area}%0A`;
        message += `🛣️ الشارع: ${street}%0A`;
    }

    if (notes !== "") {
        message += `📝 ملاحظات: ${notes}%0A`;
    }

    message += "%0A========================%0A";
    message += "🛒 الطلب:%0A";

    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} × ${item.qty} = ${(item.price * item.qty).toFixed(2)} دينار%0A`;
        total += item.price * item.qty;
    });

    message += "%0A========================%0A";
    message += `💰 المجموع: ${total.toFixed(2)} دينار%0A`;

    if (latitude && longitude) {
        message += `%0A📍 موقع العميل:%0A`;
        message += `https://www.google.com/maps?q=${latitude},${longitude}%0A`;
    }

    window.location.href =
        `https://wa.me/962779430623?text=${message}`;

});

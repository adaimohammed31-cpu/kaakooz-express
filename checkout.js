const confirmOrder = document.getElementById("confirmOrder");
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const addressFields = document.getElementById("addressFields");
const getLocationBtn = document.getElementById("getLocationBtn");
const locationStatus = document.getElementById("locationStatus");

const customerArea = document.getElementById("customerArea");
const customerStreet = document.getElementById("customerStreet");
const customerName = document.getElementById("customerName");

let userLatitude = "";
let userLongitude = "";

// =========================
// إظهار أو إخفاء حقول التوصيل
// =========================
function updateDeliveryFields() {
    const delivery = document.querySelector('input[name="delivery"]:checked').value;

    if (delivery === "استلام من المحل") {
        addressFields.style.display = "none";
    } else {
        addressFields.style.display = "block";
    }
}

updateDeliveryFields();

deliveryOptions.forEach(option => {
    option.addEventListener("change", updateDeliveryFields);
});

// =========================
// زر جلب الموقع (GPS) عند الضغط عليه
// =========================
if (getLocationBtn) {
    getLocationBtn.addEventListener("click", () => {
        if (!navigator.geolocation) {
            locationStatus.innerHTML = "❌ المتصفح لا يدعم تحديد الموقع.";
            return;
        }

        locationStatus.innerHTML = "⏳ جاري تحديد موقعك الحالي...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
                locationStatus.innerHTML = "✅ تم تثبيت موقعك بنجاح وجاهز للإرسال مع الطلب!";
                locationStatus.style.color = "green";
            },
            (error) => {
                locationStatus.innerHTML = "⚠️ تعذر تحديد الموقع تلقائياً، يمكنك كتابة العنوان في الأعلى فقط.";
                locationStatus.style.color = "red";
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// =========================
// إرسال الطلب عبر واتساب
// =========================
confirmOrder.addEventListener("click", () => {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const area = customerArea.value.trim();
    const street = customerStreet.value.trim();
    const notes = document.getElementById("customerNotes").value.trim();

    const delivery = document.querySelector('input[name="delivery"]:checked').value;

    if (name === "") {
        alert("يرجى إدخال الاسم.");
        return;
    }

    const nameRegex = /^(?=.{3,50}$)[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)+$/u;
    if (!nameRegex.test(name)) {
        alert("يرجى إدخال الاسم الأول واسم العائلة بحروف فقط.");
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
        alert("يرجى إدخال المنطقة والشارع لتتمكن من إتمام الطلب.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("السلة فارغة.");
        return;
    }

    // بناء رسالة الواتساب
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

    // إضافة رابط الموقع إذا قام الزبون بالضغط على زر تحديد الموقع
    if (userLatitude && userLongitude) {
        message += `%0A📍 رابط موقع الزبون (Google Maps):%0A`;
        message += `https://www.google.com/maps?q=${userLatitude},${userLongitude}%0A`;
    }

    window.location.href = `https://wa.me/962779430623?text=${message}`;
});

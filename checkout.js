const confirmOrder = document.getElementById("confirmOrder");
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const addressFields = document.getElementById("addressFields");
const deliveryZone = document.getElementById("deliveryZone");
const customerStreet = document.getElementById("customerStreet");

// عناصر الفاتورة الظاهرة على الشاشة
const summaryItemsTotal = document.getElementById("summaryItemsTotal");
const summaryDeliveryRow = document.getElementById("summaryDeliveryRow");
const summaryDeliveryFee = document.getElementById("summaryDeliveryFee");
const summaryGrandTotal = document.getElementById("summaryGrandTotal");

// حساب وعرض المجالات الحية للفاتورة
function calculateTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemsTotal = 0;
    cart.forEach(item => {
        itemsTotal += (item.price * item.qty);
    });

    const delivery = document.querySelector('input[name="delivery"]:checked').value;
    let deliveryFee = 0;
    let isOtherArea = false;

    if (delivery === "توصيل" && deliveryZone.value !== "") {
        const selectedOption = deliveryZone.options[deliveryZone.selectedIndex];
        const priceAttr = selectedOption.dataset.price;

        summaryDeliveryRow.style.display = "flex";

        if (priceAttr === "") {
            isOtherArea = true;
            summaryDeliveryFee.textContent = "سيتم تحديده لاحقاً";
        } else {
            deliveryFee = parseFloat(priceAttr);
            summaryDeliveryFee.textContent = deliveryFee.toFixed(2) + " دينار";
        }
    } else {
        summaryDeliveryRow.style.display = "none";
    }

    let grandTotal = itemsTotal + deliveryFee;

    summaryItemsTotal.textContent = itemsTotal.toFixed(2) + " دينار";
    
    if (isOtherArea) {
        summaryGrandTotal.textContent = itemsTotal.toFixed(2) + " دينار + التوصيل";
    } else {
        summaryGrandTotal.textContent = grandTotal.toFixed(2) + " دينار";
    }
}

// إظهار أو إخفاء حقول التوصيل
function updateDeliveryFields() {
    const delivery = document.querySelector('input[name="delivery"]:checked').value;
    if (delivery === "استلام من المحل") {
        addressFields.style.display = "none";
        deliveryZone.value = ""; 
    } else {
        addressFields.style.display = "block";
    }
    calculateTotals();
}

updateDeliveryFields();

deliveryOptions.forEach(option => {
    option.addEventListener("change", updateDeliveryFields);
});

if (deliveryZone) {
    deliveryZone.addEventListener("change", calculateTotals);
}

calculateTotals();

// =========================
// إرسال الطلب عبر واتساب
// =========================
confirmOrder.addEventListener("click", () => {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const street = customerStreet ? customerStreet.value.trim() : "";
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

    let deliveryFee = 0;
    let selectedAreaName = "";
    let isOtherArea = false;

    if (delivery === "توصيل") {
        if (deliveryZone.value === "") {
            alert("يرجى اختيار منطقة التوصيل.");
            deliveryZone.focus();
            return;
        }
        const customerArea = document.getElementById("customerArea");
const buildingNumber = document.getElementById("buildingNumber");
const landmark = document.getElementById("landmark");
        const lettersRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
const numbersRegex = /^[0-9]+$/;

if (customerArea.value.trim() !== "" && !lettersRegex.test(customerArea.value.trim())) {
    alert("اسم المنطقة يجب أن يحتوي على حروف فقط.");
    customerArea.focus();
    return;
}

if (buildingNumber.value.trim() !== "" && !numbersRegex.test(buildingNumber.value.trim())) {
    alert("رقم البناية يجب أن يحتوي على أرقام فقط.");
    buildingNumber.focus();
    return;
}

if (landmark.value.trim() !== "" && !lettersRegex.test(landmark.value.trim())) {
    alert("أقرب معلم يجب أن يحتوي على حروف فقط.");
    landmark.focus();
    return;
}
        

if (deliveryZone.value === "منطقة أخرى") {

    if (customerArea.value.trim() === "") {
        alert("يرجى إدخال اسم المنطقة.");
        customerArea.focus();
        return;
    }

    if (buildingNumber.value.trim() === "") {
        alert("يرجى إدخال رقم البناية.");
        buildingNumber.focus();
        return;
    }

    if (landmark.value.trim() === "") {
        alert("يرجى إدخال أقرب معلم.");
        landmark.focus();
        return;
    }

}
        selectedAreaName = deliveryZone.value;
        const selectedOption = deliveryZone.options[deliveryZone.selectedIndex];
        const priceAttr = selectedOption.dataset.price;

        if (priceAttr === "") {
            isOtherArea = true;
        } else {
            deliveryFee = parseFloat(priceAttr);
        }
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("السلة فارغة.");
        return;
    }

    // بناء رسالة الواتساب الاحترافية والمفصلة
    let message = "🍞 *طلب جديد - كعكوز إكسبرس*\n\n";

    message += `👤 الاسم: ${name}\n`;
    message += `📞 الهاتف: ${phone}\n`;
    message += `🚚 طريقة الاستلام: ${delivery}\n`;

    if (delivery === "توصيل") {
        message += `📍 المنطقة: ${selectedAreaName}\n`;
        message += `🏠 العنوان:
اسم المنطقة: ${customerArea.value}
رقم البناية: ${buildingNumber.value}
اسم الشارع: ${customerStreet.value || "غير مذكور"}
أقرب معلم: ${landmark.value}\n`;
    }

    if (notes !== "") {
        message += `📝 ملاحظات: ${notes}\n`;
    }

    message += "\n========================\n";
    message += "🛒 تفاصيل الطلب:\n";

    let itemsTotal = 0;
    cart.forEach(item => {
        message += `• ${item.name} × ${item.qty} = ${(item.price * item.qty).toFixed(2)} دينار\n`;
        itemsTotal += item.price * item.qty;
    });

    let grandTotal = itemsTotal + deliveryFee;

    message += "\n========================\n";
    if (delivery === "توصيل") {
        message += `📦 قيمة الطلب: ${itemsTotal.toFixed(2)} دينار\n`;
        if (isOtherArea) {
            message += `🚚 رسوم التوصيل: سيتم تحديدها بعد التواصل معكم\n`;
            message += `💰 *قيمة الطلب المبدئية: ${itemsTotal.toFixed(2)} دينار*\n`;
        } else {
            message += `🚚 رسوم التوصيل: ${deliveryFee.toFixed(2)} دينار\n`;
            message += `💰 *المجموع الكلي: ${grandTotal.toFixed(2)} دينار*\n`;
        }
    } else {
        message += `💰 *المجموع الكلي: ${grandTotal.toFixed(2)} دينار*\n`;
    }

    if (delivery === "توصيل") {
        message += `\n📍 *(سأقوم بإرسال موقعي (لوكيشن) في الرسالة التالية لسهولة التوصيل)*`;
    }

    // تم إزالة localStorage.removeItem("cart") للحفاظ على أمان بيانات السلة لحين تأكيد الإرسال تماماً

    // فتح رابط واتساب مع تشفير آمن للنص
    window.location.href = `https://wa.me/962779430623?text=${encodeURIComponent(message)}`;
});

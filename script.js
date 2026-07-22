// جميع الصناديق
const cards = document.querySelectorAll(".card");

// الأزرار
const homeBtn = document.getElementById("homeBtn");
const welcomeBtn = document.getElementById("welcomeBtn");
const menuBtn = document.getElementById("menuBtn");
const locationBtn = document.getElementById("locationBtn");
const timeBtn = document.getElementById("timeBtn");
const galleryBtn = document.getElementById("galleryBtn");
// الصناديق
const welcomeBox = document.getElementById("welcomeBox");
const menuBox = document.getElementById("menuBox");
const locationBox = document.getElementById("locationBox");
const timeBox = document.getElementById("timeBox");
const galleryBox = document.getElementById("galleryBox");
// إخفاء جميع الصناديق
function hideAll() {
    cards.forEach(card => {
        card.style.display = "none";
    });
}

// عند فتح الموقع
hideAll();

// الرئيسية
homeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// أهلاً بكم
welcomeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    welcomeBox.style.display = "block";
    welcomeBox.scrollIntoView({
        behavior: "smooth"
    });
});

// المنيو
menuBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    menuBox.style.display = "block";
    menuBox.scrollIntoView({
        behavior: "smooth"
    });
});

// الموقع
locationBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    locationBox.style.display = "block";
    locationBox.scrollIntoView({
        behavior: "smooth"
    });
});

// أوقات الدوام
timeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    timeBox.style.display = "block";
    timeBox.scrollIntoView({
        behavior: "smooth"
    });
});
// معرض الصور
galleryBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    galleryBox.style.display = "block";
    galleryBox.scrollIntoView({
        behavior: "smooth"
    });
});

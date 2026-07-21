
// إظهار العناصر عند النزول
const cards = document.querySelectorAll(".welcome-card,.location-card,.contact-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => observer.observe(card));

// تأثير أزرار التواصل
document.querySelectorAll(".contact-buttons a").forEach(btn => {
    btn.addEventListener("mousedown", () => btn.style.transform = "scale(.95)");
    btn.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
    btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
});

// المنيو
const menuCard = document.querySelector(".menu-card");
const menuLink = document.querySelector('a[href="#menu"]');
const homeLink = document.querySelector('a[href="#home"]');
const welcomeLink = document.querySelector('a[href="#welcome"]');

// إخفاء المنيو عند فتح الموقع
menuCard.style.display = "none";

// إظهار المنيو
menuLink.addEventListener("click", function(e){
    e.preventDefault();

    menuCard.style.display = "block";

    menuCard.scrollIntoView({
        behavior:"smooth"
    });
});

// إخفاء المنيو عند الرئيسية
homeLink.addEventListener("click", function(e){
    e.preventDefault();

    menuCard.style.display = "none";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

// إخفاء المنيو عند أهلاً بكم
welcomeLink.addEventListener("click", function(e){
    e.preventDefault();

    menuCard.style.display = "none";

    document.querySelector("#welcome").scrollIntoView({
        behavior:"smooth"
    });
});

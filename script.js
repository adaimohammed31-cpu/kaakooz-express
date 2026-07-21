//========================================
// KAAKOZ EXPRESS
// script.js
//========================================

// زر العودة للأعلى

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

//========================================
// تمييز الصفحة الحالية
//========================================

const currentPage = location.pathname.split("/").pop();

document.querySelectorAll(".wood-nav a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    }

});

//========================================
// ظهور العناصر أثناء التمرير
//========================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(".card, section").forEach(el => {

    observer.observe(el);

});

//========================================
// تأثير بسيط عند الضغط على الأزرار
//========================================

document.querySelectorAll(".wood-nav a").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.95)";

        setTimeout(() => {

            btn.style.transform = "";

        }, 150);

    });

});

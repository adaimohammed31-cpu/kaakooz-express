// انتقال سلس بين الأقسام
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// إضاءة زر المنيو
const menuButton = document.querySelector(".menu-btn");

if (menuButton) {
    menuButton.addEventListener("click", function () {

        menuButton.classList.add("active");

        setTimeout(() => {
            menuButton.classList.remove("active");
        }, 500);

    });
}

// ظهور الأقسام تدريجياً
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all .8s ease";

    observer.observe(section);

});

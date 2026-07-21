// إغلاق وتشغيل أي كود بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {

    // تمييز الرابط النشط أثناء التمرير
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

});

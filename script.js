/*=========================================
  KAAKOZ EXPRESS
  JavaScript
=========================================*/

/*==========================
  Fade Animation
==========================*/

const fades = document.querySelectorAll(".fade");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

fades.forEach((item) => {
    observer.observe(item);
});

/*==========================
  Active Menu
==========================*/

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".navbar a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
    }

});

/*==========================
  Back To Top Button
==========================*/

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "top-btn";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*==========================
  Footer Year
==========================*/

const year = new Date().getFullYear();

document.querySelectorAll("footer p").forEach(p => {

    if (p.innerHTML.includes("©")) {

        p.innerHTML = `© ${year} جميع الحقوق محفوظة`;

    }

});

/*==========================
  Console Message
==========================*/

console.log("Kaakoz Express Website Loaded Successfully");


/* زر العودة للأعلى */

.top-btn{

position:fixed;

bottom:25px;

left:25px;

width:55px;

height:55px;

border:none;

border-radius:50%;

background:linear-gradient(180deg,#f7d96a,#d4af37);

color:#3a250f;

font-size:24px;

font-weight:bold;

cursor:pointer;

box-shadow:0 10px 20px rgba(0,0,0,.25);

opacity:0;

visibility:hidden;

transition:.3s;

z-index:9999;

}

.top-btn.show{

opacity:1;

visibility:visible;

}

.top-btn:hover{

transform:translateY(-5px) scale(1.08);

}

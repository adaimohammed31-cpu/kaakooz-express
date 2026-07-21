
// كعكوز إكسبرس

function showMenu() {

const menu = document.getElementById("menu");

if (!menu) return;

if (menu.style.display === "block") {
    menu.style.display = "none";
} else {
    menu.style.display = "block";
}

}

window.addEventListener("scroll", function () {

const nav = document.querySelector("nav");

if (!nav) return;

if (window.scrollY > 80) {

nav.style.boxShadow = "0 8px 20px rgba(0,0,0,.35)";

} else {

nav.style.boxShadow = "0 5px 15px rgba(0,0,0,.25)";

}

});

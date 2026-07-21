// انتقال سلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// إظهار العناصر عند النزول
const cards=document.querySelectorAll(".welcome-card,.menu-card,.location-card,.contact-card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.2
});

cards.forEach(card=>{

observer.observe(card);

});

// تأثير الضغط على أزرار التواصل
document.querySelectorAll(".contact-buttons a").forEach(btn=>{

btn.addEventListener("mousedown",()=>{

btn.style.transform="scale(.95)";

});

btn.addEventListener("mouseup",()=>{

btn.style.transform="scale(1)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// زر المنيو
const menuButton=document.querySelector(".menu-button");

if(menuButton){

menuButton.addEventListener("click",()=>{

menuButton.classList.add("active");

setTimeout(()=>{

menuButton.classList.remove("active");

},500);

});

}

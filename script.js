import {
  db,
  auth,
signInWithEmailAndPassword,
onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  increment,
  onSnapshot
} from "./firebase.js";

let ownerId = localStorage.getItem("ownerId");

if (!ownerId) {
    ownerId = crypto.randomUUID();
    localStorage.setItem("ownerId", ownerId);
}
let isAdmin = false;

onAuthStateChanged(auth, (user) => {
    isAdmin = !!user;
    loadComments();
});
// جميع الصناديق
const cards = document.querySelectorAll(".card");

// الأزرار
const homeBtn = document.getElementById("homeBtn");
const welcomeBtn = document.getElementById("welcomeBtn");
const menuBtn = document.getElementById("menuBtn");
const locationBtn = document.getElementById("locationBtn");
const timeBtn = document.getElementById("timeBtn");
const galleryBtn = document.getElementById("galleryBtn");
const reviewsBtn = document.getElementById("reviewsBtn");
const reviewsBox = document.getElementById("reviewsBox");
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
// آراء الزبائن
reviewsBtn.addEventListener("click", function(e) {
    e.preventDefault();
    hideAll();
    reviewsBox.style.display = "block";
    reviewsBox.scrollIntoView({
        behavior: "smooth"
    });
});
// نافذة تكبير الصور
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const images = document.querySelectorAll(".gallery img");
let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener("click", function () {
        currentIndex = index;
        lightbox.style.display = "flex";
        lightboxImg.src = images[currentIndex].src;
    });
});

closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

/* ===========================
   Firebase - Likes
=========================== */


const likeBtn = document.getElementById("likeBtn");
if (localStorage.getItem("liked") === "true") {
    likeBtn.textContent = "💔 إلغاء الإعجاب";
}
const likesCount = document.getElementById("likesCount");

const likesRef = doc(db, "website", "likes");

// إنشاء المستند إذا لم يكن موجوداً
getDoc(likesRef).then(async (snap) => {
    if (!snap.exists()) {
        await setDoc(likesRef, { count: 0 });
    }
});

// عرض الإعجابات مباشرة
onSnapshot(likesRef, (snap) => {
    if (snap.exists()) {
        likesCount.textContent = `❤️ ${snap.data().count} إعجاب`;
    }
});

likeBtn.addEventListener("click", async () => {

    let liked = localStorage.getItem("liked");

    if (liked === "true") {

    await updateDoc(likesRef, {
        count: increment(-1)
    });

    localStorage.removeItem("liked");

    likeBtn.textContent = "❤️ أعجبني";

    return;
    }

    const snap = await getDoc(likesRef);

    if (!snap.exists()) {
        await setDoc(likesRef, { count: 1 });
    } else {
        await updateDoc(likesRef, {
            count: increment(1)
        });
    }

    localStorage.setItem("liked", "true");
  likeBtn.textContent = "💔 إلغاء الإعجاب";
});

/* ===========================
   Firebase - Rating
=========================== */

const stars = document.querySelectorAll(".star");
const ratingAverage = document.getElementById("ratingAverage");

const ratingRef = doc(db, "website", "rating");

// عرض متوسط التقييم
onSnapshot(ratingRef, (snapshot) => {

    if (snapshot.exists()) {

        const data = snapshot.data();

        const avg = data.count > 0
            ? (data.total / data.count).toFixed(1)
            : 0;

        ratingAverage.textContent = `متوسط التقييم: ⭐ ${avg}`;

    } else {

        setDoc(ratingRef, {
            total: 0,
            count: 0
        });

    }

});

// عند الضغط على نجمة
stars.forEach(star => {

    star.addEventListener("click", async () => {

        if (localStorage.getItem("rated")) {
            alert("لقد قمت بالتقييم مسبقًا ⭐");
            return;
        }

        const value = Number(star.dataset.rate);

        await updateDoc(ratingRef, {
            total: increment(value),
            count: increment(1)
        });

        localStorage.setItem("rated", "true");

    });

});

/* ===========================
   Firebase - Comments
=========================== */

const sendComment = document.getElementById("sendComment");
const commentsList = document.getElementById("commentsList");

const commentsRef = collection(db, "comments");

// عرض التعليقات
async function loadComments() {
commentsList.innerHTML = "";

    const snapshot = await getDocs(commentsRef);

    snapshot.forEach((docItem) => {

        const data = docItem.data();

        commentsList.innerHTML += `
    <div class="comment-card">
        <h4>${data.name}</h4>
        <p>${data.comment}</p>

        ${
            isAdmin || data.ownerId === ownerId
                ? `<button class="delete-btn" onclick="deleteComment('${docItem.id}')">
                    🗑️ حذف
                  </button>`
                : ""
        }

    </div>
`;
      
    
    });

}

loadComments();

// إرسال تعليق
sendComment.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (name === "" || comment === "") {
        alert("يرجى تعبئة جميع الحقول");
        return;
    }

    await addDoc(commentsRef, {
        name,
        comment,
      ownerId: ownerId,
        time: Date.now()
    });

    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";

    loadComments();

});
window.deleteComment = async function (id) {

    if (!confirm("هل تريد حذف هذا التعليق؟")) return;

    await deleteDoc(doc(db, "comments", id));

    loadComments();
};
const heroImage = document.getElementById("heroImage");
const adminLogin = document.getElementById("adminLogin");

let clickCount = 0;
let clickTimer;

heroImage.addEventListener("click", () => {
    clickCount++;

    clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 3000);

    if (clickCount >= 5) {
        adminLogin.style.display = "block";
        clickCount = 0;
    }
});
adminLogin.style.display

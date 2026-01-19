
// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");

let galleryImages = [];
let currentIndex = 0;

document.querySelectorAll(".carousel").forEach(carousel => {
    const imgs = Array.from(carousel.querySelectorAll("img"));
    let index = 0;

    const intervalTime = window.innerWidth < 768 ? 4500 : 3000;

    // carrossel automático
    setInterval(() => {
        imgs[index].classList.remove("active");
        index = (index + 1) % imgs.length;
        imgs[index].classList.add("active");
    }, intervalTime);

    // clique para abrir lightbox
    imgs.forEach((img, i) => {
        img.addEventListener("click", () => {
            galleryImages = imgs.map(im => im.src);
            currentIndex = i;
            openLightbox();
        });
    });
});

function openLightbox() {
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.style.display = "flex";
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// teclado
document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.style.display = "none";
    }
});



// swipe mobile 
let startX = 0;

lightbox.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        diff > 0 ? showNext() : showPrev();
    }
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

/** Animação de cards ao rolar a página */
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => observer.observe(card));

/* Animação do footer ao rolar a página */

const footer = document.querySelector('footer');

const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add('show');
            footerObserver.unobserve(footer);
        }
    });
}, {
    threshold: 0.2
});

footerObserver.observe(footer);


// ===== HINT MOBILE: "🔍 Toque para ampliar" por 2s e só 1 vez por card =====
(function () {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const carousels = document.querySelectorAll(".carousel");

    const hintObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const carousel = entry.target;

            // evita repetir no mesmo card
            if (carousel.dataset.hintShown === "true") {
                obs.unobserve(carousel);
                return;
            }

            carousel.dataset.hintShown = "true";

            // mostra
            carousel.classList.add("show-hint");

            // some sozinho após 2s
            setTimeout(() => {
                carousel.classList.remove("show-hint");
            }, 2000);

            // não observa mais esse card
            obs.unobserve(carousel);
        });
    }, { threshold: 0.6 });

    carousels.forEach(c => hintObserver.observe(c));
})();

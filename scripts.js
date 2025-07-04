const carousel = document.querySelector('.carousel');
const images = carousel.querySelectorAll('img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dotsContainer = document.createElement('div'); 
dotsContainer.classList.add('carousel-dots');
carousel.appendChild(dotsContainer);

// Create a dots array
const dots = [];
for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // Add active class to the first dot
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
    dots.push(dot);
}

let currentIndex = 0;
let interval;
//header effect in nav
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 100, 
                behavior: 'smooth'
            });
        });
    });
});
function updateCarousel() {
    images.forEach((img, index) => {
        img.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function startAutoSlide() {
    interval = setInterval(() => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 20000);
}

prevButton.addEventListener('click', () => {
    clearInterval(interval);
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateCarousel();
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    clearInterval(interval);
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
    startAutoSlide();
});
// header background effect (hide)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    function checkScroll() {
        if (window.scrollY > 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
});

// dot click event listener
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = parseInt(dot.getAttribute('data-index'), 10);
        updateCarousel();
        startAutoSlide();
    });
});

updateCarousel();
startAutoSlide();

//back to top button    
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    const footer = document.querySelector('footer');

    function checkFooterVisibility() {
        const footerTop = footer.offsetTop;
        const windowBottom = window.scrollY + window.innerHeight;

        if (windowBottom > footerTop) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }

    // Show/hide the button on scroll
    window.addEventListener('scroll', checkFooterVisibility);

    // Optional: Scroll to top smoothly on click
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For smooth scrolling
        });
    });

    // Initial check in case the footer is already in view on page load
    checkFooterVisibility();
});
// Contact Form effect
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    function checkScroll() {
        const rect = contactForm.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        if (rect.top <= windowHeight) {
            contactForm.classList.add('visible');
            window.removeEventListener('scroll', checkScroll);
        }
    }

    window.addEventListener('scroll', checkScroll);
});
//Particles effect

let hasParticlesTriggered = false;
// pointer mouse function
document.querySelector('.logo span').addEventListener('mouseover', function(event) {

    if (!hasParticlesTriggered) {
        createParticles(event);
        hasParticlesTriggered = true; 
        
        setTimeout(() => {
            hasParticlesTriggered = false;
        }, 1500); 
    }
});
function createParticles(event) {
    const span = event.target;
    const rect = span.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const img = document.createElement('img');
        img.src = 'img/Dollar.png'; 
        img.style.width = '20px'; 
        img.style.height = '20px';
        particle.appendChild(img); 
        
        const x = rect.width * 2;
        const y = rect.height / 1;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const moveX = (Math.random() - 0.5) * 100; 
        const moveY = Math.random() * 150 + 50;
        particle.style.setProperty('--x', moveX + 'px');
        particle.style.setProperty('--y', moveY + 'px');
        
        span.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500); 
    }
}
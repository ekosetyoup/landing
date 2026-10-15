const bar = document.getElementById('scrollProgress');
const canvas = document.getElementById('particleCanvas');

if (canvas && bar) {

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 12;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = 12;
    });

    let particles = [];

    class Particle {
        constructor(x, y) {
            const spreadLeft = Math.random() * 15;
            const spreadRight = Math.random() * 3;

            this.x = x - spreadLeft + spreadRight;
            this.y = y + (Math.random() * 8 - 4);
            this.radius = Math.random() * 2 + 2;

            const distanceFromEdge = x - this.x;
            const alphaScale = Math.max(0, 1 - distanceFromEdge / 25);
            this.alpha = alphaScale * (Math.random() * 0.6 + 0.4);
            this.fade = Math.random() * 0.01 + 0.007;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = Math.random() * -1.2 - 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.fade;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 160, 0, ${this.alpha})`;
            ctx.shadowColor = `rgba(255, 120, 0, ${this.alpha})`;
            ctx.shadowBlur = 12;
            ctx.fill();
        }
    }

    function updateScrollBar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percent = scrollTop / scrollHeight;
        const width = percent * window.innerWidth;

        bar.style.width = width + 'px';

        const transitionWidth = 50;
        bar.style.background = `linear-gradient(to right, #10B981 ${width - transitionWidth}px, orange ${width}px)`;

        return width;
    }

    function createParticles(x) {
        for (let i = 0; i < 4; i++) {
            particles.push(new Particle(x, 5));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
    }

    function loop() {
        const barWidth = updateScrollBar();
        createParticles(barWidth);
        animateParticles();
        requestAnimationFrame(loop);
    }

    loop();
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbarMenu = document.getElementById('navbarMenu');

if (mobileMenuBtn && navbarMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navbarMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

function initNavSystem() {

    console.log("=== NAV SYSTEM START ===");

    const path = window.location.pathname;
    const links = document.querySelectorAll(".nav-link");

    console.log("PATH:", path);
    console.log("TOTAL LINKS:", links.length);

    function resetActive() {
        links.forEach(link => link.classList.remove("active"));
    }

    const isLanding = path === "/" || path.includes("index");

    console.log("IS LANDING:", isLanding);

    if (isLanding) {

        console.log("MODE: LANDING PAGE");

        const sections = document.querySelectorAll("section[id]");
        console.log("TOTAL SECTIONS:", sections.length);

        function updateScrollActive() {
            let current = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 80;

                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });

            resetActive();

            if (current) {
                console.log("ACTIVE SECTION:", current);
                document.querySelector(`.nav-link[href="#${current}"]`)?.classList.add("active");
            }
        }

        window.addEventListener("scroll", updateScrollActive);
        updateScrollActive();
    }

    else {

        console.log("MODE: LEGAL PAGE");

        resetActive();

        links.forEach(link => {
            const href = link.getAttribute("href");

            console.log("CHECK LINK:", href);

            if (!href || href === "#" || href.startsWith("#")) return;

            const cleanHref = href.replace(".html", "");

            if (path.includes(cleanHref)) {
                console.log("MATCH FOUND:", cleanHref);
                link.classList.add("active");
            }
        });

        const legalPages = [
            "privacy-policy",
            "terms-conditions",
            "service-policy",
            "refund-policy",
            "disclaimer"
        ];

        const isLegal = legalPages.some(p => path.includes(p));

        console.log("IS LEGAL PAGE:", isLegal);

        const legalNav = document.querySelector("#legalDropdown > .nav-link");
        console.log("LEGAL NAV FOUND:", legalNav);

        if (isLegal && legalNav) {
            console.log("SET LEGAL ACTIVE");
            legalNav.classList.add("active");
        }
    }

    // 🔥 Dropdown mobile (Legal)
    const dropdownLinks = document.querySelectorAll('.dropdown > .nav-link');
    console.log("DROPDOWN LINKS:", dropdownLinks.length);
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
    
                const parent = this.parentElement;
    
                console.log("DROPDOWN CLICK:", parent);
    
                parent.classList.toggle('open');
            }
        });
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        });
    });

    console.log("INIT DROPDOWN SYSTEM");
    
}

function initDropdownMobile() {
    console.log("INIT DROPDOWN");

    const dropdown = document.querySelector('.dropdown');

    if (!dropdown) {
        console.log("DROPDOWN TIDAK DITEMUKAN");
        return;
    }

    const trigger = dropdown.querySelector('.nav-link');

    trigger.addEventListener('click', (e) => {
        // Cegah redirect #
        e.preventDefault();

        dropdown.classList.toggle('open');

        console.log("DROPDOWN CLICKED:", dropdown.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
}

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
let isScrolling = null;

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('active', window.scrollY > window.innerHeight * 0.1);

        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            backToTopBtn.classList.remove('active');
        }, 1000);
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(statsSection);
    }
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Initialize Swiper for screenshots slider
document.addEventListener('DOMContentLoaded', function() {
    // Load Swiper only if the element exists
    if (document.querySelector('.swiper-container')) {
        const swiperScript = document.createElement('script');
        swiperScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/js/swiper.min.js';
		swiperScript.onload = function() {
			const swiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: {
					delay: 1800,
					disableOnInteraction: false
				},
				spaceBetween: 30,
				centeredSlides: true,
				navigation: {
					nextEl: '.next',
					prevEl: '.prev'
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 5,
					}
				}
			});

			const swiperEl = document.querySelector('.swiper-container');
			swiperEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
			swiperEl.addEventListener('mouseleave', () => swiper.autoplay.start());
		};

        document.head.appendChild(swiperScript);
        
        // Add Swiper CSS
        const swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/css/swiper.min.css';
        document.head.appendChild(swiperCSS);
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Range of Year
function initYearRange() {

    const yearElement = document.getElementById("year-range");

    if (!yearElement) return;

    const startYear = 2025;
    const currentYear = new Date().getFullYear();

    if (startYear === currentYear) {
        yearElement.textContent = startYear;
    } else {
        yearElement.textContent = startYear + "–" + currentYear;
    }
}

document.addEventListener("DOMContentLoaded", initYearRange);

// Navigasi aktif
function setActiveByRoute() {

    console.log("INIT ACTIVE ROUTE");

    const path = window.location.pathname.toLowerCase();
    console.log("PATH:", path);

    // reset semua active
    const allLinks = document.querySelectorAll('[data-route]');
    allLinks.forEach(el => el.classList.remove('active'));

    let bestMatch = null;
    let longestMatchLength = 0;

    allLinks.forEach(el => {
        const route = el.dataset.route.toLowerCase();

        if (path.includes(route) && route.length > longestMatchLength) {
            bestMatch = el;
            longestMatchLength = route.length;
        }
    });

    if (bestMatch) {
        bestMatch.classList.add('active');
        console.log("BEST MATCH:", bestMatch.dataset.route);

        // 🔥 aktifkan parent
        const parent = bestMatch.dataset.parent;
        if (parent) {
            const parentEl = document.querySelector(`[data-route="${parent}"]`);
            if (parentEl) {
                parentEl.classList.add('active');
                console.log("PARENT ACTIVE:", parent);
            }
        }
    } else {
        console.log("NO MATCH FOUND");
    }
}

function setActiveLanding() {

    const sections = document.querySelectorAll("[id]");
    const navLinks = document.querySelectorAll('.nav-link[data-route]');
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 100;

    let current = "home"; // 🔥 simpan state terakhir (persist)

    function activateMenu() {
        let found = false;

        sections.forEach(section => {
            const top = section.offsetTop - navHeight - 20;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            // 🎯 gunakan range (lebih akurat)
            if (window.scrollY >= top && window.scrollY < top + height) {
                current = id;
                found = true;
            }
        });

        // 🔥 kalau tidak ketemu (misalnya di section tanpa id)
        // JANGAN reset ke home → tetap pakai current sebelumnya

        // 🔥 kalau di paling bawah → paksa ke section terakhir
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
            current = sections[sections.length - 1].id;
        }

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.dataset.route === current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", activateMenu);
    window.addEventListener("load", activateMenu);

    activateMenu();
}

function initNavigation() {

    const isLanding = document.body.classList.contains("landing");

    if (isLanding) {
        console.log("MODE: LANDING");
        setActiveLanding();   // ✅ hanya ini
    } else {
        console.log("MODE: ROUTE");
        setActiveByRoute();   // ✅ hanya ini
    }
}

// Fungsi Menu humberger
function initMobileMenu() {

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarMenu = document.getElementById('navbarMenu');

    if (!mobileMenuBtn || !navbarMenu) return;

    mobileMenuBtn.addEventListener('click', () => {

        navbarMenu.classList.toggle('active');

        mobileMenuBtn.innerHTML = navbarMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Dropdown Toogle Legal
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("legalToggle");
    const dropdown = document.getElementById("legalDropdown");

    if (toggle && dropdown) {
        toggle.addEventListener("click", function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle("active");
            }
        });
    }
});

// active state
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;

    // Reset semua active
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    // Tandai link yang cocok
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");

        if (href && currentPath.includes(href)) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    const legalPages = [
        "privacy-policy",
        "terms-conditions",
        "service-policy",
        "refund-policy",
        "disclaimer"
    ];

    const isLegal = legalPages.some(p => path.includes(p));

    if (isLegal) {
        document.querySelector("#legalDropdown > .nav-link")?.classList.add("active");
    }
});

console.log("JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM READY");

    if (document.body.classList.contains("landing")) {
        console.log("INIT LANDING MODE");
        setActiveLanding();
    }
});
/* ============================================================
   ZAYNAYAN STORE - MAIN SCRIPT
   ============================================================ */

(function() {
  'use strict';

  /* ========== 1. SCROLL PROGRESS + PARTICLES ========== */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    const canvas = document.getElementById('particleCanvas');
    if (!bar || !canvas) return;

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
      const percent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
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

  /* ========== 2. MOBILE MENU ========== */
  function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navbarMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      menu.classList.toggle('active');
      btn.innerHTML = menu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Tutup menu saat link diklik (kecuali toggle dropdown)
    menu.querySelectorAll('a.nav-link, a.dropdown-item, a.nav-btn').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove('active');
          btn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  /* ========== 3. DROPDOWN LEGAL (MOBILE) ========== */
  function initDropdownMobile() {
    const toggle = document.getElementById('legalToggle');
    const dropdown = document.getElementById('legalDropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });

    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* ========== 4. SCROLL SPY (HOMEPAGE) ========== */
  function initScrollSpy() {
    // Hanya jalan di homepage
    if (!document.body.classList.contains('landing')) return;

    // Cek apakah ini homepage (bukan halaman legal)
    const path = window.location.pathname;
    const isHomepage = path === '/' || path === '' || path.indexOf('/index') === 0;
    if (!isHomepage) return;

    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-route]');
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;

    console.log('[ScrollSpy] Sections:', sections.length, 'Links:', navLinks.length);

    let current = 'home';

    function updateActive() {
      let found = false;

      sections.forEach(section => {
        const top = section.offsetTop - navHeight - 20;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (window.scrollY >= top && window.scrollY < top + height) {
          current = id;
          found = true;
        }
      });

      // Kalau di paling bawah, aktifkan section terakhir
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        if (sections.length > 0) {
          current = sections[sections.length - 1].getAttribute('id');
        }
      }

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.route === current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('load', updateActive);
    updateActive();
  }

  /* ========== 5. HIGHLIGHT HALAMAN LEGAL AKTIF ========== */
  function initLegalActive() {
    // Hanya jalan di halaman legal
    if (!document.querySelector('.legal-page-wrapper')) return;

    const path = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link[data-route]');

    console.log('[LegalActive] Path:', path, 'Links:', navLinks.length);

    navLinks.forEach(link => {
      link.classList.remove('active');
      const route = link.dataset.route;
      if (route && path.indexOf(route) !== -1) {
        link.classList.add('active');
      }
    });
  }

  /* ========== 6. SMOOTH SCROLL (HOMEPAGE ANCHOR) ========== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        // Hanya preventDefault kalau anchor ada di halaman ini
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ========== 7. STICKY NAVBAR ON SCROLL ========== */
  function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ========== 8. BACK TO TOP ========== */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    let timeout = null;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('active', window.scrollY > window.innerHeight * 0.1);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        btn.classList.remove('active');
      }, 1000);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========== 9. COUNTER ANIMATION ========== */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

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

    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(statsSection);
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  /* ========== 10. SWIPER SLIDER ========== */
  function initSwiper() {
    if (!document.querySelector('.swiper-container')) return;

    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/js/swiper.min.js';
    swiperScript.onload = function() {
      if (typeof Swiper === 'undefined') return;
      const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: { delay: 1800, disableOnInteraction: false },
        spaceBetween: 30,
        centeredSlides: true,
        navigation: { nextEl: '.next', prevEl: '.prev' },
        breakpoints: {
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 }
        }
      });
      const swiperEl = document.querySelector('.swiper-container');
      swiperEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
      swiperEl.addEventListener('mouseleave', () => swiper.autoplay.start());
    };
    document.head.appendChild(swiperScript);

    const swiperCSS = document.createElement('link');
    swiperCSS.rel = 'stylesheet';
    swiperCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/css/swiper.min.css';
    document.head.appendChild(swiperCSS);
  }

  /* ========== 11. YEAR RANGE ========== */
  function initYearRange() {
    const el = document.getElementById('year-range');
    if (!el) return;
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    el.textContent = startYear === currentYear ? startYear : startYear + '–' + currentYear;
  }

  /* ========== INIT ALL ========== */
  function init() {
    console.log('[Main] DOM Ready. Path:', window.location.pathname);
    initScrollProgress();
    initMobileMenu();
    initDropdownMobile();
    initScrollSpy();
    initLegalActive();
    initSmoothScroll();
    initStickyNavbar();
    initBackToTop();
    initCounters();
    initSwiper();
    initYearRange();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
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
      const tw = 50;
      bar.style.background = `linear-gradient(to right, #10B981 ${width - tw}px, orange ${width}px)`;
      return width;
    }

    function createParticles(x) {
      for (let i = 0; i < 4; i++) particles.push(new Particle(x, 5));
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

  /* ========== 2. MOBILE MENU TOGGLE ========== */
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

    menu.querySelectorAll('.nav-link:not(#legalToggle):not(#panduanToggle), .dropdown-item, .nav-btn').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove('active');
          btn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  /* ========== 3. DROPDOWN (LEGAL & PANDUAN) ========== */
  function initDropdown() {
    // Legal dropdown
    const legalToggle = document.getElementById('legalToggle');
    const legalDropdown = document.getElementById('legalDropdown');
    if (legalToggle && legalDropdown) {
      legalToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          legalDropdown.classList.toggle('open');
        }
      });
      document.addEventListener('click', function(e) {
        if (!legalDropdown.contains(e.target)) {
          legalDropdown.classList.remove('open');
        }
      });
    }
  }

  /* ========== 4. SCROLL SPY (HOMEPAGE) ========== */
  function initScrollSpy() {
    if (!document.body.classList.contains('landing')) return;

    const path = window.location.pathname;
    const isHomepage = path === '/' || path === '' || path.indexOf('/index') === 0;
    if (!isHomepage) return;

    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-route]');
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;

    let current = 'home';

    function updateActive() {
      sections.forEach(section => {
        const top = section.offsetTop - navHeight - 20;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = id;
        }
      });

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

  /* ========== 5. MENU AKTIF DI HALAMAN LEGAL ========== */
  function initLegalActive() {
    if (!document.querySelector('.legal-page-wrapper')) return;

    const path = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link[data-route]');

    navLinks.forEach(link => {
      link.classList.remove('active');
      const route = link.dataset.route;
      if (route && path.indexOf(route) !== -1) {
        link.classList.add('active');
      }
    });
  }

  /* ========== 6. SMOOTH SCROLL ========== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
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

  /* ========== 7. STICKY NAVBAR ========== */
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
      timeout = setTimeout(() => btn.classList.remove('active'), 1000);
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

    function animate() {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(animate, 1);
        } else {
          counter.innerText = target;
        }
      });
    }

    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animate();
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
      const el = document.querySelector('.swiper-container');
      el.addEventListener('mouseenter', () => swiper.autoplay.stop());
      el.addEventListener('mouseleave', () => swiper.autoplay.start());
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
    const start = 2025;
    const current = new Date().getFullYear();
    el.textContent = start === current ? start : start + '–' + current;
  }

  /* ========== 12. PANDUAN FEED (HOMEPAGE) ========== */
  function initPanduanFeed() {
    const grid = document.getElementById('panduan-grid');
    if (!grid) return;

    const path = window.location.pathname;
    const isHomepage = path === '/' || path === '' || path.indexOf('/index') === 0;
    if (!isHomepage) return;

    const feedUrl = '/feeds/posts/default?alt=json&max-results=3';

    fetch(feedUrl)
      .then(res => res.json())
      .then(data => {
        const entries = data.feed.entry || [];
        if (entries.length === 0) {
          grid.innerHTML = '<div class="panduan-loading">Belum ada panduan.</div>';
          return;
        }

        grid.innerHTML = entries.map(entry => {
          const title = entry.title.$t;
          const link = entry.link.find(l => l.rel === 'alternate').href;
          const labels = (entry.category || []).map(c => c.term);
          const content = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');
          const excerpt = content.replace(/<[^>]+>/g, '').substring(0, 120) + '...';
          const thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('/s72-c/', '/s400/') : null;

          const labelsHtml = labels.map(label =>
            `<a class="panduan-label" href="/search/label/${encodeURIComponent(label)}">${label}</a>`
          ).join('');

          const thumbHtml = thumb
            ? `<img src="${thumb}" alt="${title}"/>`
            : `<div class="panduan-thumb-placeholder"><i class="fas fa-book"></i></div>`;

          return `
            <article class="panduan-card">
              <a class="panduan-thumb" href="${link}">${thumbHtml}</a>
              <div class="panduan-body">
                <div class="panduan-labels">${labelsHtml}</div>
                <h3 class="panduan-title"><a href="${link}">${title}</a></h3>
                <p class="panduan-excerpt">${excerpt}</p>
                <a class="panduan-read" href="${link}">Baca Selengkapnya</a>
              </div>
            </article>
          `;
        }).join('');
      })
      .catch(err => {
        console.error('[Panduan Feed] Error:', err);
        grid.innerHTML = '<div class="panduan-loading">Gagal memuat panduan.</div>';
      });
  }

	/* ========== 13. PANDUAN ARCHIVE PAGE ========== */
	function initPanduanArchive() {
	  const archive = document.getElementById('panduan-archive');
	  if (!archive) return;

	  // Hanya jalan di /p/panduan.html
	  const path = window.location.pathname;
	  if (path.indexOf('/p/panduan.html') === -1) return;

	  const filterBtns = document.querySelectorAll('.filter-btn');
	  const pagination = document.getElementById('panduan-pagination');

	  let allPosts = [];
	  let currentFilter = 'all';
	  let currentPage = 1;
	  const postsPerPage = 9;

	  // Fetch semua post dari feed
	  function fetchPosts() {
		// Ambil maksimal 150 post (cukup untuk panduan)
		const feedUrl = '/feeds/posts/default?alt=json&max-results=150';

		fetch(feedUrl)
		  .then(res => res.json())
		  .then(data => {
			const entries = data.feed.entry || [];
			allPosts = entries.map(entry => {
			  const title = entry.title.$t;
			  const link = entry.link.find(l => l.rel === 'alternate').href;
			  const labels = (entry.category || []).map(c => c.term);
			  const content = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');
			  const excerpt = content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
			  const thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('/s72-c/', '/s400/') : null;

			  // Fallback: extract thumb from content
			  let finalThumb = thumb;
			  if (!finalThumb && entry.content && entry.content.$t) {
				const match = entry.content.$t.match(/<img[^>]+src=["']([^"']+)["']/);
				if (match) {
				  finalThumb = match[1].replace('/s72-c/', '/s400/').replace('/s320/', '/s400/');
				}
			  }

			  return {
				title: title,
				link: link,
				labels: labels,
				excerpt: excerpt,
				thumb: finalThumb
			  };
			});

			renderPosts();
		  })
		  .catch(err => {
			console.error('[Panduan Archive] Error:', err);
			archive.innerHTML = '<div class="panduan-loading">Gagal memuat panduan.</div>';
		  });
	  }

	  // Render posts sesuai filter & pagination
	  function renderPosts() {
		// Filter
		let filtered = allPosts;
		if (currentFilter !== 'all') {
		  filtered = allPosts.filter(post => post.labels.includes(currentFilter));
		}

		// Pagination
		const totalPages = Math.ceil(filtered.length / postsPerPage);
		const start = (currentPage - 1) * postsPerPage;
		const end = start + postsPerPage;
		const pagePosts = filtered.slice(start, end);

		// Render cards
		if (pagePosts.length === 0) {
		  archive.innerHTML = '<div class="panduan-loading">Belum ada panduan.</div>';
		  pagination.innerHTML = '';
		  return;
		}

		archive.innerHTML = pagePosts.map(post => {
		  const labelsHtml = post.labels.map(label =>
			`<a class="panduan-label" href="/search/label/${encodeURIComponent(label)}">${label}</a>`
		  ).join('');

		  const thumbHtml = post.thumb
			? `<img src="${post.thumb}" alt="${post.title}" onerror="this.parentElement.innerHTML='<div class=\\'panduan-thumb-placeholder\\'><i class=\\'fas fa-book-open\\'></i></div>'"/>`
			: `<div class="panduan-thumb-placeholder"><i class="fas fa-book-open"></i></div>`;

		  return `
			<article class="panduan-card">
			  <a class="panduan-thumb" href="${post.link}">${thumbHtml}</a>
			  <div class="panduan-body">
				<div class="panduan-labels">${labelsHtml}</div>
				<h3 class="panduan-title"><a href="${post.link}">${post.title}</a></h3>
				<p class="panduan-excerpt">${post.excerpt}</p>
				<a class="panduan-read" href="${post.link}">Baca Selengkapnya</a>
			  </div>
			</article>
		  `;
		}).join('');

		// Render pagination
		if (totalPages <= 1) {
		  pagination.innerHTML = '';
		  return;
		}

		let paginationHTML = '';
		if (currentPage > 1) {
		  paginationHTML += `<button data-page="${currentPage - 1}">Sebelumnya</button>`;
		}
		for (let i = 1; i <= totalPages; i++) {
		  paginationHTML += `<button data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
		}
		if (currentPage < totalPages) {
		  paginationHTML += `<button data-page="${currentPage + 1}">Selanjutnya</button>`;
		}
		pagination.innerHTML = paginationHTML;

		// Attach event listener ke tombol pagination
		pagination.querySelectorAll('button').forEach(btn => {
		  btn.addEventListener('click', function() {
			currentPage = parseInt(this.dataset.page);
			renderPosts();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		  });
		});
	  }

	  // Filter button click
	  filterBtns.forEach(btn => {
		btn.addEventListener('click', function() {
		  filterBtns.forEach(b => b.classList.remove('active'));
		  this.classList.add('active');
		  currentFilter = this.dataset.filter;
		  currentPage = 1;
		  renderPosts();
		});
	  });

	  // Initial fetch
	  fetchPosts();
	}

	/* ========== 14. POST NAV TITLE ========== */
	function initPostNavTitle() {
	  const navLinks = document.querySelectorAll('.post-nav a[data-url]');
	  if (navLinks.length === 0) return;

	  navLinks.forEach(link => {
		const url = link.getAttribute('data-url');
		if (!url) return;

		fetch(url)
		  .then(res => res.text())
		  .then(html => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			
			const title = 
			  doc.querySelector('.post-title')?.textContent.trim() ||
			  doc.querySelector('h1.entry-title')?.textContent.trim() ||
			  doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
			  doc.title.split(' - ')[0];
			
			if (title && title.length > 0) {
			  const placeholder = link.querySelector('.nav-title-placeholder');
			  if (placeholder) {
				placeholder.textContent = title;
				placeholder.classList.remove('nav-title-placeholder');
				placeholder.classList.add('nav-title');
			  }
			}
		  })
		  .catch(err => {
			console.warn('[PostNav] Gagal fetch title:', url, err);
			const placeholder = link.querySelector('.nav-title-placeholder');
			if (placeholder) {
			  placeholder.textContent = '';
			  placeholder.style.display = 'none';
			}
		  });
	  });
	}

  /* ========== INIT ========== */
  function init() {
    console.log('[Main] DOM Ready. Path:', window.location.pathname);

    initScrollProgress();
    initMobileMenu();
    initDropdown();
    initScrollSpy();
    initLegalActive();
    initSmoothScroll();
    initStickyNavbar();
    initBackToTop();
    initCounters();
    initSwiper();
    initYearRange();
    initPanduanFeed();
	initPanduanArchive();
	initPostNavTitle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
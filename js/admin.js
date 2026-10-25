/* ============================================================
   ADMIN PORTAL - ZAYNAYAN STORE
   ============================================================ */

(function() {
  'use strict';

  // Hash password dari admin-data.js
  function getPasswordHash() {
    return window.ADMIN_DATA ? window.ADMIN_DATA.passwordHash : '';
  }

  // SHA-256
  async function sha256(message) {
    var msgBuffer = new TextEncoder().encode(message);
    var hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(function(b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }

  // Password gate
  window.checkAdminPassword = async function() {
    var input = document.getElementById('adminPassword');
    var error = document.getElementById('passwordError');
    var gate = document.getElementById('passwordGate');
    var content = document.getElementById('adminContent');

    var inputHash = await sha256(input.value);
    var expectedHash = getPasswordHash();

    if (expectedHash && inputHash === expectedHash) {
      gate.style.display = 'none';
      content.style.display = 'block';
      sessionStorage.setItem('adminUnlocked', 'true');
      initAdminPortal();
    } else {
      error.style.display = 'block';
      error.textContent = 'Kata sandi salah. Coba lagi.';
    }
  };

  // Render kategori & link
  function renderCategories() {
    var container = document.getElementById('adminCategories');
    if (!container) return;

    var data = window.ADMIN_DATA;
    if (!data || !data.categories) {
      container.innerHTML = '<p style="text-align:center;color:#fff;">Gagal memuat data admin.</p>';
      return;
    }

    var html = '';
    data.categories.forEach(function(cat) {
      html += '<div class="category">' + cat.name + '</div>';
      html += '<div class="apps-grid">';
      cat.items.forEach(function(item) {
        html += '<div class="app-card" data-link="' + item.url + '">';
        html += '<div class="app-icon"><i class="' + item.icon + '"></i></div>';
        html += '<div class="app-name">' + item.name + '</div>';
        html += '</div>';
      });
      html += '</div>';
    });

    container.innerHTML = html;

    // Klik card → buka link
    document.querySelectorAll('.app-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var link = this.getAttribute('data-link');
        if (link) window.open(link, '_blank');
      });
    });

    // Search
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var searchTerm = this.value.toLowerCase();

        document.querySelectorAll('.app-card').forEach(function(card) {
          var appName = card.querySelector('.app-name').textContent.toLowerCase();
          card.style.display = appName.includes(searchTerm) ? 'flex' : 'none';
        });

        document.querySelectorAll('.category').forEach(function(category) {
          var section = category.nextElementSibling;
          if (!section) return;
          var visible = section.querySelectorAll('.app-card[style="display: flex"], .app-card:not([style])');
          category.style.display = visible.length === 0 ? 'none' : 'flex';
        });
      });
    }

    // Animasi
    document.querySelectorAll('.app-card').forEach(function(card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      setTimeout(function() {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  function initAdminPortal() {
    renderCategories();
  }

  // Auto-init jika sudah unlock
  document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('adminUnlocked') === 'true') {
      var gate = document.getElementById('passwordGate');
      var content = document.getElementById('adminContent');
      if (gate) gate.style.display = 'none';
      if (content) content.style.display = 'block';
      initAdminPortal();
    }
  });
})();
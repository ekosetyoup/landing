/* ============================================================
   ADMIN DATA - ZAYNAYAN STORE
   Ganti link placeholder dengan link sebenarnya.
   ============================================================ */

window.ADMIN_DATA = {
  // Password hash (SHA-256). Generate dari password pilihanmu.
  passwordHash: 'c2346d515bfcad11d4f251d771b65c3019072396d633aef817fee4a437b7c1ae',

  // Kategori & link
  categories: [

    // ═══════════════════════════════════════════════════════
    // 1. LAYER 0 - ROOT
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 0 - Root',
      items: [
        { name: 'PTP Ahu', url: 'https://ptp.ahu.go.id/beranda', icon: 'fas fa-landmark' },
        { name: 'OSS', url: 'https://oss.go.id/', icon: 'fas fa-file-contract' },
        { name: 'Pajak (Coretax)', url: 'https://coretaxdjp.pajak.go.id/', icon: 'fas fa-money-bill-wave' },
        { name: 'Merek DGIP', url: 'https://merek.dgip.go.id/', icon: 'fas fa-trademark' },
        { name: 'PSE Komdigi', url: 'https://pse.komdigi.go.id/login', icon: 'fas fa-shield-alt' },
        { name: 'BPJS TKU', url: 'https://www.bpjsketenagakerjaan.go.id/', icon: 'fas fa-hard-hat' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 2. LAYER 1 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Hosting & Server',
      items: [
        { name: 'Qwords', url: 'https://www.qwords.com/', icon: 'fas fa-server' },
        { name: 'phpMyAdmin', url: 'http://168.110.213.0:18080/', icon: 'fas fa-database' },
        { name: 'aaPanel', url: 'http://168.110.213.0:19100/', icon: 'fas fa-desktop' },
        { name: 'Cloudflare', url: 'https://dash.cloudflare.com/', icon: 'fas fa-cloud' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 3. LAYER 2 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Domain & DNS',
      items: [
        { name: 'Domain Rumahweb', url: 'https://member.rumahweb.com/', icon: 'fas fa-globe' },
        { name: 'Domain IDCloudHost', url: 'https://idcloudhost.com/', icon: 'fas fa-globe' },
        { name: 'DNS Cloudflare', url: 'https://dash.cloudflare.com/', icon: 'fas fa-network-wired' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 4. LAYER 3 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Website & CMS',
      items: [
        { name: 'WordPress', url: 'https://panduan.zaynayan.my.id/wp-login.php', icon: 'fab fa-wordpress' },
        { name: 'Blogger', url: 'https://www.blogger.com/', icon: 'fab fa-blogger' },
        { name: 'GitHub', url: 'https://github.com/', icon: 'fab fa-github' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 5. LAYER 4 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Email & Komunikasi',
      items: [
        { name: 'Zoho Mail', url: 'https://www.zoho.com/id/mail/', icon: 'fas fa-envelope' },
        { name: 'Gmail', url: 'https://mail.google.com/', icon: 'fas fa-envelope-open-text' },
        { name: 'Telegram Web', url: 'https://web.telegram.org/', icon: 'fab fa-telegram' },
        { name: 'WhatsApp Web', url: 'https://web.whatsapp.com/', icon: 'fab fa-whatsapp' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 6. LAYER 5 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Keuangan & Pembayaran',
      items: [
        { name: 'Midtrans', url: 'https://dashboard.midtrans.com/', icon: 'fas fa-credit-card' },
        { name: 'Xendit', url: 'https://dashboard.xendit.co/', icon: 'fas fa-money-check' },
        { name: 'Bank BCA', url: 'https://ibank.klikbca.com/', icon: 'fas fa-university' },
        { name: 'Bank Mandiri', url: 'https://ib.bankmandiri.co.id/', icon: 'fas fa-university' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 7. LAYER 6 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Marketing & Media Sosial',
      items: [
        { name: 'Facebook Page', url: 'https://www.facebook.com/zaynayanstore', icon: 'fab fa-facebook' },
        { name: 'Instagram', url: 'https://www.instagram.com/zaynayanstore', icon: 'fab fa-instagram' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@zaynayanstores', icon: 'fab fa-tiktok' },
        { name: 'YouTube Studio', url: 'https://studio.youtube.com/', icon: 'fab fa-youtube' },
        { name: 'Google Ads', url: 'https://ads.google.com/', icon: 'fas fa-bullhorn' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 8. LAYER 7 -
    // ═══════════════════════════════════════════════════════
    {
      name: 'Analytics & Monitoring',
      items: [
        { name: 'Google Analytics', url: 'https://analytics.google.com/', icon: 'fas fa-chart-line' },
        { name: 'Search Console', url: 'https://search.google.com/search-console', icon: 'fas fa-search' },
        { name: 'Status Server', url: 'https://status.zaynayanstore.com', icon: 'fas fa-heartbeat' },
        { name: 'UptimeRobot', url: 'https://uptimerobot.com/', icon: 'fas fa-server' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 9. PENYIMPANAN & FILE
    // ═══════════════════════════════════════════════════════
    {
      name: 'Penyimpanan & File',
      items: [
        { name: 'Google Drive', url: 'https://drive.google.com/', icon: 'fab fa-google-drive' },
        { name: 'Dropbox', url: 'https://www.dropbox.com/login', icon: 'fab fa-dropbox' },
        { name: 'Mega', url: 'https://mega.nz/login', icon: 'fas fa-cloud-upload' },
        { name: 'Terabox', url: 'https://www.terabox.com/', icon: 'fas fa-cloud-upload' },
        // Tambah link lain di sini...
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 10. TOOLS & UTILITIES
    // ═══════════════════════════════════════════════════════
    {
      name: 'Tools & Utilities',
      items: [
        { name: 'Canva', url: 'https://www.canva.com/', icon: 'fas fa-palette' },
        { name: 'TinyPNG', url: 'https://tinypng.com/', icon: 'fas fa-compress' },
        { name: 'JSON Formatter', url: 'https://jsonformatter.org/', icon: 'fas fa-code' },
        { name: 'Regex Tester', url: 'https://regex101.com/', icon: 'fas fa-code' },
        // Tambah link lain di sini...
      ]
    }

  ]
};
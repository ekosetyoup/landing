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
		{ name: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox', icon: 'fas fa-envelope-open-text' },
        { name: 'Qwords', url: 'https://portal.qwords.com/login', icon: 'fas fa-server' },
		{ name: 'ArenHost', url: 'https://arenhost.id/client/clientarea.php', icon: 'fa-solid fa-globe' },
		{ name: 'Download Keepass', url: 'https://play.google.com/store/apps/details?id=com.kunzisoft.keepass.free', icon: 'fa-solid fa-key' },
		{ name: 'Download Authy', url: 'https://play.google.com/store/apps/details?id=com.authy.authy', icon: 'fa-solid fa-unlock-keyhole' },
		{ name: 'Google Drive', url: 'https://drive.google.com/', icon: 'fab fa-google-drive' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 2. LAYER 1 - LEGAL
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 1 - Legal',
      items: [
		{ name: 'AHU PTP', url: 'https://elayanan.ahu.go.id/login', icon: 'fas fa-landmark' },
        { name: 'OSS RBA', url: 'https://ui-login.oss.go.id/login', icon: 'fas fa-file-contract' },
        { name: 'CORETAX', url: 'https://coretaxdjp.pajak.go.id/identityproviderportal/Account/Login', icon: 'fas fa-money-bill-wave' },
        { name: 'BPJS TKU', url: 'https://sipp.bpjsketenagakerjaan.go.id/', icon: 'fas fa-hard-hat' },
		{ name: 'PRIVY', url: 'https://oauth2.privypass.id/login?response_type=code&client_id=aZBguRdDeyGeCyWWa2VjagjVImejopIySR4JqG2S_Ew&redirect_uri=https://super-app.privy.id/auth/callback&scope=write+read+public+application:manage&state=%7b%22redirect%22:%22/document/list/todo%253F_gl=1*y6e4b6*_gcl_au*MTM4MDU2MTIxNC4xNzczODc5MDYy%22,%22profile%22:%22oauth%22%7d&register=true', icon: 'fa-solid fa-heart-circle-check' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 3. LAYER 2 - INFRASTRUKTUR
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 2 - Infrastruktur',
      items: [
        { name: 'DNS Cloudflare', url: 'https://dash.cloudflare.com/login', icon: 'fa-brands fa-cloudflare' },
		{ name: 'Oracle OCI', url: 'https://www.oracle.com/asean/cloud/sign-in.html', icon: 'fa-solid fa-circle-notch' },
        { name: 'GitHub', url: 'https://github.com/login', icon: 'fab fa-github' },
		{ name: 'Statping-ng', url: 'https://status.zaynayan.my.id/login', icon: 'fa-solid fa-chart-simple' },
		{ name: 'HetrixTools', url: 'https://hetrixtools.com/login/', icon: 'fa-solid fa-chart-column' },
        { name: 'Zoho Mail', url: 'https://mailadmin.zoho.com/', icon: 'fas fa-envelope' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 4. LAYER 3 - OPERASIONAL
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 3 - Operasional',
      items: [
        { name: 'Admin BukaOlshop', url: 'https://admin.bukaolshop.com/', icon: 'fa-solid fa-user-tie' },
        { name: 'Blogger', url: 'https://www.blogger.com/', icon: 'fab fa-blogger' },
        { name: 'Vercel', url: 'https://vercel.com/login', icon: 'fa-solid fa-caret-up' },
        { name: 'Google Analytics', url: 'https://analytics.google.com/', icon: 'fas fa-chart-line' },
        { name: 'Search Console', url: 'https://search.google.com/search-console', icon: 'fas fa-search' },
		{ name: 'Google Ads', url: 'https://ads.google.com/', icon: 'fas fa-bullhorn' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 5. LAYER 4 - PAYMENT
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 4 - Payment',
      items: [
        { name: 'Midtrans', url: 'https://dashboard.midtrans.com/login', icon: 'fa-solid fa-lines-leaning' },
        { name: 'Tripay', url: 'https://tripay.id/login', icon: 'fa-solid fa-wallet' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 6. LAYER 5 - SUPPLIER
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 5 - Supplier',
      items: [
        { name: 'ApiGames', url: 'https://member.apigames.id/login', icon: 'fa-brands fa-algolia' },
        { name: 'Toko Voucher', url: 'https://member.tokovoucher.net/login', icon: 'fa-solid fa-t' },
        { name: 'DigiFlazz', url: 'https://member.digiflazz.com/login', icon: 'fa-solid fa-d' },
        { name: 'Orderkuota', url: 'https://orderkuota.com/user/login', icon: 'fa-brands fa-odnoklassniki' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 7. LAYER 6 - DISTRIBUSI
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 6 - Distribusi',
      items: [
        { name: 'Website', url: 'https://www.zaynayanstore.com', icon: 'fa-solid fa-globe' },
		{ name: 'Facebook Page', url: 'https://www.facebook.com/zaynayanstore', icon: 'fab fa-facebook' },
        { name: 'Instagram', url: 'https://www.instagram.com/zaynayanstore', icon: 'fab fa-instagram' },
		{ name: 'Meta Business', url: 'https://www.facebook.com/zaynayanstore', icon: 'fa-brands fa-meta' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@zaynayanstores', icon: 'fab fa-tiktok' },
        { name: 'YouTube Studio', url: 'https://studio.youtube.com/', icon: 'fab fa-youtube' },
        { name: 's.id', url: 'https://ads.google.com/', icon: 'fa-brands fa-stripe-s' },
		{ name: 'Linktr.ee', url: 'https://ads.google.com/', icon: 'fa-brands fa-linktree' },
		{ name: 'Lynk.id', url: 'https://ads.google.com/', icon: 'fa-solid fa-l' },
		{ name: 'APKPure', url: 'https://ads.google.com/', icon: 'fa-brands fa-app-store-ios' },
		{ name: 'apk.com', url: 'https://ads.google.com/', icon: 'fa-brands fa-app-store-ios' },
		{ name: 'Sociabuzz', url: 'https://ads.google.com/', icon: 'fa-solid fa-link' },
        { name: 'Saweria', url: 'https://ads.google.com/', icon: 'fa-solid fa-s' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 8. LAYER 7 - CS
    // ═══════════════════════════════════════════════════════
    {
      name: 'Layer 7 - Customer Service',
      items: [
        { name: 'WhatsApp Business', url: 'https://wa.link/fvftjn', icon: 'fa-brands fa-whatsapp' },
        { name: 'Channel Telegram', url: 'https://t.me/zaynayanstore_official', icon: 'fa-brands fa-telegram' },
      ]
    },

    // ═══════════════════════════════════════════════════════
    // 9. Checker
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
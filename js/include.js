async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const res = await fetch(file);
        const html = await res.text();
        el.innerHTML = html;

        // 🔥 Setelah navbar dimuat
        if (id === "navbar") {
            console.log("NAVBAR LOADED");

            if (typeof initNavigation === "function") {
                console.log("INIT ACTIVE NAV");
                initNavigation();
            }

            if (typeof initMobileMenu === "function") {
                console.log("INIT MOBILE MENU");
                initMobileMenu();
            }

            if (typeof initDropdownMobile === "function") {
                console.log("INIT DROPDOWN");
                initDropdownMobile();
            }
        }

        // 🔥 Setelah footer dimuat
        if (id === "footer") {
            console.log("FOOTER LOADED");

            if (typeof initYearRange === "function") {
                console.log("INIT YEAR");
                initYearRange();
            }
        }

    } catch (err) {
        console.error("Gagal load:", file);
    }
}

// Load semua komponen
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar", "/partials/navbar.html");
    loadComponent("footer", "/partials/footer.html");
});
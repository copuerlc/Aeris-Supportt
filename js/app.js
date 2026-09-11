(() => {
  "use strict";

  const AERIS = {
    name: "Aeris",
    version: "1.0.1",
    discord: "https://discord.gg/aeris",
    installer: "downloads/Aeris_1.0.1_x64_en-US.msi"
  };

  const NAV = [
    ["START", [["Home","index.html"],["Downloads","pages/downloads.html"],["FAQ","pages/faq.html"]]],
    ["SUPPORT", [["Troubleshooting","fixes/descriptor-file.html"],["Paks Not Loading","pages/paks-not-loading.html"],["How to Install","pages/how-to-install.html"],["How to Play","pages/how-to-play.html"],["Launcher Setup","pages/launcher-setup.html"]]],
    ["COMMUNITY", [["Discord","pages/discord.html"],["Support","pages/support.html"],["Changelog","pages/changelog.html"]]]
  ];

  const SEARCH = [
    ["Failed to Find Descriptor File","PAK loading, Aftermath library and 14.40 checks.","fixes/descriptor-file.html"],
    ["Paks Not Loading","Fix missing custom loading screens and unloaded PAK files.","pages/paks-not-loading.html"],
    ["Launcher Not Opening","WebView2, network and startup checks.","fixes/launcher-not-opening.html"],
    ["Authentication Failed","Login and session troubleshooting.","fixes/authentication.html"],
    ["Login Screen","Antivirus, WARP and connection checks.","fixes/login-screen.html"],
    ["Application Crash Detected","Reset FortniteGame data and retry.","fixes/application-crash.html"],
    ["No Audio","Install DirectX runtime and restart.","fixes/no-audio.html"],
    ["Error 2502 / 2503","Windows installer error guide.","fixes/error-2502-2503.html"],
    ["Controller Setup","Controller connection and DS4Windows guidance.","fixes/controller-setup.html"],
    ["Build Doesn't Launch","General build startup troubleshooting.","fixes/build-doesnt-launch.html"],
    ["MSVCP140 Error","Runtime component troubleshooting.","fixes/msvcp140.html"],
    ["DNS Lookup","Network/DNS troubleshooting.","fixes/dns-lookup.html"],
    ["Launch Code","Launch code troubleshooting.","fixes/launch-code.html"],
    ["Verify Build","Verify your build setup.","fixes/verify-build.html"],
    ["Downloads","Aeris installer and required files.","pages/downloads.html"],
    ["How to Install","Aeris installation guide.","pages/how-to-install.html"],
    ["How to Play","Getting into the game.","pages/how-to-play.html"],
    ["Launcher Setup","Launcher configuration guide.","pages/launcher-setup.html"],
    ["FAQ","Frequently asked questions.","pages/faq.html"],
    ["Discord","Join the Aeris community.","pages/discord.html"],
    ["Support","Get help from the Aeris team.","pages/support.html"],
    ["Changelog","Aeris release history.","pages/changelog.html"]
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const depth = () => document.body.dataset.depth === "1" ? "../" : "";

  function buildNav() {
    const nav = $("#nav");
    if (!nav) return;
    nav.innerHTML = NAV.map(([label, items]) =>
      `<div class="nav-label">${label}</div>` +
      items.map(([name, path]) => `<a href="${depth()}${path}"><span>${name}</span></a>`).join("")
    ).join("");

    const current = location.pathname.replace(/\/+$/, "") || "/";
    $$("a", nav).forEach(a => {
      try {
        const path = new URL(a.href, location.href).pathname.replace(/\/+$/, "") || "/";
        if (path === current || (current.endsWith("/") && path.endsWith("/index.html"))) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
      } catch {}
    });
  }

  function buildFooter() {
    const footer = $(".footer");
    if (!footer) return;
    footer.innerHTML = `
      <div><strong>Aeris Support</strong> · Support Console v${AERIS.version}</div>
      <div style="margin-top:7px">
        <a href="${depth()}index.html">Home</a>
        <a href="${depth()}pages/downloads.html">Downloads</a>
        <a href="${depth()}pages/faq.html">FAQ</a>
        <a href="${depth()}pages/changelog.html">Changelog</a>
        <a href="${AERIS.discord}" target="_blank" rel="noopener">Discord ↗</a>
      </div>`;
  }

  function setupBrand() {
    const brand = $(".brand");
    const img = $(".brand img");
    if (brand) brand.href = `${depth()}index.html`;
    if (img) img.src = `${depth()}assets/icons/aeris.png`;
  }

  function setupMobile() {
    const menu = $(".mobile");
    const sidebar = $(".side");
    if (!menu || !sidebar) return;

    const close = () => sidebar.classList.remove("open");
    menu.addEventListener("click", () => sidebar.classList.toggle("open"));
    $$(".nav a", sidebar).forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
    });
  }

  function setupPalette() {
    const palette = $("#command");
    const input = $("#commandInput");
    const list = $("#cmdItems");
    if (!palette || !input || !list) return;

    const render = q => {
      const query = q.trim().toLowerCase();
      const matches = SEARCH.filter(x => !query || `${x[0]} ${x[1]}`.toLowerCase().includes(query)).slice(0, 8);
      list.innerHTML = matches.length
        ? matches.map(x => `<a href="${depth()}${x[2]}"><b>${x[0]}</b><small>${x[1]}</small></a>`).join("")
        : `<div style="padding:18px;color:#657184;font-size:11px">No Aeris article found.</div>`;
    };

    const open = () => {
      palette.classList.add("open");
      palette.setAttribute("aria-hidden","false");
      input.value = "";
      render("");
      setTimeout(() => input.focus(), 20);
    };
    const close = () => {
      palette.classList.remove("open");
      palette.setAttribute("aria-hidden","true");
    };

    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); open();
      } else if (e.key === "Escape") close();
    });
    palette.addEventListener("click", e => { if (e.target === palette) close(); });
    input.addEventListener("input", () => render(input.value));
    render("");
  }

  function setupSearch() {
    const input = $("#searchInput");
    const results = $("#results");
    if (!input || !results) return;

    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.classList.remove("show");
        results.innerHTML = "";
        return;
      }
      const matches = SEARCH.filter(x => `${x[0]} ${x[1]}`.toLowerCase().includes(q)).slice(0, 7);
      results.innerHTML = matches.length
        ? matches.map(x => `<a class="result" href="${depth()}${x[2]}"><b>${x[0]}</b><small>${x[1]}</small></a>`).join("")
        : `<div class="result"><b>No match</b><small>Try a different Aeris keyword.</small></div>`;
      results.classList.add("show");
    };

    input.addEventListener("input", render);
    input.addEventListener("focus", () => { if (input.value.trim()) render(); });
    input.addEventListener("keydown", e => {
      if (e.key === "Escape") { input.value = ""; render(); input.blur(); }
      if (e.key === "Enter") {
        const first = $(".result[href]", results);
        if (first) first.click();
      }
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".search")) results.classList.remove("show");
    });
  }

  function setupStatus() {
    const browser = $("#browserCheck, #browserStatus, [data-browser-status]");
    const connection = $("#connectionCheck, #connectionStatus, [data-connection-status]");
    if (browser) browser.textContent = navigator.userAgent ? "Ready" : "Unknown";
    const update = () => { if (connection) connection.textContent = navigator.onLine ? "Online" : "Offline"; };
    update();
    addEventListener("online", update);
    addEventListener("offline", update);
  }

  function setupDiscord() {
    $$("[data-discord]").forEach(a => {
      a.href = AERIS.discord;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function setupLinks() {
    document.addEventListener("click", e => {
      const link = e.target.closest("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const href = link.getAttribute("href") || "";
      if (/^(https?:|mailto:|tel:|javascript:|#)/i.test(href)) return;
      document.body.classList.add("leaving");
      setTimeout(() => document.body.classList.remove("leaving"), 170);
    });
  }

  window.AERIS = AERIS;
  document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    buildFooter();
    setupBrand();
    setupMobile();
    setupPalette();
    setupSearch();
    setupStatus();
    setupDiscord();
    setupLinks();
  });
})();
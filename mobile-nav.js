(function () {
  var style = document.createElement('style');
  style.textContent = `
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
      z-index: 1100;
      flex-shrink: 0;
    }
    .hamburger span {
      display: block;
      height: 2px;
      background: #f0f0f5;
      border-radius: 2px;
      transition: transform 0.3s, opacity 0.3s, width 0.3s;
      width: 100%;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
    .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .mobile-menu {
      display: none;
      position: fixed;
      top: 68px;
      left: 0; right: 0;
      background: rgba(8,6,8,0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      z-index: 999;
      flex-direction: column;
      padding: 16px 24px 28px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu a {
      color: #f0e8f5;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      padding: 14px 0;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      transition: color 0.2s;
    }
    .mobile-menu a:last-child { border-bottom: none; }
    .mobile-menu a:hover { color: #ff2d78; }
    .mobile-menu .mob-cta {
      margin-top: 16px;
      font-family: 'Syne', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #fff !important;
      background: linear-gradient(180deg, #ff4d8f 0%, #ff2d78 60%, #a040c8 100%);
      border: none;
      border-bottom: 2px solid #7a1a9a !important;
      border-radius: 999px;
      padding: 13px 20px !important;
      text-align: center;
      box-shadow: 0 3px 10px rgba(155,95,232,0.3);
      transition: all 0.15s;
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    if (!nav) return;

    // Collect links — skip the logo (first <a>)
    var allLinks = nav.querySelectorAll('a');
    var links = [];
    allLinks.forEach(function (a, i) {
      if (i === 0) return; // skip logo
      links.push({
        href: a.getAttribute('href'),
        text: a.textContent.trim(),
        isCta: a.classList.contains('nav-cta')
      });
    });

    // Hamburger
    var burger = document.createElement('button');
    burger.className = 'hamburger';
    burger.setAttribute('aria-label', 'Menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(burger);

    // Mobile menu
    var menu = document.createElement('div');
    menu.className = 'mobile-menu';
    links.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.text;
      if (l.isCta) a.classList.add('mob-cta');
      menu.appendChild(a);
    });
    document.body.insertBefore(menu, document.body.firstChild);

    // Toggle
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        menu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menu.contains(e.target)) {
        burger.classList.remove('open');
        menu.classList.remove('open');
      }
    });
  });
})();

// ── COOKIE CONSENT BANNER ──────────────────────────────────────────────────
(function () {
  if (localStorage.getItem('sw_cookie_consent')) return;

  var style = document.createElement('style');
  style.textContent = `
    #sw-cookie-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 99999;
      background: rgba(10, 7, 12, 0.97);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      box-shadow: 0 -4px 40px rgba(0,0,0,0.5);
      animation: cookieSlideUp 0.4s ease both;
    }
    @keyframes cookieSlideUp {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    #sw-cookie-banner p {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      color: rgba(200,185,215,0.75);
      line-height: 1.55;
      margin: 0;
      flex: 1;
      min-width: 220px;
    }
    #sw-cookie-banner p a {
      color: #ff2d78;
      text-decoration: none;
    }
    #sw-cookie-banner p a:hover { text-decoration: underline; }
    #sw-cookie-btns {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }
    #sw-cookie-accept {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 0.5px;
      color: #fff;
      background: linear-gradient(180deg, #ff4d8f 0%, #ff2d78 60%, #a040c8 100%);
      border: none;
      border-bottom: 2px solid #7a1a9a;
      padding: 9px 22px;
      border-radius: 999px;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 3px 10px rgba(155,95,232,0.3);
      transition: all 0.15s;
    }
    #sw-cookie-accept:hover { transform: translateY(-1px); box-shadow: 0 5px 14px rgba(155,95,232,0.4); }
    #sw-cookie-decline {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      color: rgba(200,185,215,0.5);
      background: none;
      border: 1px solid rgba(255,255,255,0.12);
      padding: 9px 18px;
      border-radius: 999px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }
    #sw-cookie-decline:hover { color: rgba(200,185,215,0.85); border-color: rgba(255,255,255,0.25); }
    @media (max-width: 560px) {
      #sw-cookie-banner { padding: 16px 20px; }
      #sw-cookie-btns { width: 100%; }
      #sw-cookie-accept, #sw-cookie-decline { flex: 1; text-align: center; }
    }
  `;
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'sw-cookie-banner';
  banner.innerHTML = `
    <p>
      We use cookies to analyse traffic, track affiliate clicks, and improve your experience.
      By clicking <strong style="color:#f0e8f5;">Accept</strong>, you agree to our use of cookies.
      <a href="/privacy-policy/">Privacy Policy</a>
    </p>
    <div id="sw-cookie-btns">
      <button id="sw-cookie-decline">Decline</button>
      <button id="sw-cookie-accept">Accept All</button>
    </div>
  `;

  function dismiss(choice) {
    localStorage.setItem('sw_cookie_consent', choice);
    banner.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(function () { banner.remove(); }, 380);
  }

  document.body.appendChild(banner);

  banner.querySelector('#sw-cookie-accept').addEventListener('click', function () { dismiss('accepted'); });
  banner.querySelector('#sw-cookie-decline').addEventListener('click', function () { dismiss('declined'); });
})();

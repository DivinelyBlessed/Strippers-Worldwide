const fs = require('fs');
let c = fs.readFileSync('c:/Users/Hp/Downloads/SW/index.html', 'utf8');

// 1. Replace nav logo SVG with image
const svgStart = c.indexOf('<a href="/" class="nav-logo">');
const svgEnd = c.indexOf('Strippers<span>Worldwide</span>', svgStart) + 'Strippers<span>Worldwide</span>'.length;
const newNavLogo = `<a href="/" class="nav-logo">
    <img src="/assets/images/real-girls/logo.jpeg" alt="" width="72" height="72" style="flex-shrink:0;mix-blend-mode:screen;filter:brightness(1.3) saturate(1.5) contrast(1.1) ;object-fit:contain;margin-right:-18px;">
    <span style="white-space:nowrap;background:linear-gradient(90deg,#ff2d78,#9b5fe8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;position:relative;top:4px;">Strippers Worldwide</span>`;
c = c.slice(0, svgStart) + newNavLogo + c.slice(svgEnd);

// 2. Nav pill font size
c = c.replace('font-size: 0.82rem; font-weight: 500;\n      color: var(--muted); text-decoration: none;\n      padding: 6px 14px; border-radius: 999px;\n      transition: all 0.2s; letter-spacing: 0.3px;',
  'font-size: 0.95rem; font-weight: 500;\n      color: var(--muted); text-decoration: none;\n      padding: 6px 14px; border-radius: 999px;\n      transition: all 0.2s; letter-spacing: 0.3px;');

// 3. Nav pill hover pink
c = c.replace('.nav-pill:hover { color: var(--text); background: var(--border); }', '.nav-pill:hover { color: #ff2d78; background: var(--border); }');

// 4. Get Access button pink with white text
c = c.replace('class="nav-cta">Get Access</a>', 'class="nav-cta" style="background:#ff2d78;color:#fff;">Get Access</a>');

// 5. Nav background black
c = c.replace('background: rgba(8,6,8,0.85);', 'background: rgba(0,0,0,0.95);');

// 6. Pink/purple color scheme
c = c.replace(/--pink: #ff2d78;[\s\S]*?--pink-soft: #ff6fa3;/, '--pink: #a50030;\n      --pink-soft: #cc3355;');

// 7. The Ultimate Hub gradient
c = c.replace('The Ultimate Hub<br>for', '<span style="background:linear-gradient(90deg,#ff2d78,#9b5fe8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;white-space:nowrap;">The Ultimate Hub</span><br><span style="color:#a50030;">for</span>');

// 8. Rotating words dark red
c = c.replace('.hero-fw-h1 .word-track span { color: #d472f0; }', '.hero-fw-h1 .word-track span { color: #a50030 !important; -webkit-text-fill-color: #a50030 !important; }');

// 9. Hero padding
c = c.replace('align-items: center; justify-content: center;\n      text-align: center;\n      padding: 140px 24px 60px;',
  'align-items: center; justify-content: center;\n      text-align: center;\n      padding: 170px 24px 60px;');

// 10. Subtitle yellow, italic, no fullstop
c = c.replace('color: var(--muted); font-weight: 300;\n      line-height: 1.6; max-width: 480px;\n      margin: 0 auto 28px;',
  'color: #ffc24a; font-weight: 400;\n      line-height: 1.6; max-width: 540px;\n      margin: 0 auto 28px; font-style: italic; letter-spacing: 0.3px;');

// 11. Hero subtitle text + force yellow inline
c = c.replace('<p class="hero-fw-sub" style="animation:fadeUp 0.6s ease 0.2s both;">', '<p class="hero-fw-sub" style="animation:fadeUp 0.6s ease 0.2s both;color:#ffc24a !important;">');
c = c.replace('Live Cams, AI Girls, Dating, and VIP exclusives. All in one immersive experience. Instant access, no waiting.', 'Live Cams, AI Girls, Dating, and VIP exclusives. All in one immersive experience. Instant access, no waiting');

// 12. Footer logo image
c = c.replace('<a href="/" class="footer-logo">Strippers<span>Worldwide</span></a>',
  '<a href="/" class="footer-logo" style="display:flex;align-items:center;gap:2px;margin-left:-22px;margin-bottom:-20px;"><img src="/assets/images/real-girls/logo.jpeg" alt="" width="72" height="72" style="flex-shrink:0;mix-blend-mode:screen;filter:brightness(1.3) saturate(1.5) contrast(1.1) ;object-fit:contain;margin-right:-18px;"><span style="white-space:nowrap;background:linear-gradient(90deg,#ff2d78,#9b5fe8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:\'Playfair Display\',serif;font-size:1.35rem;font-weight:700;position:relative;top:4px;">Strippers Worldwide</span></a>');

// 13. Footer layout full width
c = c.replace('.footer-grid { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }',
  '.footer-grid { max-width: 100%; padding: 0 60px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }');
c = c.replace('.footer-bottom { max-width: 1140px; margin: 0 auto; padding-top: 24px;',
  '.footer-bottom { max-width: 100%; padding-left: 60px; padding-right: 60px; padding-top: 24px;');

// 14. Footer description text
c = c.replace('Your all-in-one hub for AI Girls, Live Cams, Dating, and VIP access. Built for instant connection and real interaction.',
  'Your all-in-one hub for Live Cams, Dating,<br>AI Girls, VIP access and lots more. Built for instant connection and real interaction.');

// 15. Footer col hover pink
c = c.replace('.footer-col a:hover { color: var(--text); }', '.footer-col a:hover { color: #ff2d78; }');

// 16. Ticker text white
c = c.replace('padding: 12px 32px; font-size: 0.85rem; color: var(--text);', 'padding: 12px 32px; font-size: 0.85rem; color: #ffffff;');

// 17. Watch Live Now red, Start Chatting purple
c = c.replace('<a href="#AFFILIATE_LINK" class="btn-primary">🔴 Watch Live Now</a>\n    <a href="#AFFILIATE_LINK" class="btn-secondary">💬 Start Chatting</a>',
  '<a href="#AFFILIATE_LINK" class="btn-primary" style="background:#a50030;">🔴 Watch Live Now</a>\n    <a href="#AFFILIATE_LINK" class="btn-secondary" style="background:#7c3aed;border-color:#9b5cf6;">💬 Start Chatting</a>');

// 18. LIVE NOW badge color white
c = c.replace('LIVE NOW — 12,400+ MODELS ONLINE\n      </div>', 'LIVE NOW — 12,400+ MODELS ONLINE\n      </div>');

// 19. hero-cam-section padding
c = c.replace('padding: 80px 24px;\n      background: var(--deep);', 'padding: 36px 24px;\n      background: var(--deep);');

// 20. Footer brand flex
c = c.replace('.footer-brand p { font-size: 0.85rem; color: var(--muted); line-height: 1.7; font-weight: 300; max-width: 280px; }',
  '.footer-brand { display: flex; flex-direction: column; align-items: flex-start; }\n    .footer-brand p { font-size: 0.85rem; color: var(--muted); line-height: 1.7; font-weight: 300; max-width: 280px; margin-left: 0; }');

// 21. Footer padding
c = c.replace('footer { background: #060407; border-top: 1px solid var(--border); padding: 60px 24px 32px; }',
  'footer { background: #060407; border-top: 1px solid var(--border); padding: 60px 0 32px; }');

fs.writeFileSync('c:/Users/Hp/Downloads/SW/index.html', c, 'utf8');
console.log('All changes reapplied. Length:', c.length);

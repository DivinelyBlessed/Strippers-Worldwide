(function () {
  // Show once per session, and never again if already submitted
  if (sessionStorage.getItem('emailPopupSeen') === '1') return;
  if (localStorage.getItem('emailPopupDone') === '1') return;

  var DELAY_MS = 18000; // show after 18 seconds

  var style = document.createElement('style');
  style.textContent = [
    '#ep-overlay{position:fixed;inset:0;z-index:99990;display:flex;align-items:center;justify-content:center;background:rgba(5,3,8,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:epFadeIn 0.4s ease both;}',
    '@keyframes epFadeIn{from{opacity:0}to{opacity:1}}',
    '@keyframes epSlideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}',
    '#ep-box{background:linear-gradient(160deg,#1a0e22,#0d0a12);border:1px solid rgba(255,45,120,0.3);border-radius:22px;padding:44px 36px 36px;max-width:420px;width:92%;text-align:center;box-shadow:0 0 80px rgba(165,0,48,0.3),0 24px 60px rgba(0,0,0,0.6);position:relative;animation:epSlideUp 0.45s ease 0.1s both;}',
    '#ep-close{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,0.35);font-size:1.2rem;cursor:pointer;line-height:1;padding:4px 8px;transition:color 0.2s;}',
    '#ep-close:hover{color:rgba(255,255,255,0.7);}',
    '#ep-box .ep-icon{font-size:2.4rem;margin-bottom:12px;display:block;}',
    '#ep-box .ep-badge{display:inline-block;background:rgba(255,194,74,0.15);border:1px solid rgba(255,194,74,0.35);border-radius:999px;padding:4px 16px;font-size:0.7rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#ffc24a;margin-bottom:18px;}',
    '#ep-box h2{font-family:"Playfair Display",Georgia,serif;font-size:1.6rem;font-weight:700;color:#f0e8f5;margin:0 0 8px;line-height:1.2;}',
    '#ep-box .ep-sub{font-size:0.85rem;color:#8a7a96;line-height:1.7;margin:0 0 24px;}',
    '#ep-box .ep-sub strong{color:#ffc24a;}',
    '#ep-form{display:flex;flex-direction:column;gap:10px;}',
    '#ep-email{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:13px 16px;font-size:0.9rem;color:#f0e8f5;font-family:inherit;outline:none;transition:border-color 0.2s;}',
    '#ep-email:focus{border-color:rgba(255,45,120,0.5);}',
    '#ep-email::placeholder{color:rgba(138,122,150,0.6);}',
    '#ep-submit{background:linear-gradient(135deg,#c4003e,#7a20d4);color:#fff;border:none;border-radius:999px;padding:14px;font-size:0.95rem;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:0.3px;transition:transform 0.15s,box-shadow 0.15s;}',
    '#ep-submit:hover{transform:scale(1.03);box-shadow:0 6px 24px rgba(255,45,120,0.45);}',
    '#ep-success{display:none;padding:10px 0;}',
    '#ep-success p{color:#00c87a;font-weight:700;font-size:1rem;margin-bottom:8px;}',
    '#ep-success small{color:#8a7a96;font-size:0.78rem;}',
    '#ep-skip{background:none;border:none;color:rgba(138,122,150,0.5);font-size:0.75rem;cursor:pointer;margin-top:14px;font-family:inherit;transition:color 0.2s;display:block;width:100%;text-align:center;}',
    '#ep-skip:hover{color:rgba(138,122,150,0.8);}',
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'ep-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = [
    '<div id="ep-box">',
    '  <button id="ep-close" aria-label="Close">&times;</button>',
    '  <span class="ep-icon">🎁</span>',
    '  <div class="ep-badge">Members Only</div>',
    '  <h2>Get 3 Free Tokens</h2>',
    '  <p class="ep-sub">Join the Strippers Worldwide inner circle.<br><strong>Free tokens</strong> + exclusive daily offers sent straight to your inbox.</p>',
    '  <div id="ep-form">',
    '    <input id="ep-email" type="email" placeholder="Enter your email address" autocomplete="email">',
    '    <button id="ep-submit">Claim My Free Tokens &rarr;</button>',
    '  </div>',
    '  <div id="ep-success">',
    '    <p>You\'re in! Check your inbox.</p>',
    '    <small>Your free tokens will be sent within 24 hours.</small>',
    '  </div>',
    '  <button id="ep-skip">No thanks, I don\'t want free tokens</button>',
    '</div>',
  ].join('');

  document.body.appendChild(overlay);

  function closePopup() {
    sessionStorage.setItem('emailPopupSeen', '1');
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.opacity = '0';
    setTimeout(function () { overlay.style.display = 'none'; }, 310);
  }

  document.getElementById('ep-close').addEventListener('click', closePopup);
  document.getElementById('ep-skip').addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closePopup(); });

  document.getElementById('ep-submit').addEventListener('click', function () {
    var email = document.getElementById('ep-email').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('ep-email').style.borderColor = 'rgba(255,45,120,0.7)';
      document.getElementById('ep-email').focus();
      return;
    }
    // Store locally — replace this with a real email service (Mailchimp, ConvertKit, etc.)
    localStorage.setItem('emailPopupDone', '1');
    localStorage.setItem('swSubscriberEmail', email);
    document.getElementById('ep-form').style.display = 'none';
    document.getElementById('ep-success').style.display = 'block';
    document.getElementById('ep-skip').style.display = 'none';
    setTimeout(closePopup, 3200);
  });

  // Show after delay
  setTimeout(function () {
    overlay.style.display = 'flex';
  }, DELAY_MS);
})();

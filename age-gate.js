(function () {
  if (sessionStorage.getItem('ageVerified') === '1') return;

  var style = document.createElement('style');
  style.textContent = [
    '#ag-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(5,3,8,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}',
    '#ag-box{background:linear-gradient(160deg,#16101a,#0d0a12);border:1px solid rgba(255,45,120,0.25);border-radius:20px;padding:48px 40px 40px;max-width:440px;width:90%;text-align:center;box-shadow:0 0 80px rgba(165,0,48,0.35),0 24px 60px rgba(0,0,0,0.7);}',
    '#ag-box .ag-icon{font-size:2.6rem;margin-bottom:16px;display:block;}',
    '#ag-box h2{font-family:"Playfair Display",Georgia,serif;font-size:1.75rem;font-weight:700;color:#f0e8f5;margin:0 0 10px;}',
    '#ag-box p{font-size:0.88rem;color:#8a7a96;line-height:1.7;margin:0 0 28px;}',
    '#ag-box .ag-badge{display:inline-block;background:rgba(255,45,120,0.12);border:1px solid rgba(255,45,120,0.3);border-radius:999px;padding:4px 14px;font-size:0.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ff2d78;margin-bottom:24px;}',
    '#ag-box .ag-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}',
    '#ag-enter{background:linear-gradient(135deg,#c4003e,#7a20d4);color:#fff;border:none;border-radius:999px;padding:14px 36px;font-size:0.95rem;font-weight:700;cursor:pointer;letter-spacing:0.4px;transition:transform 0.15s,box-shadow 0.15s;font-family:inherit;}',
    '#ag-enter:hover{transform:scale(1.04);box-shadow:0 6px 24px rgba(255,45,120,0.5);}',
    '#ag-leave{background:transparent;color:#8a7a96;border:1px solid rgba(255,255,255,0.1);border-radius:999px;padding:14px 28px;font-size:0.88rem;font-weight:600;cursor:pointer;transition:color 0.2s,border-color 0.2s;font-family:inherit;}',
    '#ag-leave:hover{color:#f0e8f5;border-color:rgba(255,255,255,0.25);}',
    '#ag-box .ag-legal{font-size:0.72rem;color:rgba(138,122,150,0.55);margin-top:22px;line-height:1.6;}',
    'body.ag-locked{overflow:hidden;}'
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'ag-overlay';
  overlay.innerHTML = [
    '<div id="ag-box">',
    '  <span class="ag-icon">🔞</span>',
    '  <div class="ag-badge">Adults Only — 18+</div>',
    '  <h2>Age Verification</h2>',
    '  <p>This website contains adult content intended for mature audiences only.<br>You must be 18 years of age or older to enter.</p>',
    '  <div class="ag-btns">',
    '    <button id="ag-enter">Yes, I\'m 18+ &mdash; Enter</button>',
    '    <button id="ag-leave">No, Leave</button>',
    '  </div>',
    '  <p class="ag-legal">By entering you confirm you are of legal age in your jurisdiction and agree to our <a href="/terms-of-service/" style="color:#ff2d78;text-decoration:none;">Terms of Service</a> and <a href="/privacy-policy/" style="color:#ff2d78;text-decoration:none;">Privacy Policy</a>.</p>',
    '</div>'
  ].join('');

  document.body.classList.add('ag-locked');

  function mount() { document.body.appendChild(overlay); }
  if (document.body) { mount(); } else { document.addEventListener('DOMContentLoaded', mount); }

  overlay.addEventListener('click', function (e) {
    if (e.target.id === 'ag-enter') {
      sessionStorage.setItem('ageVerified', '1');
      document.body.classList.remove('ag-locked');
      overlay.style.transition = 'opacity 0.35s';
      overlay.style.opacity = '0';
      setTimeout(function () { overlay.remove(); }, 360);
    } else if (e.target.id === 'ag-leave') {
      window.location.href = 'https://www.google.com';
    }
  });
})();

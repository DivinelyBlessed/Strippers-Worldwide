(function () {
  if (sessionStorage.getItem('disclosureDismissed') === '1') return;

  var style = document.createElement('style');
  style.textContent = [
    '#aff-bar{position:fixed;bottom:0;left:0;right:0;z-index:99980;background:rgba(10,8,14,0.97);border-top:1px solid rgba(255,255,255,0.08);padding:10px 48px 10px 16px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}',
    '#aff-bar p{font-size:0.72rem;color:rgba(138,122,150,0.75);margin:0;text-align:center;line-height:1.6;max-width:860px;}',
    '#aff-bar a{color:rgba(255,45,120,0.75);text-decoration:none;}',
    '#aff-bar a:hover{color:#ff2d78;}',
    '#aff-dismiss{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.25);font-size:1rem;cursor:pointer;padding:4px 8px;line-height:1;transition:color 0.2s;}',
    '#aff-dismiss:hover{color:rgba(255,255,255,0.55);}',
  ].join('');
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.id = 'aff-bar';
  bar.innerHTML = [
    '<p><strong style="color:rgba(255,194,74,0.8);">Affiliate Disclosure:</strong> StrippersWorldwide.com contains affiliate links. When you click a link and sign up or make a purchase, we may earn a commission at no extra cost to you. We only link to reputable adult entertainment platforms. All content is intended for adults aged 18+. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-of-service/">Terms of Service</a>.</p>',
    '<button id="aff-dismiss" aria-label="Dismiss">&times;</button>',
  ].join('');

  function mount() { document.body.appendChild(bar); }
  if (document.body) { mount(); } else { document.addEventListener('DOMContentLoaded', mount); }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'aff-dismiss') {
      sessionStorage.setItem('disclosureDismissed', '1');
      bar.style.transition = 'opacity 0.25s,transform 0.25s';
      bar.style.opacity = '0';
      bar.style.transform = 'translateY(100%)';
      setTimeout(function () { bar.remove(); }, 270);
    }
  });
})();

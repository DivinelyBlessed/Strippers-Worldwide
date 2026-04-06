function submitForm() {
  const name    = document.getElementById('fName').value.trim();
  const email   = document.getElementById('fEmail').value.trim();
  const type    = document.getElementById('fType').value;
  const msg     = document.getElementById('fMsg').value.trim();
  const consent = document.getElementById('fConsent').checked;
  if (!name || !email || !type || !msg) { alert('Please fill in all required fields.'); return; }
  if (!consent) { alert('Please agree to the privacy consent to send your message.'); return; }
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

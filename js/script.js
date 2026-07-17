const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('is-open');
  });
}

const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      status.textContent = 'Please fill in your name, email, and message.';
      return;
    }

    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      return;
    }

    status.textContent = 'Thanks for reaching out! We will get back to you soon.';
    form.reset();
  });
}

/* Ad loading and consent handling */
function loadAds(publisherId) {
  if (!publisherId || publisherId === 'ca-pub-REPLACE') return;
  if (window.adsLoaded) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  s.setAttribute('data-ad-client', publisherId);
  document.head.appendChild(s);
  window.adsLoaded = true;
  // push existing ins slots
  setTimeout(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){}
  }, 600);
}

// ACLib (adcash-like) interstitial loader
const AC_ZONE_ID = '11741738'; // Replace with your ACLib zone ID
const AC_AUTO_POP = true; // set to false to avoid auto interstitial

function loadACLib(zoneId) {
  if (!zoneId) return;
  if (window.aclibLoaded) return;
  const id = 'aclib';
  if (document.getElementById(id)) { window.aclibLoaded = true; return; }
  const s = document.createElement('script');
  s.id = id;
  s.type = 'text/javascript';
  s.src = '//acscdn.com/script/aclib.js';
  s.async = true;
  s.onload = () => {
    window.aclibLoaded = true;
    try {
      if (AC_AUTO_POP && window.aclib && typeof window.aclib.runInterstitial === 'function') {
        setTimeout(() => { try{ window.aclib.runInterstitial({ zoneId: zoneId }); }catch(e){} }, 1200);
      }
    } catch (e) {}
  };
  document.head.appendChild(s);
}

function showConsentBanner(){
  const banner = document.querySelector('.consent-banner');
  if (banner) banner.style.display = 'block';
}

function hideConsentBanner(){
  const banner = document.querySelector('.consent-banner');
  if (banner) banner.style.display = 'none';
}

function acceptAds(){
  localStorage.setItem('ej_accept_ads','1');
  hideConsentBanner();
  // Replace with your AdSense publisher ID
  loadAds('ca-pub-REPLACE');
  // Load ACLib interstitial after consent
  try { loadACLib(AC_ZONE_ID); } catch(e){}
}

function declineAds(){
  localStorage.setItem('ej_accept_ads','0');
  hideConsentBanner();
}

function checkAdConsent(){
  const val = localStorage.getItem('ej_accept_ads');
  if (val === '1') { loadAds('ca-pub-REPLACE'); try { loadACLib(AC_ZONE_ID); } catch(e){} }
  else if (val === null) { showConsentBanner(); }
}

document.addEventListener('DOMContentLoaded', () => checkAdConsent());

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

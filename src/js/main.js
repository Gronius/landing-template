document.addEventListener('DOMContentLoaded', () => {
  // ===== БУРГЕР МЕНЮ =====
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-active');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== ЛИПКИЙ ХЕДЕР =====
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-sticky', window.scrollY > 50);
    }, { passive: true });
  }

  // ===== АНІМАЦІЯ ПРИ СКРОЛІ =====
  const animElements = document.querySelectorAll('[data-animate]');
  if (animElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animElements.forEach(el => observer.observe(el));
  }

  // ===== ФОРМА (запобігання відправки) =====
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
      form.reset();
    });
  }
});

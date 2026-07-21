/* ============================================
   LOVE PAGE - TULIP THEME - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Loading Screen ----------
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2200);

  // ---------- Create Floating Petals ----------
  createPetals();

  // ---------- Days Counter ----------
  updateCounter();
  setInterval(updateCounter, 1000);

  // ---------- Scroll Animations ----------
  initScrollAnimations();

  // ---------- Collage Lightbox ----------
  initCollageLightbox();

  // ---------- Video Autoplay ----------
  initVideoAutoplay();

  // ---------- Lightbox Controls ----------
  initLightbox();
});

/* ========== Floating Petals ========== */
function createPetals() {
  const container = document.getElementById('petals-container');
  const petalCount = 15;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    petal.style.width = (12 + Math.random() * 14) + 'px';
    petal.style.height = (16 + Math.random() * 18) + 'px';
    container.appendChild(petal);
  }
}

/* ========== Days Counter ========== */
function updateCounter() {
  // ⚠️ CAMBIA ESTA FECHA a la fecha en que comenzaron su relación
  const startDate = new Date('2025-10-26T00:00:00');
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('counter-days');
  const hoursEl = document.getElementById('counter-hours');
  const minutesEl = document.getElementById('counter-minutes');
  const secondsEl = document.getElementById('counter-seconds');

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

/* ========== Scroll Animations ========== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ========== Collage Lightbox ========== */
function initCollageLightbox() {
  const collageItems = document.querySelectorAll('.collage-item');

  collageItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src);
    });
  });
}

/* ========== Video Autoplay on Scroll ========== */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('.auto-video');

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      const wrapper = video.closest('.video-wrapper');
      const indicator = wrapper ? wrapper.querySelector('.video-play-indicator') : null;

      if (entry.isIntersecting) {
        // Video is in view — autoplay muted
        video.play().then(() => {
          if (indicator) indicator.classList.add('hidden');
        }).catch(() => {
          // Autoplay blocked, show indicator
          if (indicator) indicator.classList.remove('hidden');
        });
      } else {
        // Video is out of view — pause
        video.pause();
        if (indicator) indicator.classList.remove('hidden');
      }
    });
  }, {
    threshold: 0.4
  });

  videos.forEach(video => {
    videoObserver.observe(video);

    // Click to toggle mute/unmute
    video.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        showToast('🔇 Video silenciado');
      } else {
        showToast('🔊 Sonido activado');
      }
    });
  });
}

/* ========== Lightbox ========== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

/* ========== Toast Notification ========== */
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

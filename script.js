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

  // ---------- Create Growing Tulips ----------
  createGrowingTulips();
  createHeroTulips();

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

/* ========== Growing Tulips ========== */
function createGrowingTulips() {
  const container = document.getElementById('growing-tulips-container');
  if (!container) return;

  const positions = ['left-1', 'left-2', 'left-3', 'right-1', 'right-2', 'right-3'];
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-1', 'delay-2', 'delay-3'];

  for (let i = 0; i < 6; i++) {
    const tulipSVG = `
      <svg viewBox="0 0 120 250" class="growing-tulip-svg">
        <defs>
          <linearGradient id="petalGrad1-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--tulip-deep)"/>
            <stop offset="100%" stop-color="var(--tulip-pink)"/>
          </linearGradient>
          <linearGradient id="petalGrad2-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--tulip-pink)"/>
            <stop offset="100%" stop-color="var(--tulip-rose)"/>
          </linearGradient>
          <linearGradient id="petalGrad3-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--tulip-rose)"/>
            <stop offset="100%" stop-color="var(--tulip-soft)"/>
          </linearGradient>
          <linearGradient id="leafGrad-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--leaf-green)"/>
            <stop offset="100%" stop-color="var(--leaf-light)"/>
          </linearGradient>
          <linearGradient id="grassGrad-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#2d4a22"/>
            <stop offset="100%" stop-color="var(--leaf-green)"/>
          </linearGradient>
        </defs>

        <!-- Base Vegetation (Grass) -->
        <g class="tulip-grass">
          <path d="M40,250 Q25,210 10,180 Q30,220 50,250" fill="url(#grassGrad-${i})" />
          <path d="M70,250 Q90,200 110,170 Q85,210 60,250" fill="url(#grassGrad-${i})" />
          <path d="M55,250 Q50,190 40,150 Q60,200 65,250" fill="url(#grassGrad-${i})" />
        </g>

        <!-- Stem -->
        <path class="tulip-stem" d="M60,250 Q55,150 60,80" stroke="url(#leafGrad-${i})" stroke-width="5" fill="none" stroke-linecap="round" />

        <!-- Leaves -->
        <path class="tulip-leaf tulip-leaf-left" d="M60,210 C30,190 10,140 15,90 C25,130 45,170 60,180" fill="url(#leafGrad-${i})" />
        <path class="tulip-leaf tulip-leaf-right" d="M60,190 C80,170 110,130 105,80 C95,120 75,160 60,170" fill="url(#leafGrad-${i})" />

        <!-- Flower -->
        <g class="tulip-flower" transform="translate(10, 10)">
          <!-- Back Petal -->
          <path class="petal-back" d="M50,70 C35,40 35,15 50,10 C65,15 65,40 50,70" fill="url(#petalGrad1-${i})" />
          <!-- Left Petal -->
          <path class="petal-left" d="M50,70 C20,60 10,25 25,10 C40,0 50,30 50,70" fill="url(#petalGrad2-${i})" />
          <!-- Right Petal -->
          <path class="petal-right" d="M50,70 C80,60 90,25 75,10 C60,0 50,30 50,70" fill="url(#petalGrad2-${i})" />
          <!-- Front Petal -->
          <path class="petal-front" d="M50,72 C35,55 35,30 50,20 C65,30 65,55 50,72" fill="url(#petalGrad3-${i})" />
        </g>
      </svg>
    `;

    const tulip = document.createElement('div');
    tulip.className = `growing-tulip ${positions[i]} ${delays[i]}`;
    tulip.innerHTML = tulipSVG;
    container.appendChild(tulip);
  }
}

/* ========== Hero Tulips ========== */
function createHeroTulips() {
  const container = document.getElementById('hero-tulip-art');
  if (!container) return;

  const positions = ['hero-1', 'hero-2', 'hero-3'];
  const delays = ['delay-1', 'delay-2', 'delay-3'];

  for (let i = 0; i < 3; i++) {
    const tulipSVG = `
      <svg viewBox="0 0 120 250" class="growing-tulip-svg">
        <defs>
          <linearGradient id="heroPetalGrad1-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--tulip-deep)"/>
            <stop offset="100%" stop-color="var(--tulip-pink)"/>
          </linearGradient>
          <linearGradient id="heroPetalGrad2-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--tulip-pink)"/>
            <stop offset="100%" stop-color="var(--tulip-rose)"/>
          </linearGradient>
          <linearGradient id="heroPetalGrad3-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--tulip-rose)"/>
            <stop offset="100%" stop-color="var(--tulip-soft)"/>
          </linearGradient>
          <linearGradient id="heroLeafGrad-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="var(--leaf-green)"/>
            <stop offset="100%" stop-color="var(--leaf-light)"/>
          </linearGradient>
          <linearGradient id="heroGrassGrad-${i}" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#2d4a22"/>
            <stop offset="100%" stop-color="var(--leaf-green)"/>
          </linearGradient>
        </defs>

        <!-- Base Vegetation (Grass) -->
        <g class="tulip-grass">
          <path d="M40,250 Q25,210 10,180 Q30,220 50,250" fill="url(#heroGrassGrad-${i})" />
          <path d="M70,250 Q90,200 110,170 Q85,210 60,250" fill="url(#heroGrassGrad-${i})" />
          <path d="M55,250 Q50,190 40,150 Q60,200 65,250" fill="url(#heroGrassGrad-${i})" />
        </g>

        <!-- Stem -->
        <path class="tulip-stem" d="M60,250 Q55,150 60,80" stroke="url(#heroLeafGrad-${i})" stroke-width="5" fill="none" stroke-linecap="round" />

        <!-- Leaves -->
        <path class="tulip-leaf tulip-leaf-left" d="M60,210 C30,190 10,140 15,90 C25,130 45,170 60,180" fill="url(#heroLeafGrad-${i})" />
        <path class="tulip-leaf tulip-leaf-right" d="M60,190 C80,170 110,130 105,80 C95,120 75,160 60,170" fill="url(#heroLeafGrad-${i})" />

        <!-- Flower -->
        <g class="tulip-flower" transform="translate(10, 10)">
          <!-- Back Petal -->
          <path class="petal-back" d="M50,70 C35,40 35,15 50,10 C65,15 65,40 50,70" fill="url(#heroPetalGrad1-${i})" />
          <!-- Left Petal -->
          <path class="petal-left" d="M50,70 C20,60 10,25 25,10 C40,0 50,30 50,70" fill="url(#heroPetalGrad2-${i})" />
          <!-- Right Petal -->
          <path class="petal-right" d="M50,70 C80,60 90,25 75,10 C60,0 50,30 50,70" fill="url(#heroPetalGrad2-${i})" />
          <!-- Front Petal -->
          <path class="petal-front" d="M50,72 C35,55 35,30 50,20 C65,30 65,55 50,72" fill="url(#heroPetalGrad3-${i})" />
        </g>
      </svg>
    `;

    const tulip = document.createElement('div');
    tulip.className = `hero-tulip ${positions[i]} ${delays[i]}`;
    tulip.innerHTML = tulipSVG;
    container.appendChild(tulip);
  }
}

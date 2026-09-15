/**
 * Crescent Technosoft - Interactive Engine & Hero Background Transition
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeroBackgroundSlider();
  initSolutionFilters();
  initModalDialog();
  initTestimonials();
});

/* 1. Mobile Drawer Navigation */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.close-drawer');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

/* 2. Hero Background Image Changing Transition */
function initHeroBackgroundSlider() {
  const slides = document.querySelectorAll('.hero-bg-slide');
  const dotsContainer = document.querySelector('.hero-slider-nav');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;

  // Render navigation dots if container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `hero-slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.hero-slider-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    currentSlide = index;
  }

  function nextSlide() {
    const nextIdx = (currentSlide + 1) % slides.length;
    goToSlide(nextIdx);
  }

  function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  startTimer();
}

/* 3. Solution Category Filter Tabs */
function initSolutionFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.solution-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Demo Modal Dialog & Form Submit */
function initModalDialog() {
  const modal = document.querySelector('#demoModal');
  const openBtns = document.querySelectorAll('.open-demo-modal');
  const closeBtn = document.querySelector('.modal-close');
  const demoForm = document.querySelector('#demoForm');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Thank you! Our technical specialist will contact you shortly to schedule your demo.');
      demoForm.reset();
    });
  }
}

/* Toast Message */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

/* 5. Client Testimonial Switcher */
const testimonials = [
  {
    quote: "With lots of positive feedback from our team members, we the directors of Medflebi Healthcare would like to thank Crescent Technosoft for their outstanding job leading the web redesign and laboratory management software.",
    name: "Sharoof Hussain",
    role: "Director, Medflebi Healthcare"
  },
  {
    quote: "Great software with easy-to-use interfaces and wonderful features. Above all, wonderful service with immediate solution to all support requests. Definitely recommend Crescent Technosoft.",
    name: "Remedy Family Clinic",
    role: "Diagnostic & Healthcare Center"
  }
];

function initTestimonials() {
  const quoteEl = document.querySelector('#testimonialQuote');
  const nameEl = document.querySelector('#testimonialName');
  const roleEl = document.querySelector('#testimonialRole');
  const prevBtn = document.querySelector('#prevTestimonial');
  const nextBtn = document.querySelector('#nextTestimonial');

  if (!quoteEl) return;

  let currentIndex = 0;

  function render(idx) {
    const item = testimonials[idx];
    quoteEl.textContent = `“${item.quote}”`;
    nameEl.textContent = item.name;
    roleEl.textContent = item.role;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      render(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      render(currentIndex);
    });
  }
}

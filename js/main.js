/**
 * Crescent Technosoft - Interactive Engine & Hero Background Transition
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeroBackgroundSlider();
  initSolutionFilters();
  initModalDialog();
  initTestimonials();
  initAiChatbot();
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

      // Check if button specifies a product
      const targetProduct = btn.dataset.product || btn.getAttribute('data-product');
      const productSelect = document.querySelector('#demoProduct');

      if (targetProduct && productSelect) {
        for (let option of productSelect.options) {
          if (option.value.toLowerCase().includes(targetProduct.toLowerCase()) || 
              option.text.toLowerCase().includes(targetProduct.toLowerCase())) {
            option.selected = true;
            break;
          }
        }
      }

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
      
      const name = document.querySelector('#demoName')?.value || 'Client';
      const phone = document.querySelector('#demoPhone')?.value || 'Not provided';
      const email = document.querySelector('#demoEmail')?.value || 'Not provided';
      const productSelect = document.querySelector('#demoProduct');
      const product = productSelect ? (productSelect.options[productSelect.selectedIndex]?.text || productSelect.value) : 'Crescent Software';

      const whatsappText = `Hello Crescent Technosoft,\n\nI would like to request a software demo:\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• Software Product: ${product}\n\nPlease contact me to schedule a live demo.`;
      
      const whatsappUrl = `https://wa.me/919944992460?text=${encodeURIComponent(whatsappText)}`;
      
      closeModal();
      showToast('Opening WhatsApp to send your demo request directly to +91 9944992460...');
      demoForm.reset();

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 800);
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

/* 5. Client Testimonial Switcher (One review at a time with smooth transition) */
const testimonials = [
  {
    quote: "The best software, Best service team, Best Price, most trustable Laboratory Software and user friendly. I am writing this with 6 years of user experience highly recommended. Thank you Crescent Technosoft for providing best user friendly software.",
    name: "R. Sathishbabu (Proprietor)",
    role: "Kamalam ECG & Clinical Laboratory, Tiruvannamalai",
    avatar: "RS",
    color: "var(--logo-navy)"
  },
  {
    quote: "Great Software with easy to use interfaces and wonderful features. Above all wonderful service with immediate solution to all support requests. Definitely recommend.",
    name: "Remedy Family Clinic",
    role: "Super Specialty Clinic Network",
    avatar: "RF",
    color: "var(--logo-swoosh-blue)"
  },
  {
    quote: "I strongly suggest after using 3 years, software is user friendly, easy access, immediate solution for software related queries, timely service.",
    name: "Venkateswara Diagnostic",
    role: "Diagnostic Center (3+ Years User)",
    avatar: "VD",
    color: "var(--accent-gold)"
  },
  {
    quote: "Good Company...It offers user-friendly Software with good service...",
    name: "Venkata Narendra Reddy",
    role: "Verified Client",
    avatar: "VN",
    color: "#7c3aed"
  }
];

function initTestimonials() {
  const quoteEl = document.querySelector('#testimonialQuote');
  const nameEl = document.querySelector('#testimonialName');
  const roleEl = document.querySelector('#testimonialRole');
  const avatarEl = document.querySelector('#testimonialAvatar');
  const counterEl = document.querySelector('#testimonialCounter');
  const dotsEl = document.querySelector('#testimonialDots');
  const containerEl = document.querySelector('#testimonialContainer');
  const prevBtn = document.querySelector('#prevTestimonial');
  const nextBtn = document.querySelector('#nextTestimonial');

  if (!quoteEl) return;

  let currentIndex = 0;
  let autoSlideTimer;

  // Build dots dynamically
  if (dotsEl) {
    dotsEl.innerHTML = '';
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.style.cssText = 'width:10px; height:10px; border-radius:50%; background:#cbd5e1; cursor:pointer; transition:all 0.3s;';
      if (idx === 0) {
        dot.style.background = 'var(--logo-swoosh-blue)';
        dot.style.width = '24px';
        dot.style.borderRadius = '12px';
      }
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoSlide();
      });
      dotsEl.appendChild(dot);
    });
  }

  function render(idx) {
    const item = testimonials[idx];
    
    if (containerEl) containerEl.style.opacity = '0';
    
    setTimeout(() => {
      quoteEl.textContent = `“${item.quote}”`;
      nameEl.textContent = item.name;
      roleEl.textContent = item.role;
      if (avatarEl) {
        avatarEl.textContent = item.avatar;
        avatarEl.style.background = item.color;
      }
      if (counterEl) {
        counterEl.textContent = `${idx + 1} / ${testimonials.length}`;
      }

      // Update dots state
      if (dotsEl) {
        const dots = dotsEl.children;
        Array.from(dots).forEach((dot, i) => {
          if (i === idx) {
            dot.style.background = 'var(--logo-swoosh-blue)';
            dot.style.width = '24px';
            dot.style.borderRadius = '12px';
          } else {
            dot.style.background = '#cbd5e1';
            dot.style.width = '10px';
            dot.style.borderRadius = '50%';
          }
        });
      }

      if (containerEl) containerEl.style.opacity = '1';
    }, 150);

    currentIndex = idx;
  }

  function goToSlide(idx) {
    render(idx);
  }

  function nextSlide() {
    const nextIdx = (currentIndex + 1) % testimonials.length;
    goToSlide(nextIdx);
  }

  function prevSlide() {
    const prevIdx = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prevIdx);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  startAutoSlide();
}

/* 6. AI Chatbot Assistant Widget */
function initAiChatbot() {
  const aiDrawer = document.querySelector('#aiChatDrawer');
  const fabBtn = document.querySelector('#aiChatFab');
  const closeBtns = document.querySelectorAll('#closeAiChat, .ai-close-btn, .close-ai-chat, #endChatBtn');
  const triggerBtns = document.querySelectorAll('.open-ai-chat');
  const chatInput = document.querySelector('#aiChatInput');
  const sendBtn = document.querySelector('#aiSendBtn');
  const chatMessages = document.querySelector('#aiChatMessages');
  const quickChips = document.querySelectorAll('.chat-chip');

  if (!aiDrawer) return;

  function toggleAiChat() {
    aiDrawer.classList.toggle('active');
  }

  function openAiChat() {
    aiDrawer.classList.add('active');
  }

  function closeAiChat() {
    aiDrawer.classList.remove('active');
  }

  if (fabBtn) fabBtn.addEventListener('click', toggleAiChat);
  closeBtns.forEach(btn => btn.addEventListener('click', closeAiChat));
  triggerBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openAiChat();
  }));

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-msg') || chip.textContent.trim();
      sendUserMessage(text);
    });
  });

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (text) {
        sendUserMessage(text);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value.trim();
        if (text) {
          sendUserMessage(text);
          chatInput.value = '';
        }
      }
    });
  }

  function sendUserMessage(msgText) {
    appendMessage(msgText, 'user');
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const reply = getAiReply(msgText);
      appendMessage(reply, 'ai');
    }, 900);
  }

  function appendMessage(text, sender) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;

    const avatarHtml = sender === 'ai' 
      ? `<div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>` 
      : `<div class="msg-avatar user-av"><i class="fa-solid fa-user"></i></div>`;

    msgDiv.innerHTML = `${avatarHtml}<div class="msg-bubble">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    if (!chatMessages) return;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg ai-msg typing-indicator-msg';
    typingDiv.id = 'aiTyping';
    typingDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.querySelector('#aiTyping');
    if (typing) typing.remove();
  }

  function getAiReply(input) {
    const query = input.toLowerCase();

    if (query.includes('intern') || query.includes('internship') || query.includes('training') || query.includes('expert') || query.includes('course')) {
      return "Crescent Technosoft offers industry-focused Web Development and AI & Machine Learning internships via our dedicated platform <strong>Intern 2 Expert</strong>! Programs are available in 1-Month (₹3,500), 2-Month (₹5,000), and 6-Month (₹7,500) tracks with live projects, mentorship, and verified certificates. <a href='https://crescentsoft.in/saas/intern2expert/' target='_blank' style='color:var(--accent-gold); font-weight:700; text-decoration:underline;'>Visit Intern 2 Expert Portal to Apply</a>.";
    } else if (query.includes('hms') || query.includes('hospital') || query.includes('software')) {
      return "Crescent HMS is an enterprise-grade Hospital Management Software offering IPD/OPD, NABH EMR, Pharmacy, Diagnostic Lab, Billing & Insurance integration. Would you like to schedule a free live demo?";
    } else if (query.includes('demo') || query.includes('schedule') || query.includes('trial')) {
      return "Awesome! You can request a live interactive demo by clicking the 'Book Demo' button on top or calling our team at +91 9944992460.";
    } else if (query.includes('lab') || query.includes('diagnostic') || query.includes('lims') || query.includes('lms')) {
      return "Our Diagnostic Lab Management System (LMS) automates sample tracking, barcoding, analyzer machine interfacing, and instant WhatsApp PDF report delivery to patients!";
    } else if (query.includes('price') || query.includes('cost') || query.includes('quote')) {
      return "Crescent Technosoft offers custom tailored enterprise plans based on bed capacity, modules required, and deployment model (Cloud / On-Premise). Contact us for an instant custom proposal.";
    } else if (query.includes('location') || query.includes('address') || query.includes('office') || query.includes('chennai') || query.includes('bangalore')) {
      return "We have operating centers in both Chennai Headquarters (Anna Nagar West) and Bengaluru Branch Office (Hennur Main Road). Visit our Contact section to see live interactive Google Maps and addresses!";
    } else if (query.includes('whatsapp') || query.includes('chat') || query.includes('contact')) {
      return "You can instantly chat with our team on WhatsApp via the green WhatsApp button at the bottom right corner of the page (+91 9944992460)!";
    } else {
      return "Thank you for reaching out to Crescent Technosoft AI Assistant! We specialize in Hospital Management Software, Diagnostic LMS, Pharmacy ERP, Custom Solutions, and Intern 2 Expert Skill Internships. How can I assist you today?";
    }
  }
}


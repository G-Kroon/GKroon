// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) ls.classList.add('hidden');
    setTimeout(() => { if (ls) ls.style.display = 'none'; }, 600);
  }, 1000);
});

// ===== THEME TOGGLE =====
const savedTheme = localStorage.getItem('gk-theme') || 'dark';
if (savedTheme === 'light') document.body.classList.add('light-mode');

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('gk-theme', isLight ? 'light' : 'dark');
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    const isLight = document.body.classList.contains('light-mode');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    btn.addEventListener('click', toggleTheme);
  }
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,102,204,0.15)'
      : '0 4px 30px rgba(0,0,0,0.4)';
  }
});

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.nav-menu-overlay');

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (overlay) overlay.addEventListener('click', closeMenu);

  // Mobile dropdown toggles — max-height based animation
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(drop => {
    const link = drop.querySelector(':scope > a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const isActive = drop.classList.contains('active');
          // Close all other open dropdowns
          dropdowns.forEach(d => {
            if (d !== drop) d.classList.remove('active');
          });
          // Toggle this one
          drop.classList.toggle('active', !isActive);
        }
      });
    }
  });

  // Close menu on nav link click (mobile)
  const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown > a)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
});

// ===== SCROLL REVEAL =====
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
});

// ===== COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
});

// ===== EMAIL JS =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: "4xBx5qkSFzXI53h-i" });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      emailjs.sendForm('contact_service', 'contact_form', this)
        .then(() => console.log('SUCCESS!'), (error) => console.log('FAILED...', error));
    });
  }
});

// ===== WHATSAPP BUBBLE =====
(function () {
  const WA_NUMBER = '+27661199255';
  const WA_MESSAGE = encodeURIComponent("Hi GKroon! 👋 I'm interested in your services. Can you help me?");
  const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  const ENTRY_DELAY      = 2800;
  const ICON_MORPH_DELAY = 1020;
  const BUBBLE_DELAY     = 1400;
  const TYPING_DURATION  = 1400;
  const BUBBLE_AUTO_HIDE = 9000;
  const WOBBLE_EVERY     = 5500;
  const REPEAT_DELAY     = 22000;

  document.addEventListener('DOMContentLoaded', () => {
    const floatEl = document.querySelector('.whatsapp-float');
    const waBtn   = document.querySelector('.whatsapp-float-btn');
    if (!floatEl || !waBtn) return;

    waBtn.href = WA_URL;
    waBtn.innerHTML = '<i class="fab fa-whatsapp wa-icon"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'whatsapp-bubble';
    bubble.innerHTML = `
      <button class="bubble-close" aria-label="Dismiss">&#10005;</button>
      <div class="bubble-name"><span class="bubble-dot"></span> GKroon Support</div>
      <div class="bubble-typing"><span></span><span></span><span></span></div>
      <p class="bubble-text">Hi 👋 Need help? Tap to chat with us on WhatsApp!</p>
    `;
    floatEl.insertBefore(bubble, waBtn);

    const icon = waBtn.querySelector('.wa-icon');
    let bubbleHideTimer = null;
    let repeatTimer     = null;
    let wobbleInterval  = null;

    function startWobbleCycle() {
      stopWobbleCycle();
      wobbleInterval = setInterval(() => {
        waBtn.classList.remove('wa-wobble');
        void waBtn.offsetWidth;
        waBtn.classList.add('wa-wobble');
        setTimeout(() => waBtn.classList.remove('wa-wobble'), 1200);
      }, WOBBLE_EVERY);
    }
    function stopWobbleCycle() {
      clearInterval(wobbleInterval);
      wobbleInterval = null;
    }

    function showBubble() {
      bubble.classList.remove('hiding', 'wa-text-visible');
      bubble.classList.add('visible');
      clearTimeout(bubbleHideTimer);
      setTimeout(() => bubble.classList.add('wa-text-visible'), TYPING_DURATION);
      bubbleHideTimer = setTimeout(hideBubble, BUBBLE_AUTO_HIDE);
      startWobbleCycle();
    }

    function hideBubble() {
      clearTimeout(bubbleHideTimer);
      stopWobbleCycle();
      bubble.classList.add('hiding');
      setTimeout(() => bubble.classList.remove('visible', 'hiding', 'wa-text-visible'), 460);
      clearTimeout(repeatTimer);
      repeatTimer = setTimeout(showBubble, REPEAT_DELAY);
    }

    function reEnterSequence() {
      waBtn.style.visibility = '';
      void waBtn.offsetWidth;
      waBtn.classList.add('wa-entering');
      setTimeout(() => {
        waBtn.classList.remove('wa-entering');
        waBtn.classList.add('wa-entered');
        setTimeout(() => icon.classList.add('wa-icon-in'), ICON_MORPH_DELAY);
        setTimeout(showBubble, BUBBLE_DELAY);
      }, 960);
    }

    function dismissAll() {
      clearTimeout(bubbleHideTimer);
      clearTimeout(repeatTimer);
      stopWobbleCycle();
      bubble.classList.add('hiding');
      icon.classList.remove('wa-icon-in');
      setTimeout(() => bubble.classList.remove('visible', 'hiding', 'wa-text-visible'), 460);
      setTimeout(() => {
        waBtn.classList.add('wa-btn-out');
        setTimeout(() => {
          waBtn.classList.remove('wa-entered', 'wa-entering', 'wa-wobble', 'wa-btn-out');
          waBtn.style.visibility = 'hidden';
        }, 460);
      }, 200);
      repeatTimer = setTimeout(reEnterSequence, REPEAT_DELAY);
    }

    // Entry sequence
    setTimeout(() => {
      waBtn.classList.add('wa-entering');
      setTimeout(() => {
        waBtn.classList.remove('wa-entering');
        waBtn.classList.add('wa-entered');
        setTimeout(() => icon.classList.add('wa-icon-in'), ICON_MORPH_DELAY);
        setTimeout(showBubble, BUBBLE_DELAY);
      }, 960);
    }, ENTRY_DELAY);

    bubble.querySelector('.bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      dismissAll();
    });

    bubble.addEventListener('click', (e) => {
      if (e.target.classList.contains('bubble-close')) return;
      window.open(WA_URL, '_blank');
    });

    waBtn.addEventListener('click', () => {
      stopWobbleCycle();
      clearTimeout(bubbleHideTimer);
      clearTimeout(repeatTimer);
      bubble.classList.remove('visible', 'hiding', 'wa-text-visible');
      repeatTimer = setTimeout(showBubble, REPEAT_DELAY);
    });
  });
})();

// ===== CARD 3D TILT =====
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card, .connectivity-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// START OF WEBSITE SUSPENDED ANIMATION NOTIFICATION //
/* Notification banner behavior - include at end of <body> or in your JS bundle */

(function () {
  // Config: full message to type
  const fullMessage = " Our website: https://gkroon.sbs is currently suspended & undergoing maintenance.";
  const typingSpeed = 40; // ms per character
  const pauseAfter = 800; // ms pause after typing before subtle loop
  const storageKey = "siteNoticeDismissed_v1";

  // Elements
  const banner = document.getElementById("site-notice");
  const typedEl = document.getElementById("notice-typed");
  const closeBtn = document.getElementById("notice-close");
  const detailsBtn = document.getElementById("notice-details");
  const moreEl = document.getElementById("notice-more");

  // If user dismissed previously, hide banner
  if (localStorage.getItem(storageKey) === "true") {
    banner.classList.add("hidden");
    banner.setAttribute("aria-hidden", "true");
    return;
  }

  // Typing effect (progressive)
  function typeText(el, text, speed) {
    el.textContent = "";
    el.classList.add("cursor"); // show cursor
    let i = 0;
    function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        // small random jitter to feel organic
        const jitter = Math.random() * 20 - 10;
        setTimeout(step, Math.max(10, speed + jitter));
      } else {
        // finished typing
        setTimeout(() => {
          // keep cursor for a moment, then remove
          el.classList.remove("cursor");
          // subtle loop: fade in/out glow on typed text
          el.animate(
            [{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }, { textShadow: "0 2px 18px rgba(255,204,0,0.12)" }, { textShadow: "0 2px 12px rgba(0,0,0,0.6)" }],
            { duration: 2200, iterations: Infinity }
          );
        }, pauseAfter);
      }
    }
    step();
  }

  // Start typing after small delay so entrance animation completes
  setTimeout(() => typeText(typedEl, fullMessage, typingSpeed), 420);

  // Close button behavior: hide and remember
  closeBtn.addEventListener("click", function () {
    banner.classList.add("hidden");
    banner.setAttribute("aria-hidden", "true");
    // persist dismissal for 7 days
    try {
      localStorage.setItem(storageKey, "true");
    } catch (e) {
      // ignore storage errors
    }
  });

  // Details toggle
  detailsBtn.addEventListener("click", function () {
    const expanded = detailsBtn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      moreEl.hidden = true;
      detailsBtn.setAttribute("aria-expanded", "false");
    } else {
      moreEl.hidden = false;
      detailsBtn.setAttribute("aria-expanded", "true");
      // Move focus into details for keyboard users
      moreEl.querySelector("p")?.focus?.();
    }
  });

  // Keyboard: allow Esc to dismiss
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!banner.classList.contains("hidden")) {
        closeBtn.click();
      }
    }
  });

  // Accessibility: ensure banner is announced on load for screen readers
  // We set role="status" and aria-live="polite" in HTML; for extra compatibility:
  setTimeout(() => {
    banner.setAttribute("aria-hidden", "false");
  }, 700);

  // Ensure banner doesn't cover content on mobile: add top padding to body equal to banner height
  function adjustBodyPadding() {
    const computed = window.getComputedStyle(banner);
    if (banner.classList.contains("hidden")) {
      document.documentElement.style.setProperty("--banner-height", "0px");
      document.body.style.paddingTop = "";
      return;
    }
    // measure banner height
    const rect = banner.getBoundingClientRect();
    const h = Math.ceil(rect.height);
    document.body.style.paddingTop = h + "px";
  }
  // Run on load and resize
  window.addEventListener("load", adjustBodyPadding);
  window.addEventListener("resize", adjustBodyPadding);
  // Also run shortly after to catch fonts/layout
  setTimeout(adjustBodyPadding, 800);

  // If user prefers reduced motion, skip typing and animations
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    typedEl.textContent = fullMessage;
    typedEl.classList.remove("cursor");
  }
})();
// END OF WEBSITE SUSPENDED ANIMATION NOTIFICATION //


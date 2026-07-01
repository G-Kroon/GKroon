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
/* Notification banner behavior
   - Shows automatically on page load
   - Reappears every 3 seconds (show briefly then hide)
   - Clicking "✕" permanently dismisses and stops the repeating behavior
   - Respects prefers-reduced-motion
   - Adjusts body padding so banner doesn't cover top nav
*/

(function () {
  // ---------- Configuration ----------
  const fullMessage = " Our website: https://gkroon.sbs is currently suspended & undergoing maintenance.";
  const typingSpeed = 36;            // ms per character for typing
  const initialShowDuration = 2200;  // how long the banner stays visible on initial load (ms)
  const repeatInterval = 3000;       // how often the banner reappears (ms)
  const repeatShowDuration = 1400;   // how long each repeat appearance stays visible (ms)
  const storageKey = "siteNoticeDismissed_v1"; // localStorage key to persist dismissal

  // ---------- Elements ----------
  const banner = document.getElementById("site-notice");
  const typedEl = document.getElementById("notice-typed");
  const closeBtn = document.getElementById("notice-close");
  const detailsBtn = document.getElementById("notice-details");
  const moreEl = document.getElementById("notice-more");

  // ---------- State ----------
  let repeatTimer = null;   // interval id for repeating show
  let hideTimeout = null;   // timeout id for hiding after show
  let typingAnimation = null; // reference to typing timeout chain (not a single id)
  let dismissed = false;

  // If user previously dismissed, do nothing
  if (localStorage.getItem(storageKey) === "true") {
    dismissed = true;
    banner.classList.add("hidden");
    banner.setAttribute("aria-hidden", "true");
    return;
  }

  // Respect reduced motion: if user prefers reduced motion, skip typing animation
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Utility: measure and set body padding so nav isn't covered ----------
  function adjustBodyPadding() {
    if (banner.classList.contains("hidden") || banner.getBoundingClientRect().height === 0) {
      document.body.style.paddingTop = "";
      return;
    }
    const rect = banner.getBoundingClientRect();
    document.body.style.paddingTop = Math.ceil(rect.height) + "px";
  }

  // ---------- Typing effect ----------
  function typeText(el, text, speed, callback) {
    if (prefersReduced) {
      el.textContent = text;
      if (callback) callback();
      return;
    }
    el.textContent = "";
    el.classList.add("cursor");
    let i = 0;
    function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        // small jitter for organic feel
        const jitter = Math.random() * 18 - 9;
        typingAnimation = setTimeout(step, Math.max(8, speed + jitter));
      } else {
        // finished typing
        el.classList.remove("cursor");
        if (callback) callback();
      }
    }
    step();
  }

  // ---------- Show banner (with typing) ----------
  function showBanner(duration) {
    if (dismissed) return;
    // clear any pending hide
    clearTimeout(hideTimeout);

    // Make visible
    banner.classList.remove("hidden");
    banner.classList.add("show");
    banner.setAttribute("aria-hidden", "false");

    // Start typing (restart typed content)
    clearTyping();
    typeText(typedEl, fullMessage, typingSpeed);

    // Adjust body padding after animation completes
    setTimeout(adjustBodyPadding, 420);

    // Auto-hide after duration (if provided)
    if (duration && duration > 0) {
      hideTimeout = setTimeout(() => {
        hideBanner();
      }, duration);
    }
  }

  // ---------- Hide banner ----------
  function hideBanner() {
    // hide visually (move up)
    banner.classList.remove("show");
    banner.classList.add("hidden");
    banner.setAttribute("aria-hidden", "true");
    // clear typed text and animations
    clearTyping();
    typedEl.textContent = "";
    // remove body padding
    document.body.style.paddingTop = "";
  }

  // ---------- Clear typing animation chain ----------
  function clearTyping() {
    if (typingAnimation) {
      clearTimeout(typingAnimation);
      typingAnimation = null;
    }
    typedEl.classList.remove("cursor");
  }

  // ---------- Start repeating show/hide cycle ----------
  function startRepeating() {
    // Immediately schedule the first repeat after repeatInterval
    repeatTimer = setInterval(() => {
      // show briefly then hide
      showBanner(repeatShowDuration);
    }, repeatInterval);
  }

  // ---------- Stop repeating (called when user dismisses) ----------
  function stopRepeating() {
    if (repeatTimer) {
      clearInterval(repeatTimer);
      repeatTimer = null;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  // ---------- Close button: permanently dismiss and stop repeats ----------
  closeBtn.addEventListener("click", function () {
    dismissed = true;
    stopRepeating();
    hideBanner();
    try {
      localStorage.setItem(storageKey, "true");
    } catch (e) {
      // ignore storage errors
    }
  });

  // ---------- Details toggle ----------
  detailsBtn.addEventListener("click", function () {
    const expanded = detailsBtn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      moreEl.hidden = true;
      detailsBtn.setAttribute("aria-expanded", "false");
    } else {
      moreEl.hidden = false;
      detailsBtn.setAttribute("aria-expanded", "true");
      // focus the details paragraph for keyboard users
      const p = moreEl.querySelector("p");
      if (p) p.focus();
    }
  });

  // ---------- Keyboard: Esc to dismiss (temporary) ----------
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!banner.classList.contains("hidden")) {
        closeBtn.click();
      }
    }
  });

  // ---------- Initial behavior on page load ----------
  // Show immediately on landing for initialShowDuration, then start repeating cycle
  window.addEventListener("load", function () {
    // show on load
    showBanner(initialShowDuration);

    // start repeating after initialShowDuration + small buffer
    setTimeout(() => {
      // If user dismissed during initial show, don't start repeating
      if (dismissed) return;
      startRepeating();
    }, initialShowDuration + 200);
  });

  // Also adjust padding on resize to keep layout correct
  window.addEventListener("resize", adjustBodyPadding);

  // If user prefers reduced motion, show static message and still follow show/hide timing
  if (prefersReduced) {
    typedEl.textContent = fullMessage;
  }
})();

// END OF WEBSITE SUSPENDED ANIMATION NOTIFICATION //


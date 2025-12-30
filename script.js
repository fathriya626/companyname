/**
 * script.js
 * Centralized logic for navigation, dropdowns, animations, and common UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTS ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav');
  const dropdowns = document.querySelectorAll('.dropdown');
  const body = document.body;

  // Create Navigation Overlay if it doesn't exist
  let navOverlay = document.querySelector('.nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }

  const toggleNav = (forceClose = false) => {
    const isOpen = forceClose ? false : !navMenu.classList.contains('active');

    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    body.classList.toggle('nav-open', isOpen);

    hamburger.setAttribute('aria-expanded', isOpen);
  };

  // --- NAVIGATION: HAMBURGER TOGGLE ---
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });
  }

  // --- NAVIGATION: DROPDOWN BEHAVIOR ---
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');
    const menu = dropdown.querySelector('.dropdown-box, .dropdown-menu');

    if (btn && menu) {
      // Mobile toggle on click
      btn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation(); // Stop from reaching document/overlay
          // e.stopImmediatePropagation() might be too much if we want other sub-nav logic, 
          // but we MUST prevent the link-click listener from firing.

          const isExpanded = btn.getAttribute('aria-expanded') === 'true';

          // Close other dropdowns first
          dropdowns.forEach(other => {
            if (other !== dropdown) {
              const otherMenu = other.querySelector('.dropdown-box, .dropdown-menu');
              const otherBtn = other.querySelector('.dropbtn');
              if (otherMenu) otherMenu.classList.remove('show');
              if (otherBtn) {
                otherBtn.classList.remove('active');
                otherBtn.setAttribute('aria-expanded', 'false');
              }
            }
          });

          // Toggle current
          const newState = !isExpanded;
          menu.classList.toggle('show', newState);
          btn.classList.toggle('active', newState);
          btn.setAttribute('aria-expanded', newState);
          menu.setAttribute('aria-hidden', !newState);
        }
      });

      // Desktop: CSS :hover handles dropdown display, no JS needed
    }
  });

  // --- NAVIGATION: CLOSE ON OVERLAY CLICK ---
  navOverlay.addEventListener('click', () => {
    toggleNav(true);
  });

  // --- NAVIGATION: CLOSE ON LINK CLICK (Mobile) ---
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      // ONLY close if it's NOT a dropdown toggle button
      if (window.innerWidth <= 768) {
        // If the clicked link is the dropbtn, DO NOT close the menu
        if (link.classList.contains('dropbtn')) {
          // The dropdown logic above handles it
          return;
        }
        toggleNav(true);
      }
    });
  });

  // --- ACCORDION LOGIC (Activities & FAQ) ---
  const initAccordion = (btnSelector) => {
    document.querySelectorAll(btnSelector).forEach(btn => {
      btn.addEventListener('click', function () {
        const content = this.nextElementSibling;
        if (!content) return;

        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        this.classList.toggle('active', !isOpen);
      });
    });
  };
  initAccordion('.accordion-btn');
  initAccordion('.acc-btn');

  // --- CONTACT FORM HANDLER ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your message has been received! (Demo purpose only)');
      contactForm.reset();
    });
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        if (navMenu && navMenu.classList.contains('active')) {
          toggleNav(true);
        }
        document.querySelectorAll('.dropdown-box, .dropdown-menu').forEach(m => {
          m.classList.remove('show');
          m.removeAttribute('style'); // Clear any JS inline styles
        });
        document.querySelectorAll('.dropbtn').forEach(b => b.classList.remove('active'));
      }
    }, 250);
  });

  // --- MOBILE CAROUSEL PAGINATION ---
  const initCarousel = () => {
    // Only run on mobile
    if (window.innerWidth > 480) return;

    const cardsRow = document.querySelector('.cards-row.top-row');
    const pagination = document.querySelector('.carousel-pagination');

    if (!pagination || !cardsRow) return;

    const dots = pagination.querySelectorAll('.dot');
    const cards = cardsRow.querySelectorAll('.card');

    // Update active dot based on scroll position
    const updateActiveDot = () => {
      const scrollLeft = cardsRow.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 40; // margin on each side
      const activeIndex = Math.round(scrollLeft / (cardWidth + gap));

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    };

    // Add scroll listener
    cardsRow.addEventListener('scroll', updateActiveDot, { passive: true });

    // Click dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const card = cards[index];
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });

    // Set initial active dot
    updateActiveDot();
  };

  // Initialize carousel
  initCarousel();

  // Reinitialize on resize
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initCarousel, 250);
  });
});

/* --- MOBILE CHEVRON SCROLLING --- */
document.addEventListener('DOMContentLoaded', () => {
  const cardsRow = document.querySelector('.cards-row');
  const leftBtn = document.getElementById('scroll-left');
  const rightBtn = document.getElementById('scroll-right');

  if (cardsRow && leftBtn && rightBtn) {
    rightBtn.addEventListener('click', () => {
      cardsRow.scrollBy({ left: 300, behavior: 'smooth' });
    });

    leftBtn.addEventListener('click', () => {
      cardsRow.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }
});

/* --- SCROLL ANIMATIONS --- */
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Run once per element
      }
    });
  }, observerOptions);

  // Select elements to animate
  // Select elements to animate
  const animatedElements = document.querySelectorAll('section, .card, .vm-card, .footer-content, header, .hero-content, .about-section, .subsidiaries-box, .contact-form-wrap, .map-container, .intro-wrapper p, .activity-intro, .accordion-item, .subsidiaries-logo, .content p, .two-column p, .about-us-content p, .left-image, .content h1, .content h2, .content h3, .copy p, .activity-text h2, .activity-text p');

  animatedElements.forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
  });
});

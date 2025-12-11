// main.js
document.addEventListener('DOMContentLoaded', function () {
  // hamburger toggles overlay
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlayMenu');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      overlay.classList.toggle('open');
      overlay.setAttribute('aria-hidden', overlay.classList.contains('open') ? 'false' : 'true');
    });
  }
  // duplicate for other hamburgers (subpages)
  document.querySelectorAll('.hamburger').forEach(btn => {
    btn.addEventListener('click', function () {
      document.getElementById('overlayMenu').classList.toggle('open');
    });
  });

  // accordion functionality
  document.querySelectorAll('.acc-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const panel = btn.nextElementSibling;
      const isOpen = panel.style.display === 'block';
      if (isOpen) {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  });

  // make cards animate on click (fade out -> navigate)
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {
      // allow normal link navigation
      e.preventDefault();
      const href = card.getAttribute('href');
      if (!href) return;
      document.body.style.transition = 'opacity 220ms';
      document.body.style.opacity = 0;
      setTimeout(() => window.location.href = href, 220);
    });
  });

  // overlay menu links: close overlay on link click
  document.querySelectorAll('.overlay-menu a').forEach(a => {
    a.addEventListener('click', function () {
      document.getElementById('overlayMenu').classList.remove('open');
    });
  });

  // contact form mock - show a success message and clear fields
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      // basic front-end validation done by HTML required attributes
      alert('Thanks — your message was received (demo).');
      form.reset();
    });
  }

  // page fade-in for any direct page load
  document.body.style.opacity = 0;
  setTimeout(() => (document.body.style.opacity = 1), 40);
});

// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("mainNav");
  const dropdown = document.querySelector(".dropdown");

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Mobile dropdown toggle
  dropdown.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("mainNav");
  const dropdown = document.querySelector(".dropdown");
  const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Dropdown toggle (only opens the menu, doesn’t block link clicks)
  dropdown.addEventListener("click", (e) => {
    const isLink = e.target.tagName === "A";
    if (!isLink) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    }
  });

  // Close menu when a dropdown link is clicked
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      dropdown.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".main-nav");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Mobile dropdown fix
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(drop => {
    drop.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        this.querySelector(".dropdown-menu").classList.toggle("show");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".main-nav");
  const dropdown = document.querySelector(".dropdown");

  // --- Hamburger toggle ---
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // --- Dropdown behavior ---
  if (dropdown) {
    const dropBtn = dropdown.querySelector(".dropbtn");
    const dropMenu = dropdown.querySelector(".dropdown-menu");

    // For desktop (hover)
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) dropMenu.style.display = "block";
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) dropMenu.style.display = "none";
    });

    // For mobile (tap)
    dropBtn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropMenu.classList.toggle("show");
      }
    });

    // When you click any dropdown link on mobile, close the menu
    dropMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        dropMenu.classList.remove("show");
        navMenu.classList.remove("active");
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".main-nav");
  const dropdown = document.querySelector(".dropdown");

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Dropdown toggle
  if (dropdown) {
    const dropBtn = dropdown.querySelector(".dropbtn");
    const dropMenu = dropdown.querySelector(".dropdown-menu");

    // Desktop hover
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) dropMenu.style.display = "block";
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) dropMenu.style.display = "none";
    });

    // Mobile click
    dropBtn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropMenu.classList.toggle("show");
      }
    });

    // Close dropdown when link clicked
    dropMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        dropMenu.classList.remove("show");
        navMenu.classList.remove("active");
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Detect any element with class 'hamburger' (not just a specific ID)
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".main-nav");

  // ✅ Handle mobile nav toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // ✅ Handle About dropdown (desktop hover + mobile click)
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    const dropBtn = dropdown.querySelector(".dropbtn");
    const dropMenu = dropdown.querySelector(".dropdown-menu");

    // Desktop hover
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        dropMenu.style.display = "block";
      }
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        dropMenu.style.display = "none";
      }
    });

    // Mobile click toggle
    dropBtn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropMenu.classList.toggle("show");
      }
    });

    // Close dropdown when clicking a link (mobile)
    dropMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        dropMenu.classList.remove("show");
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // ✅ Close mobile nav when clicking any link
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // ✅ Optional: Close dropdown if you click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (window.innerWidth <= 768) {
          menu.classList.remove("show");
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".main-nav");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".main-nav");
  const dropdown = document.querySelector(".dropdown");
  const dropMenu = document.querySelector(".dropdown-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  if (dropdown && dropMenu) {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropMenu.classList.toggle("show");
      }
    });
  }

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
});

// ===== MOBILE HAMBURGER TOGGLE =====
const Hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
  });
}



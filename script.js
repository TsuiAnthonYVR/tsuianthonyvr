/*
  =========================================
  TAKAKO'S BUTTER MOCHI CAKES - JAVASCRIPT
  =========================================
  Handles page interactions: sticky navbar, mobile menu toggling,
  smooth accordion animations, scroll spy active state, and
  scroll-driven reveal effects.
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // -----------------------------------------
  // 1. STICKY HEADER ON SCROLL
  // -----------------------------------------
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state

  // -----------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // -----------------------------------------
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  const toggleMenu = () => {
    menuBtn.classList.toggle('active');
    navList.classList.toggle('active');
    // Toggle body scrolling when menu is open
    document.body.style.overflowY = navList.classList.contains('active') ? 'hidden' : 'auto';
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // -----------------------------------------
  // 3. SCROLL REVEAL (IntersectionObserver)
  // -----------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once visible, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset slightly for better visual entry
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });

  // -----------------------------------------
  // 4. FAQ ACCORDION INTERACTION
  // -----------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    questionButton.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current FAQ
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // -----------------------------------------
  // 5. ACTIVE LINK HIGHLIGHT (Scroll Spy)
  // -----------------------------------------
  const sections = document.querySelectorAll('section, footer');
  
  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 150; // Offset for header

    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      if (!sectionId) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Run initially
});

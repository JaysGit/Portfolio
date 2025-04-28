// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Active Navigation Link Switching on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Navbar Background Change on Scroll
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.backgroundColor = '#1a1a1a';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.7)';
  } else {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = 'none';
  }

  // Show or Hide Back-to-Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  }
});

// Scroll Reveal Animation for Sections
const revealElements = document.querySelectorAll('section, .project-card');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach((el, index) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
      if (index % 2 === 0) {
        el.classList.add('slide-left');
      } else {
        el.classList.add('slide-right');
      }
    } else {
      el.classList.remove('active-reveal', 'slide-left', 'slide-right');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Typing Effect for Developer Text
const typingText = document.querySelector('.right-column h3 span');
const words = ['Web Developer', 'Creative Coder', 'Traveler', 'Explorer'];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;
const typingSpeed = 150;
const deletingSpeed = 80;

function typeEffect() {
  if (wordIndex >= words.length) {
    wordIndex = 0;
  }
  currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, letterIndex--);
  } else {
    typingText.textContent = currentWord.substring(0, letterIndex++);
  }

  if (!isDeleting && letterIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex++;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }
}

typeEffect();

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerText = '↑';
backToTopBtn.id = 'backToTop';
backToTopBtn.style.position = 'fixed';
backToTopBtn.style.bottom = '30px';
backToTopBtn.style.right = '30px';
backToTopBtn.style.padding = '10px 15px';
backToTopBtn.style.fontSize = '24px';
backToTopBtn.style.border = 'none';
backToTopBtn.style.borderRadius = '50%';
backToTopBtn.style.backgroundColor = '#f4a261';
backToTopBtn.style.color = '#121212';
backToTopBtn.style.cursor = 'pointer';
backToTopBtn.style.display = 'none';
backToTopBtn.style.zIndex = '999';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initial reveal if sections already in view
revealOnScroll();

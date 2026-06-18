/* ============================================
   JAVERIA IQBAL — PORTFOLIO JAVASCRIPT
   All interactions, animations & functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initScrollProgress();
    initTypingAnimation();
    initParticles();
    initHeroMouseGlow();
    initSkillsFilter();
    initProjectFilter();
    initCountUp();
    initContactForm();
    initBackToTop();
    initMagneticButtons();
    initAOS();
    initActiveNavOnScroll();
});

function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.remove('no-scroll');
        }, 2200);
    });
    setTimeout(() => { preloader.classList.add('loaded'); }, 5000);
}

function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;
    if (window.innerWidth < 769) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
    });
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();
    const hoverElements = document.querySelectorAll('a, button, .btn, .skill-tab, .filter-btn, .project-card, .cert-card, .social-link, .magnetic, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    if (!hamburger) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
    });
}

function initTypingAnimation() {
    const typedElement = document.getElementById('typed');
    if (!typedElement) return;
    const roles = ['AI/ML Engineer', 'NLP Developer', 'Data Scientist', 'GenAI Developer', 'Streamlit App Builder', 'Data Analyst'];
    let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;
    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--; typingSpeed = 50;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++; typingSpeed = 100;
        }
        if (!isDeleting && charIndex === currentRole.length) { typingSpeed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingSpeed = 500; }
        setTimeout(type, typingSpeed);
    }
    setTimeout(type, 1500);
}

function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 1000 } },
            color: { value: ['#a78bfa', '#38bdf8', '#f472b6'] },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
            size: { value: 2, random: true, anim: { enable: true, speed: 1, size_min: 0.5 } },
            line_linked: { enable: true, distance: 150, color: '#a78bfa', opacity: 0.08, width: 1 },
            move: { enable: true, speed: 0.8, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } }, push: { particles_nb: 3 } }
        },
        retina_detect: true
    });
}

function initHeroMouseGlow() {
    const hero = document.querySelector('.hero');
    const glow = document.getElementById('heroGlow');
    if (!hero || !glow) return;
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
    });
}

function initSkillsFilter() {
    const tabs = document.querySelectorAll('.skill-tab');
    const cards = document.querySelectorAll('.skill-card');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else { card.classList.add('hidden'); }
            });
        });
    });
}

function initProjectFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.classList.remove('hidden');
                    project.style.animation = 'fadeInUp 0.5s ease forwards';
                } else { project.classList.add('hidden'); }
            });
        });
    });
}

function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    function countUp() {
        if (counted) return;
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            counted = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.dataset.target);
                const increment = target / (2000 / 16);
                let current = 0;
                function updateCount() {
                    current += increment;
                    if (current < target) { num.textContent = Math.ceil(current); requestAnimationFrame(updateCount); }
                    else { num.textContent = target; }
                }
                updateCount();
            });
        }
    }
    window.addEventListener('scroll', countUp);
    countUp();
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            successMsg.classList.add('show');
            form.reset();
            setTimeout(() => { successMsg.classList.remove('show'); }, 4000);
        }, 2000);
    });
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

function initMagneticButtons() {
    if (window.innerWidth < 769) return;
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0, 0)'; });
    });
}

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80, delay: 0 });
    }
}

function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    function setActiveLink() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) link.classList.add('active');
                });
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

document.querySelectorAll('.glass-card').forEach(card => {
    if (window.innerWidth < 769) return;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

console.log('%c 🤖 Javeria Iqbal — AI/ML Engineer Portfolio ', 'background: linear-gradient(135deg, #a78bfa, #38bdf8); color: white; font-size: 16px; padding: 12px 24px; border-radius: 8px; font-weight: bold;');
console.log('%c 🔗 GitHub: github.com/javeria843 ', 'color: #a78bfa; font-size: 12px;');
console.log('%c 💼 LinkedIn: linkedin.com/in/javeriaiqbalai/ ', 'color: #38bdf8; font-size: 12px;');

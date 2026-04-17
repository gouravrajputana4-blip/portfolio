// Smooth Scrolling & Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const targetPosition = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate skill bars
    animateSkillBars();

    // Animate stats counter
    animateStats();

    // Intersection Observer for animations
    initScrollAnimations();

    // Particle animation
    initParticles();

    // Contact form handling
    initContactForm();

    // Project hover effects
    initProjectEffects();

    // Typing effect for hero title
    initTypingEffect();
});

// Skill Bars Animation
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.getAttribute('data-width');
                progress.style.width = width;
                progress.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.opacity = '0';
        bar.style.transition = 'width 2s ease-in-out, opacity 0.5s ease';
        observer.observe(bar);
    });
}

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent);
                let count = 0;
                const increment = target / 100;
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        stat.textContent = Math.floor(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    stats.forEach(stat => observer.observe(stat));
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animate elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// Particle Animation
function initParticles() {
    const particleContainer = document.querySelector('.tech-particles');
    if (!particleContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Message Sent! 🚀';
            button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Project Hover Effects
function initProjectEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05) translateY(-10px)';
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1) translateY(0)';
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .sub-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-card');
    
    parallax.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
    });
});

// Preloader (Optional - Add this if you want a loading screen)
window.addEventListener('load', () => {
    // Remove preloader if you add one
    document.body.classList.add('loaded');
});

// Window resize handler
window.addEventListener('resize', () => {
    // Recalculate positions if needed
});
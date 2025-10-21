// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.waste-card, .tip-card, .step, .benefit, .timeline-item, .impact-card, .tip-item').forEach(el => {
    observer.observe(el);
});

// Interactive waste type cards
document.querySelectorAll('.waste-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Interactive tip cards
document.querySelectorAll('.tip-card').forEach(card => {
    card.addEventListener('click', () => {
        // Add a subtle animation when clicked
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    });
});

// Interactive timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add click animation
        item.style.transform = 'translateX(15px) scale(1.02)';
        setTimeout(() => {
            item.style.transform = 'translateX(10px) scale(1)';
        }, 200);
        
        // Show detailed information
        const wasteType = item.querySelector('h3').textContent;
        showDecompositionInfo(wasteType);
    });
});

// Show decomposition information
function showDecompositionInfo(type) {
    const decompositionInfo = {
        'Sampah Organik': 'Sampah organik dapat terurai dalam 2-6 minggu dan dapat diolah menjadi kompos yang bermanfaat untuk tanaman.',
        'Kertas': 'Kertas membutuhkan 2-5 bulan untuk terurai dan dapat didaur ulang dengan mudah.',
        'Kain Katun': 'Kain katun alami dapat terurai dalam 1-5 bulan karena terbuat dari serat tumbuhan.',
        'Kayu': 'Kayu membutuhkan 1-3 tahun untuk terurai karena struktur selulosa yang kuat.',
        'Filter Rokok': 'Filter rokok membutuhkan 1-5 tahun untuk terurai dan dapat mencemari lingkungan.',
        'Kulit': 'Produk kulit membutuhkan 25-40 tahun untuk terurai karena proses pengolahan yang kompleks.',
        'Aluminium': 'Aluminium membutuhkan 80-200 tahun untuk terurai dan dapat didaur ulang tanpa kehilangan kualitas.',
        'Plastik': 'Plastik membutuhkan 450-1000 tahun untuk terurai dan merupakan ancaman serius bagi lingkungan.',
        'Kaca': 'Kaca praktis tidak dapat terurai secara alami dan dapat bertahan selama jutaan tahun.'
    };
    
    showNotification(decompositionInfo[type] || 'Informasi tidak tersedia', 'info');
}

// Interactive impact cards
document.querySelectorAll('.impact-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) scale(1)';
        }, 200);
    });
});

// Interactive tip items
document.querySelectorAll('.tip-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'translateX(10px) scale(1.02)';
        setTimeout(() => {
            item.style.transform = 'translateX(5px) scale(1)';
        }, 200);
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Mohon lengkapi semua field!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Pesan berhasil dikirim! Terima kasih atas feedback Anda.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add notification content styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;

document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;

document.head.appendChild(loadingStyles);

// Interactive floating cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
        
        // Show info about the waste type
        const wasteType = card.querySelector('span').textContent;
        showWasteInfo(wasteType);
    });
});

// Show waste type information
function showWasteInfo(type) {
    const wasteInfo = {
        'Organik': 'Sampah organik adalah sampah yang berasal dari sisa makanan dan bahan alami yang dapat terurai. Dapat diolah menjadi kompos atau biogas.',
        'Plastik': 'Sampah plastik membutuhkan waktu ratusan tahun untuk terurai. Dapat didaur ulang menjadi produk baru.',
        'Kertas': 'Sampah kertas dapat didaur ulang dengan mudah dan efisien. Proses daur ulang kertas menghemat energi dan air.',
        'Logam': 'Sampah logam seperti kaleng dan besi dapat didaur ulang tanpa kehilangan kualitas. Memiliki nilai ekonomis tinggi.'
    };
    
    showNotification(wasteInfo[type] || 'Informasi tidak tersedia', 'info');
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus styles for accessibility
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    *:focus {
        outline: 2px solid #2ECC71;
        outline-offset: 2px;
    }
    
    .btn:focus,
    .nav-link:focus {
        outline: 2px solid #2ECC71;
        outline-offset: 2px;
    }
`;

document.head.appendChild(focusStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following line if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

console.log('Recycle website loaded successfully! 🌱♻️');

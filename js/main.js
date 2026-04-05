// === 1. АНИМАЦИЯ ШТОРМА ===
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 3 + 2; 
    this.speedY = Math.random() * -1 - 0.5; 
    this.color = Math.random() > 0.4 ? '#4dc2b8' : '#1f6b65'; 
    this.opacity = Math.random() * 0.6 + 0.2;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.y < 0) {
      this.x = -10; 
      this.y = Math.random() * canvas.height;
    }
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 150; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// === 2. КНОПКА "НАЧАТЬ ЭКСПЕДИЦИЮ" И СТРЕЛОЧКИ ===
const startBtn = document.getElementById('startBtn');
const indicator = document.querySelector('.scroll-indicator');
const step1 = document.getElementById('step-1');

function scrollToFirstStep() {
  if (step1) {
    step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

if (startBtn) startBtn.addEventListener('click', scrollToFirstStep);
if (indicator) indicator.addEventListener('click', scrollToFirstStep);

// === 3. 3D ПАРАЛЛАКС (Отключаем на сенсорных экранах) ===
// Современная проверка: если устройство управляется касанием пальца (pointer: coarse), 3D эффект отключается.
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice) {
  const cards = document.querySelectorAll('.tilt-element');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; 
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease'; 
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; 
    });
  });
}

// === 4. СЕКРЕТНАЯ КНОПКА (МОДАЛЬНОЕ ОКНО) ===
const openBtn = document.getElementById('openBtn');
const secretModal = document.getElementById('secretModal');
const closeModal = document.getElementById('closeModal');

if(openBtn && secretModal) {
    openBtn.addEventListener('click', function() {
        secretModal.classList.add('active');
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            secretModal.classList.remove('active');
        });
    }

    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            secretModal.classList.remove('active');
        }
    });
}
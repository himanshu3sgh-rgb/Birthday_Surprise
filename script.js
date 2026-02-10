// Typing effect for greeting
const greetingText = "Tumhe Pta haii ! You're the most adorable person i have ever met! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
  if (greetingElement && charIndex < greetingText.length) {
    greetingElement.textContent += greetingText.charAt(charIndex);
    charIndex++;
    setTimeout(typeGreeting, 100);
  }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
  const element = document.createElement('div');
  element.className = 'floating';
  element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
  element.style.left = Math.random() * 100 + 'vw';
  element.style.top = Math.random() * 100 + 'vh';
  element.style.fontSize = (Math.random() * 20 + 20) + 'px';
  document.body.appendChild(element);

  gsap.to(element, {
    y: -500,
    x: Math.random() * 100 - 50,
    rotation: Math.random() * 360,
    duration: Math.random() * 5 + 5,
    opacity: 1,
    ease: "none",
    onComplete: () => element.remove()
  });
}

// Initialize animations (safe for pages without elements)
window.addEventListener('load', () => {
  if (document.querySelector('h1')) {
    gsap.to('h1', { opacity: 1, duration: 1, y: 20, ease: "bounce.out" });
  }

  document.querySelectorAll('.cta-button').forEach(btn => {
    gsap.to(btn, { opacity: 1, duration: 1, y: -20, ease: "back.out" });
  });

  if (document.querySelector('.greeting')) {
    typeGreeting();
  }

  setInterval(createFloating, 1000);
});

// Hover effects (NO REDIRECT HERE)
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { scale: 1.1, duration: 0.3 });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, { scale: 1, duration: 0.3 });
  });
});

// ===== Global Background Music (Gate1 -> All Pages) =====
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  // Start music on gate1
  if (musicBtn && music) {
    musicBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      music.volume = 0.6;
      music.play().then(() => {
        localStorage.setItem("musicPlaying", "true");
        localStorage.setItem("musicTime", music.currentTime || 0);
        musicBtn.textContent = "🎶 Music Playing";
      }).catch(() => {
        alert("Tap Play Music again to allow audio 🎵");
      });
    });
  }

  // Resume music on every page
  if (music && localStorage.getItem("musicPlaying") === "true") {
    const lastTime = localStorage.getItem("musicTime");
    if (lastTime) music.currentTime = parseFloat(lastTime);

    // Try autoplay (works on desktop, some mobiles)
    music.play().catch(() => {
      // If autoplay blocked, resume on first user interaction
      const resume = () => {
        music.play().catch(() => {});
        document.removeEventListener("click", resume);
        document.removeEventListener("touchstart", resume);
      };
      document.addEventListener("click", resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
  }

  // Save time before leaving page
  if (music) {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("musicTime", music.currentTime);
    });
  }
});


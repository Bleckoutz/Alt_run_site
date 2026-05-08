// Efeito de Partículas
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      velY: Math.random() * 0.5 + 0.2
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff7b";
  particles.forEach(p => {
    p.y += p.velY;
    if (p.y > canvas.height) p.y = -5;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", initParticles);
initParticles();
animateParticles();

// Mouse Glow Effect
document.addEventListener("mousemove", e => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// Reveal Sections on Scroll
const reveal = () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
};
window.addEventListener("scroll", reveal);
reveal(); // Trigger inicial

// Efeito 3D nos Cards dos Membros
document.querySelectorAll(".member").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    card.style.transform = `perspective(500px) rotateX(${-dy/10}deg) rotateY(${dx/10}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
  });
});

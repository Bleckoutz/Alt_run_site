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

window.addEventListener("load", reveal);

let trailerStarted = false;

function startTrailer(){
  if(trailerStarted) return;
  trailerStarted = true;

  const lines = document.querySelectorAll(".trailer-text p");

  lines.forEach((line, i)=>{
    line.style.opacity = 0;
    line.style.transform = "translateY(40px)";
    line.style.transition = "0.8s cubic-bezier(.2,.8,.2,1)";

    setTimeout(()=>{
      line.style.opacity = 1;
      line.style.transform = "translateY(0)";

      if(line.classList.contains("highlight")){
        line.style.textShadow = "0 0 25px #00ff7b, 0 0 60px rgba(0,255,120,0.6)";
      }

    }, i * 1000);
  });
}

window.addEventListener("scroll", ()=>{
  const section = document.getElementById("altrun");
  if (section) { // Boa prática para evitar erros caso a seção não exista na página atual
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight / 1.3){
      startTrailer();
    }
  }
});

const modal = document.getElementById("modal");
const runBtn = document.getElementById("runBtn");
const closeModal = document.getElementById("closeModal");
const sendBtn = document.getElementById("sendBtn");

/* Se quiser reativar o modal depois, as funções estão aqui comentadas
runBtn.addEventListener("click", ()=>{
  modal.style.display = "flex";
});

closeModal.addEventListener("click", ()=>{
  modal.style.display = "none";
});

modal.addEventListener("click", e=>{
  if(e.target === modal){
    modal.style.display = "none";
  }
});*/

if (sendBtn && modal) { // Proteção contra erros de elemento nulo
  sendBtn.addEventListener("click", () => {
    const input = modal.querySelector("input");

    if(input && input.value.trim() !== ""){
      modal.style.opacity = "0";
      setTimeout(()=>{
        modal.style.display = "none";
        modal.style.opacity = "1";
        input.value = "";
      }, 200);
    }
  });
}

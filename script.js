const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = [];

  for(let i = 0; i < 120; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 2,
      v: Math.random() + 0.4
    });
  }
}

resize();
window.addEventListener("resize", resize);

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.y += p.v;

    if(p.y > canvas.height){
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }

    ctx.fillStyle = "#00ff7b";
    ctx.fillRect(p.x, p.y, p.s, p.s);
  });

  requestAnimationFrame(draw);
}
draw();

document.addEventListener("mousemove", e=>{
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const indicator = document.querySelector(".indicator");

function moveIndicator(el){
  indicator.style.width = el.offsetWidth + "px";
  indicator.style.left = el.offsetLeft + "px";
}

window.addEventListener("scroll", ()=>{
  let current = "lectus";

  sections.forEach(sec=>{
    const rect = sec.getBoundingClientRect();

    if(rect.top <= window.innerHeight/2 &&
       rect.bottom >= window.innerHeight/2){
      current = sec.id;
    }
  });

  links.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
      moveIndicator(link);
    }
  });

  reveal();
});

function reveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("show");
    }
  });
}

document.querySelectorAll(".member").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height/2) / 10;
    const rotateY = (x - rect.width/2) / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
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
  const rect = section.getBoundingClientRect();

  if(rect.top < window.innerHeight / 1.3){
    startTrailer();
  }
});

const modal = document.getElementById("modal");
const runBtn = document.getElementById("runBtn");
const closeModal = document.getElementById("closeModal");
const sendBtn = document.getElementById("sendBtn");

/*runBtn.addEventListener("click", ()=>{
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

sendBtn.addEventListener("click", ()=>{
  const input = modal.querySelector("input");

  if(input.value.trim() !== ""){
    modal.style.opacity = "0";
    setTimeout(()=>{
      modal.style.display = "none";
      modal.style.opacity = "1";
      input.value = "";
    }, 200);
  }
});

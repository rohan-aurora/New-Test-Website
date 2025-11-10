/* =========================
   Utility + On-load
========================= */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
$("#year").textContent = new Date().getFullYear();

/* =========================
   Intersection Animations
========================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay ? +e.target.dataset.delay : 0;
      setTimeout(() => e.target.classList.add('in-view'), delay);
      io.unobserve(e.target);
    }
  });
},{threshold:.15});
$$('[data-animate]').forEach(el => io.observe(el));

/* =========================
   Particle Background
========================= */
(function particles(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  const particles = [];
  const COUNT = 90;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
  }
  window.addEventListener('resize', resize);
  resize();

  function spawn(){
    particles.length = 0;
    for (let i=0;i<COUNT;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 1 + Math.random()*2*dpr,
        a: Math.random()*Math.PI*2,
        s: .2 + Math.random()*0.6,
        hue: 200 + Math.random()*70,
        glow: Math.random()*.6+.2
      });
    }
  }
  spawn();

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.a += 0.003 + p.s*0.0007;
      p.x += Math.cos(p.a)*p.s;
      p.y += Math.sin(p.a)*p.s*0.7;
      if (p.x<-50||p.x>w+50||p.y<-50||p.y>h+50){
        p.x = (p.x+w)%w; p.y = (p.y+h)%h;
      }
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${0.35+p.glow*0.4})`;
      ctx.shadowColor = `rgba(26,122,255,${0.35+p.glow*0.3})`;
      ctx.shadowBlur = 25*p.glow;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* =========================
   Projects (dummy data)
========================= */
const projectData = [
  { title:"Sunny Deck UI", tags:["HTML","CSS","UI"], url:"#",
    thumb: svgThumb("#ff9c6b","#fff176","#f06292","S") },
  { title:"Grand Line Docs", tags:["JS","Docs"], url:"#",
    thumb: svgThumb("#7dd3fc","#a7f3d0","#fde68a","G") },
  { title:"Treasure Map App", tags:["HTML","JS"], url:"#",
    thumb: svgThumb("#f472b6","#60a5fa","#34d399","T") },
  { title:"Red-Hair Blog", tags:["CSS","Design"], url:"#",
    thumb: svgThumb("#fb7185","#f59e0b","#22d3ee","R") },
  { title:"Sea Breeze Store", tags:["Firebase","Web"], url:"#",
    thumb: svgThumb("#86efac","#38bdf8","#fde047","B") },
  { title:"Aura Animations", tags:["Animation","JS"], url:"#",
    thumb: svgThumb("#c4b5fd","#fda4af","#4ade80","A") },
];

function svgThumb(c1,c2,c3,letter){
  const svg =
  `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
     <defs>
       <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
         <stop offset='0%' stop-color='${c1}'/><stop offset='50%' stop-color='${c2}'/><stop offset='100%' stop-color='${c3}'/>
       </linearGradient>
       <filter id='glow'><feGaussianBlur stdDeviation='8' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter>
     </defs>
     <rect width='100%' height='100%' fill='url(#g)'/>
     <circle cx='120' cy='120' r='80' fill='white' opacity='.15' filter='url(#glow)'/>
     <circle cx='700' cy='420' r='100' fill='white' opacity='.12' filter='url(#glow)'/>
     <text x='50%' y='55%' text-anchor='middle' font-family='Poppins' font-size='180' font-weight='900' fill='rgba(255,255,255,.9)' filter='url(#glow)'>${letter}</text>
   </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function renderProjects(){
  const grid = $("#projectGrid");
  grid.innerHTML = projectData.map(p=>`
    <a class="project-card" href="${p.url}" target="_blank" rel="noopener">
      <img class="project-thumb" alt="${p.title} thumbnail" src="${p.thumb}">
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </a>
  `).join('');
}
renderProjects();

/* =========================
   Skills
========================= */
const techSkills = [
  {name:"HTML5", level:"Advanced"},
  {name:"CSS3", level:"Advanced"},
  {name:"JavaScript (ES6+)", level:"Advanced"},
  {name:"Python", level:"Intermediate"},
  {name:"Firebase (Auth/RTDB/Storage)", level:"Intermediate"},
  {name:"Git & GitHub", level:"Intermediate"},
  {name:"Responsive & A11y", level:"Advanced"},
];
const creativeSkills = [
  {name:"UI/Visual Design", level:"Advanced"},
  {name:"Prototyping", level:"Intermediate"},
  {name:"Micro-interactions", level:"Advanced"},
  {name:"Motion & Animation", level:"Advanced"},
  {name:"Branding", level:"Intermediate"},
];

function makeSkillCard({name, level}){
  const el = document.createElement('div');
  el.className = 'skill';
  el.innerHTML = `<h5>${name}</h5><div class="level">${level}</div>`;
  return el;
}
function renderSkills(){
  const tech = $("#tech"), creative = $("#creative");
  techSkills.map(makeSkillCard).forEach(c=>tech.appendChild(c));
  creativeSkills.map(makeSkillCard).forEach(c=>creative.appendChild(c));
}
renderSkills();

$$('.toggle-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    $$('.toggle-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.target;
    $$('.skills-grid').forEach(g=>g.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

/* =========================
   Contact Form (mailto)
========================= */
const form = $("#contactForm");
const statusEl = $("#formStatus");
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const msg = $("#message").value.trim();

  let ok = true;
  const setErr = (id, text) => { const el = $(`#${id}`).nextElementSibling; el.textContent = text; if(text) ok=false; };
  setErr('name', name? '':'Please enter your name');
  setErr('email', emailRe.test(email)? '':'Enter a valid email');
  setErr('message', msg? '':'Please write a message');

  if(!ok) return;

  // Build mailto for static "functional" submission
  const subject = encodeURIComponent(`New inquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
  const mailto = `mailto:you@example.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;

  statusEl.textContent = "Opening your email client… If it didn't open, you can email me at you@example.com.";
  form.reset();
});

/* Fancy hover glow on Send button */
const sendBtn = $('.btn-send');
sendBtn.addEventListener('pointermove', (e)=>{
  const rect = sendBtn.getBoundingClientRect();
  const x = ((e.clientX - rect.left)/rect.width)*100;
  const y = ((e.clientY - rect.top)/rect.height)*100;
  sendBtn.style.setProperty('--x', x+'%');
  sendBtn.style.setProperty('--y', y+'%');
});

/* Keyboard focus styles on skill cards for a11y */
$$('.skills-grid').forEach(grid=>{
  grid.addEventListener('keydown', (e)=>{
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      e.target.classList.toggle('focus-pop');
    }
  });
});

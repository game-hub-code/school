// ---- force scroll to top on load ----
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ---- custom cursor ring ----
const ring = document.getElementById('cursorRing');
let mx=0,my=0, rx=0, ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
});
function animateRing(){
  rx += (mx-rx)*0.15;
  ry += (my-ry)*0.15;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('[data-hover]').forEach(el=>{
  el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
});

// ---- header shrink on scroll ----
const header = document.getElementById('header');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- background particle layer ----
(function initParticles(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = 60;
  particles = Array.from({length:COUNT}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.8 + 0.6,
    vx: (Math.random()-0.5)*0.15,
    vy: (Math.random()-0.5)*0.15,
    baseAlpha: Math.random()*0.5 + 0.3,
    phase: Math.random()*Math.PI*2
  }));

  let t = 0;
  function draw(){
    t += 0.02;
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
      if(p.y < 0) p.y = h; if(p.y > h) p.y = 0;
      const alpha = p.baseAlpha * (0.5 + 0.5*Math.sin(t + p.phase));
      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
      grad.addColorStop(0, `rgba(148,180,255,${alpha})`);
      grad.addColorStop(1, `rgba(148,180,255,0)`);
      ctx.fillStyle = grad;
      ctx.arc(p.x,p.y,p.r*4,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ---- flat card playground ----
(function initPlayground(){
  const stage = document.getElementById('globeStage');
  const playground = document.getElementById('playground');
  const dragCursor = document.getElementById('dragCursor');

  const CARD_DATA = [
    {img:'images/Class-Rooms.jpg', tag:'Learning Spaces', title:'Modern Classrooms', desc:'Bright, tech-enabled rooms designed for collaborative and focused learning, built to support every stage of a student\u2019s growth.'},
    {img:'images/Computer-Lab.jpg', tag:'Technology', title:'Computer Labs', desc:'Hands-on digital literacy from coding basics to advanced applications, in fully equipped modern labs.'},
    {img:'images/Library.jpg', tag:'Resources', title:'Library & Research', desc:'A quiet, resource-rich space that fuels independent thinking and a lifelong love of reading.'},
    {img:'images/Investiture-Ceremony.jpg', tag:'Tradition', title:'Investiture Ceremony', desc:'Recognising student leaders who carry our values forward into every corner of school life.'},
    {tag:'School Life', title:'Co-curricular Programs', tinted:true, desc:'From debate to robotics to the arts, our co-curricular programs help students discover new passions.'},
    {img:'images/Sports-Facilities.jpg', tag:'Athletics', title:'Sports Facilities', desc:'Purpose-built courts and grounds supporting a full calendar of inter-house and inter-school competition.'},
    {img:'images/Inter-House-Dance.jpg', tag:'Culture', title:'Inter-House Dance', desc:'Where creativity and house spirit take centre stage in one of our most anticipated events of the year.'},
    {img:'images/Independance-Day.jpg', tag:'Community', title:'Red Day', desc:'Instilling pride and civic awareness from an early age through school-wide celebrations.'},
    {tag:'School Life', title:'What We Stand For', tinted:true, desc:'Curiosity, character and community sit at the heart of everything we do, guiding students to become confident, capable people.', featured:true},
    {img:'images/Bro.-rajesh.jpg', tag:'Leadership', title:'A Message from Leadership', desc:'Guided by a leadership team dedicated to nurturing every student\u2019s potential.', featured:true},
    {tag:'Admissions', title:'Start Your Journey', tinted:true, desc:'Enrolments for 2026\u201327 are now open. Book a campus tour and see Mount St. Patrick Academy for yourself.', featured:true},
    {img:'images/Red-Colour-Day.jpg', tag:'Traditions', title:'Yoga Day', desc:'A vibrant, school-wide celebration of house pride, colour and community spirit.'},
    {img:'images/Online-Portal.jpg', tag:'Parents', title:'Online Portal', desc:'Parents can track attendance, results and school updates in one convenient, secure portal.'},
    {img:'images/Other-Facilities.jpg', tag:'Campus', title:'Other Facilities', desc:'From the auditorium to the science wing, our campus is built to support every kind of learner.'},
    {tag:'School Life', title:'Senior School', tinted:true, desc:'Senior years focused on real-world readiness, university pathways and independent thinking.'},
    {img:'images/Online-Registration-Form.jpg', tag:'Admissions', title:'Registration', desc:'A simple, guided online registration process to help new families get started quickly.'},
    {img:'images/Online-Fee-Payment.jpg', tag:'Parents', title:'Fee Payment', desc:'Secure, convenient online fee payment with full statements and history available anytime.'},
    {img:'images/Slide1.jpg', tag:'Campus Life', title:'A Day at MSPA', desc:'A glimpse into the everyday rhythm of learning, activity and community on campus.'},
    {img:'images/Slide2.jpg', tag:'Campus Life', title:'Building Confidence', desc:'Every student is encouraged to speak up, take part and lead in their own way.'},
    {img:'images/Slide3.jpg', tag:'Campus Life', title:'Learning Together', desc:'Collaborative projects and peer learning are woven throughout our curriculum.'},
    {img:'images/Slide4.jpg', tag:'Campus Life', title:'Campus Spirit', desc:'Our community shows up for every match, performance and milestone.'},
    {tag:'Academics', title:'Programs Built Around Real Thinking', tinted:true, desc:'From early learning to senior years, every stage is designed to stretch curiosity and build confidence.'},
    {tag:'Facilities', title:'A Campus Built for Every Student', tinted:true, desc:'1200+ students, 60+ educators and 15 dedicated facilities, all on one purpose-built campus.'},
    {tag:'Visit Us', title:'Plan Your Visit', tinted:true, desc:'Schedule a campus tour and meet our faculty in person \u2014 we\u2019d love to show you around.'},
  ];

  const CARD_W = 260, CARD_H = 320;
  const GAP = 250;

  const cols = 6;
  const rows = Math.ceil(CARD_DATA.length / cols);

  const cellW = CARD_W + GAP, cellH = CARD_H + GAP;
  const gridW = cols * cellW - GAP;
  const gridH = rows * cellH - GAP;

  const PLANE_MARGIN = 260;
  const PLANE_W = gridW + PLANE_MARGIN*2;
  const PLANE_H = gridH + PLANE_MARGIN*2;
  playground.style.width = PLANE_W + 'px';
  playground.style.height = PLANE_H + 'px';

  const gridOriginX = (PLANE_W - gridW)/2;
  const gridOriginY = (PLANE_H - gridH)/2;

  const FEATURED_SCALE = 1.12;

  CARD_DATA.forEach((data, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = gridOriginX + col*cellW;
    const y = gridOriginY + row*cellH;

    const card = document.createElement('div');
    card.className = 'pg-card' + (data.tinted ? ' tinted' : '');
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    if(data.featured){
      card.style.zIndex = 8;
      card.style.transform = `scale(${FEATURED_SCALE})`;
    }
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', data.title);

    if(data.img){
      const img = document.createElement('img');
      img.src = data.img; img.alt = data.title; img.loading = 'lazy';
      card.appendChild(img);
    }
    const body = document.createElement('div');
    body.className = 'pg-body';
    body.innerHTML = `<span class="pg-tag">${data.tag}</span><span class="pg-title">${data.title}</span>`;
    card.appendChild(body);
    card.addEventListener('mouseenter', ()=>dragCursor.classList.add('pointing'));
    card.addEventListener('mouseleave', ()=>dragCursor.classList.remove('pointing'));

    card.addEventListener('click', () => { if(!wasDragged) openCardModal(data); });
    playground.appendChild(card);
  });

  // ---- drag to pan + inertia ----
  let isDown=false, lastX=0, lastY=0, velX=0, velY=0;
  let dragDist=0, wasDragged=false;
  let panX=-255, panY=285;
  const PAN_MARGIN = 260;

  const ZOOM_OUT_SCALE = 0.9;
  let zoomedOut = false;

  function applyPan(){
    const scale = zoomedOut ? ZOOM_OUT_SCALE : 1;
    const maxX = PLANE_W/2 - PAN_MARGIN, maxY = PLANE_H/2 - PAN_MARGIN;
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
    playground.style.transform = `translate(-50%,-50%) translate(${panX}px, ${panY}px) scale(${scale})`;
  }
  function enterZoomOut(){
    if(zoomedOut) return;
    zoomedOut = true;
    playground.classList.add('zoomed');
    playground.classList.remove('panning');
    applyPan();
  }
  function exitZoomOut(){
    if(!zoomedOut) return;
    zoomedOut = false;
    playground.classList.add('zoomed');
    playground.classList.remove('panning');
    applyPan();
  }
  function onDown(x,y){
    isDown = true; lastX=x; lastY=y; velX=0; velY=0;
    dragDist=0; wasDragged=false;
    dragCursor.classList.add('grabbing');
    enterZoomOut();
  }
  function onMove(x,y){
    dragCursor.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${isDown?0.88:1})`;
    if(!isDown) return;
    const dx = x-lastX, dy = y-lastY;
    dragDist += Math.abs(dx) + Math.abs(dy);
    if(dragDist > 6){
      wasDragged = true;
      playground.classList.add('panning');
    }
    panX += dx; panY += dy;
    applyPan();
    velX = dx; velY = dy;
    lastX=x; lastY=y;
  }
  function onUp(){
    isDown=false; dragCursor.classList.remove('grabbing');
    playground.classList.remove('panning');
    exitZoomOut();
  }

  stage.addEventListener('mouseenter', ()=>dragCursor.classList.add('active'));
  stage.addEventListener('mouseleave', ()=>{ dragCursor.classList.remove('active'); onUp(); });
  stage.addEventListener('mousedown', e=>onDown(e.clientX,e.clientY));
  window.addEventListener('mousemove', e=>onMove(e.clientX,e.clientY));
  window.addEventListener('mouseup', onUp);
  stage.addEventListener('touchstart', e=>{
    const t=e.touches[0];
    onDown(t.clientX,t.clientY);
  }, {passive:true});
  stage.addEventListener('touchmove', e=>{const t=e.touches[0]; onMove(t.clientX,t.clientY);}, {passive:true});
  stage.addEventListener('touchend', onUp);

  // ---- card modal ----
  const modalOverlay = document.getElementById('cardModalOverlay');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');

  function openCardModal(data){
    modalTag.textContent = data.tag || '';
    modalTitle.textContent = data.title || '';
    if(data.img){ modalImg.src = data.img; modalImg.style.display = 'block'; }
    else { modalImg.style.display = 'none'; }
    modalDesc.textContent = data.desc || '';
    modalOverlay.classList.add('open');
  }
  function closeCardModal(){ modalOverlay.classList.remove('open'); }
  document.getElementById('cardModalClose').addEventListener('click', closeCardModal);
  modalOverlay.addEventListener('click', e=>{ if(e.target === modalOverlay) closeCardModal(); });
  window.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeCardModal(); });

  // ---- inertia loop ----
  function animate(){
    requestAnimationFrame(animate);
    if(!isDown && !zoomedOut && (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05)){
      velX *= 0.94; velY *= 0.94;
      panX += velX; panY += velY;
      applyPan();
    }
  }
  playground.classList.add('panning');
  applyPan();
  requestAnimationFrame(()=>playground.classList.remove('panning'));
  animate();
})();
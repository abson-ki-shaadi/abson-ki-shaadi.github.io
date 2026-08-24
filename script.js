/* #ABSON WEDDING WEBSITE — BROWSER JAVASCRIPT */
document.addEventListener('DOMContentLoaded',function(){
const API_URL='https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec';
const opening=document.getElementById('opening'),enterBtn=document.getElementById('enterBtn');
function createAbsonConfetti(){const old=document.getElementById('abson-confetti-layer');if(old)old.remove();const colors=['#ffd447','#ff6f91','#b7df66','#fff'],layer=document.createElement('div');layer.id='abson-confetti-layer';layer.style.cssText='position:fixed;inset:0;width:100%;height:100dvh;z-index:2147483647;pointer-events:none;overflow:hidden;display:block';document.body.appendChild(layer);const pieces=[],count=Math.min(85,Math.max(55,Math.floor(innerWidth/4)));for(let i=0;i<count;i++){const p=document.createElement('span'),w=5+Math.random()*7,h=8+Math.random()*12;p.style.cssText='position:absolute;display:block;left:0;top:0;width:'+w+'px;height:'+h+'px;background:'+colors[i%4]+';border-radius:2px;will-change:transform,opacity';layer.appendChild(p);pieces.push({el:p,x:Math.random()*innerWidth,y:-30-Math.random()*innerHeight*.35,vx:(Math.random()-.5)*2.2,vy:2.5+Math.random()*3.8,g:.055+Math.random()*.045,r:Math.random()*360,s:(Math.random()-.5)*14,sw:Math.random()*6.28,ss:.025+Math.random()*.035})}const start=performance.now();function frame(now){const elapsed=now-start;pieces.forEach(q=>{q.y+=q.vy;q.vy+=q.g;q.x+=q.vx+Math.sin(q.sw)*.7;q.sw+=q.ss;q.r+=q.s;const o=Math.max(0,1-Math.max(0,q.y-innerHeight*.55)/(innerHeight*.65));q.el.style.transform='translate3d('+q.x+'px,'+q.y+'px,0) rotate('+q.r+'deg)';q.el.style.opacity=o});if(elapsed<3200)requestAnimationFrame(frame);else if(layer.parentNode)layer.remove()}requestAnimationFrame(frame)}
if(opening&&enterBtn)enterBtn.addEventListener('click',()=>{if(opening.classList.contains('opening-leaving'))return;createAbsonConfetti();opening.classList.add('opening-leaving');enterBtn.disabled=true;enterBtn.textContent='BREAKING NEWS...';const flash=document.createElement('div');flash.className='abson-flash';flash.innerHTML='<span>#ABSON</span>';flash.style.zIndex='2147483646';document.body.appendChild(flash);setTimeout(()=>{opening.classList.add('hidden');setTimeout(()=>{opening.style.display='none';flash.remove()},400)},1150)});
const weddingDate=new Date('2027-01-09T15:00:00+05:30').getTime();function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,'0')}function updateCountdown(){let d=Math.max(0,weddingDate-Date.now());setText('days',Math.floor(d/86400000));setText('hours',Math.floor(d%86400000/3600000));setText('minutes',Math.floor(d%3600000/60000));setText('seconds',Math.floor(d%60000/1000))}updateCountdown();setInterval(updateCountdown,1000);
const music=document.getElementById('weddingMusic'),musicBtn=document.getElementById('musicBtn');if(music&&musicBtn)musicBtn.addEventListener('click',()=>{if(music.paused){music.play().then(()=>{musicBtn.textContent='♫ MUSIC ON';musicBtn.classList.add('playing')}).catch(()=>musicBtn.textContent='TAP AGAIN ♪')}else{music.pause();musicBtn.textContent='♪ MUSIC';musicBtn.classList.remove('playing')}});
const loreData=[{image:'01.png',title:'WE MET.',text:'Two people met, started talking and somehow decided this was a good idea.',caption:'Evidence suggests excessive laughter.'},{image:'02.png',title:'THE CHAOS.',text:'Somewhere between the jokes, food and questionable decisions, things got serious.',caption:'No responsible adults were involved.'},{image:'03.jpeg',title:'IT GOT SERIOUS.',text:"Then came the dates, the memories and the tiny realisation that this wasn't just another chapter.",caption:'Plot development detected.'},{image:'04.jpeg',title:'THE QUESTION.',text:'One question was asked. One answer was given. And suddenly everyone had opinions.',caption:'Family group chats went into overdrive.'},{image:'05.jpeg',title:'#ABSON.',text:'And now here we are. Two people, one wedding and approximately 300 witnesses.',caption:'No refunds. 09.01.2027.'}];
const loreImage=document.getElementById('loreImage'),loreTitle=document.getElementById('loreTitle'),loreText=document.getElementById('loreText'),loreCaption=document.getElementById('loreCaption'),loreCurrent=document.getElementById('loreCurrent'),loreNumber=document.getElementById('loreNumber'),loreSteps=document.querySelectorAll('.lore-step'),lorePrev=document.getElementById('lorePrev'),loreNext=document.getElementById('loreNext');let loreIndex=0;function showLore(index){if(!loreImage)return;if(index<0)index=loreData.length-1;if(index>=loreData.length)index=0;loreIndex=index;const item=loreData[index];loreImage.classList.add('lore-changing');setTimeout(()=>{loreImage.src=item.image;loreImage.alt=item.title+' — #ABSON';if(loreTitle)loreTitle.textContent=item.title;if(loreText)loreText.textContent=item.text;if(loreCaption)loreCaption.textContent=item.caption;const n=String(index+1).padStart(2,'0');if(loreCurrent)loreCurrent.textContent=n;if(loreNumber)loreNumber.textContent=n;loreImage.classList.remove('lore-changing')},170);loreSteps.forEach((s,i)=>s.classList.toggle('active',i===index))}loreSteps.forEach(s=>s.addEventListener('click',()=>showLore(Number(s.dataset.step))));if(lorePrev)lorePrev.addEventListener('click',()=>showLore(loreIndex-1));if(loreNext)loreNext.addEventListener('click',()=>showLore(loreIndex+1));showLore(0);
const lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightboxImage'),lightboxCaption=document.getElementById('lightboxCaption'),lightboxClose=document.getElementById('lightboxClose');function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}document.querySelectorAll('.gallery-photo img,.story-image img,.lore-photo-card img').forEach(img=>img.addEventListener('click',()=>{if(!lightbox||!lightboxImage)return;lightboxImage.src=img.currentSrc||img.src;lightboxImage.alt=img.alt||'';const fig=img.closest('figure'),cap=fig&&fig.querySelector('figcaption');if(lightboxCaption)lightboxCaption.textContent=cap?cap.textContent:'';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));if(lightboxClose)lightboxClose.addEventListener('click',closeLightbox);if(lightbox)lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
const rsvpForm=document.getElementById('rsvpForm'),formNote=document.getElementById('formNote');if(rsvpForm)rsvpForm.addEventListener('submit',async e=>{e.preventDefault();const button=rsvpForm.querySelector('button[type="submit"]');if(button){button.disabled=true;button.textContent='SENDING...'}if(formNote)formNote.textContent='Sending your RSVP...';const f=new FormData(rsvpForm),payload={action:'rsvp',name:f.get('name')||'',guests:f.get('guests')||'',attendance:f.get('attendance')||'',event:f.get('event')||'',message:f.get('message')||''};try{const r=await fetch(API_URL,{method:'POST',body:JSON.stringify(payload)}),result=await r.json();if(!result.ok)throw new Error(result.error||'Unable to submit RSVP.');if(formNote)formNote.textContent=payload.attendance.toLowerCase().includes('yes')?'🎉 KNEW IT. SEE YOU AT #ABSON.':'😭 This is deeply disappointing.';rsvpForm.reset();createAbsonConfetti()}catch(err){console.error(err);if(formNote)formNote.textContent='Something went wrong. Please try again.'}finally{if(button){button.disabled=false;button.textContent='LOCK IN MY RSVP ✦'}}});
const guestForm=document.getElementById('guestUploadForm'),guestFiles=document.getElementById('guestFiles'),guestName=document.getElementById('guestName'),uploadPreview=document.getElementById('uploadPreview'),uploadStatus=document.getElementById('uploadStatus');function readFileAsBase64(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)})}if(guestFiles)guestFiles.addEventListener('change',()=>{if(!uploadPreview)return;uploadPreview.innerHTML='';Array.from(guestFiles.files||[]).forEach(file=>{const p=document.createElement('div');p.className='file-pill';p.textContent=file.name;uploadPreview.appendChild(p)})});
if(guestForm)guestForm.addEventListener('submit',async e=>{e.preventDefault();const files=Array.from(guestFiles?guestFiles.files||[]:[]);if(!files.length){if(uploadStatus)uploadStatus.textContent='Please choose at least one photo or video.';return}const button=guestForm.querySelector('.upload-button');if(button){button.disabled=true;button.textContent='UPLOADING...'}if(uploadStatus)uploadStatus.textContent='Sending your evidence to #ABSON...';try{for(const file of files){const payload={action:'uploadGuestFile',guestName:guestName?guestName.value:'',fileName:file.name,mimeType:file.type,base64:await readFileAsBase64(file)};const r=await fetch(API_URL,{method:'POST',body:JSON.stringify(payload)}),result=await r.json();if(!result.ok)throw new Error(result.error||'Upload failed')}if(uploadStatus)uploadStatus.textContent='🎉 Evidence received. #ABSON has it.';guestForm.reset();if(uploadPreview)uploadPreview.innerHTML='';loadGuestWall()}catch(err){console.error(err);if(uploadStatus)uploadStatus.textContent='Upload failed. Please try again.'}finally{if(button){button.disabled=false;button.textContent='SEND TO #ABSON →'}}});
/* ---------- Full-screen Camera Roll viewer ---------- */
let wallItems=[],wallIndex=0,wallViewer=null,wallViewerImage=null,wallViewerVideo=null,wallViewerName=null,wallViewerCounter=null,touchStartX=0,touchStartY=0;
function ensureWallViewer(){if(wallViewer)return wallViewer;const style=document.createElement('style');style.textContent=`body.viewer-open{overflow:hidden;touch-action:none}#absonWallViewer{position:fixed;inset:0;z-index:2147483000;background:rgba(10,10,10,.97);display:none;align-items:center;justify-content:center;padding:clamp(55px,7vh,85px) clamp(14px,4vw,60px) clamp(45px,6vh,70px);box-sizing:border-box;overscroll-behavior:contain}#absonWallViewer.open{display:flex}#absonWallViewer .awv-stage{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;min-width:0;min-height:0}#absonWallViewer .awv-image{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;user-select:none;-webkit-user-drag:none;box-shadow:0 18px 60px rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.12)}#absonWallViewer .awv-video{display:none;max-width:100%;max-height:100%;width:auto;height:auto;background:#000;box-shadow:0 18px 60px rgba(0,0,0,.55)}#absonWallViewer .awv-close,#absonWallViewer .awv-prev,#absonWallViewer .awv-next{position:absolute;border:1px solid rgba(255,255,255,.45);background:rgba(0,0,0,.45);color:#fff;cursor:pointer;z-index:3;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent}#absonWallViewer .awv-close{right:18px;top:15px;width:44px;height:44px;border-radius:50%;font:32px/1 Arial,sans-serif}#absonWallViewer .awv-prev,#absonWallViewer .awv-next{top:50%;transform:translateY(-50%);width:48px;height:70px;font:34px/1 Arial,sans-serif}.awv-prev{left:16px}.awv-next{right:16px}#absonWallViewer .awv-info{position:absolute;left:50%;bottom:13px;transform:translateX(-50%);width:min(90%,760px);text-align:center;color:#fff;pointer-events:none;text-shadow:0 2px 12px #000}.awv-name{font:700 13px 'DM Sans',sans-serif;letter-spacing:.08em;text-transform:uppercase}.awv-count{font:10px 'DM Sans',sans-serif;letter-spacing:.18em;opacity:.65;margin-top:4px}.awv-mark{position:absolute;left:20px;top:20px;color:rgba(255,255,255,.18);font:900 italic 25px/1 Arial Black,Arial,sans-serif;letter-spacing:-.05em;pointer-events:none}@media(max-width:700px){#absonWallViewer{padding:60px 8px 70px}#absonWallViewer .awv-close{right:12px;top:10px;width:42px;height:42px}#absonWallViewer .awv-prev,#absonWallViewer .awv-next{width:40px;height:58px;background:rgba(0,0,0,.35);font-size:28px}.awv-prev{left:8px}.awv-next{right:8px}#absonWallViewer .awv-info{bottom:14px;width:82%}.awv-name{font-size:11px}.awv-mark{left:12px;top:14px;font-size:21px}}`;document.head.appendChild(style);wallViewer=document.createElement('div');wallViewer.id='absonWallViewer';wallViewer.setAttribute('aria-hidden','true');wallViewer.innerHTML='<div class="awv-mark">#ABSON</div><div class="awv-stage"><img class="awv-image" alt=""><video class="awv-video" controls playsinline></video></div><button class="awv-close" type="button" aria-label="Close viewer">×</button><button class="awv-prev" type="button" aria-label="Previous photo">‹</button><button class="awv-next" type="button" aria-label="Next photo">›</button><div class="awv-info"><div class="awv-name"></div><div class="awv-count"></div></div>';document.body.appendChild(wallViewer);wallViewerImage=wallViewer.querySelector('.awv-image');wallViewerVideo=wallViewer.querySelector('.awv-video');wallViewerName=wallViewer.querySelector('.awv-name');wallViewerCounter=wallViewer.querySelector('.awv-count');wallViewer.querySelector('.awv-close').addEventListener('click',closeWallViewer);wallViewer.querySelector('.awv-prev').addEventListener('click',()=>showWallItem(wallIndex-1));wallViewer.querySelector('.awv-next').addEventListener('click',()=>showWallItem(wallIndex+1));wallViewer.addEventListener('touchstart',e=>{if(e.touches.length){touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY}},{passive:true});wallViewer.addEventListener('touchend',e=>{if(!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touchStartX,dy=e.changedTouches[0].clientY-touchStartY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2){dx<0?showWallItem(wallIndex+1):showWallItem(wallIndex-1)}},{passive:true});return wallViewer}
function showWallItem(index){if(!wallItems.length)return;if(index<0)index=wallItems.length-1;if(index>=wallItems.length)index=0;wallIndex=index;const item=wallItems[index],url=item.url||item.link||item.fileUrl||'',type=(item.type||item.mimeType||'').toLowerCase();ensureWallViewer();if(type.includes('video')){wallViewerImage.style.display='none';wallViewerVideo.style.display='block';wallViewerVideo.src=url;wallViewerVideo.load()}else{wallViewerVideo.pause();wallViewerVideo.removeAttribute('src');wallViewerVideo.style.display='none';wallViewerImage.style.display='block';wallViewerImage.src=url}wallViewerName.textContent=item.name||item.guestName||'Anonymous #ABSON';wallViewerCounter.textContent=String(index+1).padStart(2,'0')+' / '+String(wallItems.length).padStart(2,'0')}
function openWallViewer(index){ensureWallViewer();showWallItem(index);wallViewer.classList.add('open');wallViewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open')}
function closeWallViewer(){if(!wallViewer)return;wallViewer.classList.remove('open');wallViewer.setAttribute('aria-hidden','true');if(wallViewerVideo){wallViewerVideo.pause();wallViewerVideo.removeAttribute('src');wallViewerVideo.load()}document.body.classList.remove('viewer-open')}
document.addEventListener('keydown',e=>{if(wallViewer&&wallViewer.classList.contains('open')){if(e.key==='Escape')closeWallViewer();else if(e.key==='ArrowRight')showWallItem(wallIndex+1);else if(e.key==='ArrowLeft')showWallItem(wallIndex-1)}});
function ensureGuestWall(){if(document.getElementById('guest-wall'))return document.getElementById('guest-wall');const anchor=document.getElementById('guest-photos');if(!anchor)return null;if(!document.querySelector('link[href="guest-wall.css"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='guest-wall.css';document.head.appendChild(link)}const section=document.createElement('section');section.id='guest-wall';section.className='guest-wall section';section.innerHTML='<div class="abson-watermark" aria-hidden="true">#ABSON</div><div class="section-heading"><p class="kicker">THE PEOPLE’S CAMERA ROLL</p><h2>Live from the chaos.</h2><p>Photos and videos shared by the people who were actually there.</p></div><div class="guest-wall-toolbar"><div class="guest-wall-live"><span></span>LIVE CAMERA ROLL</div><button class="guest-wall-refresh" id="guestWallRefresh" type="button">REFRESH ↻</button></div><p id="guestWallStatus" class="guest-wall-status">Loading the latest evidence…</p><div id="guestWallGrid" class="guest-wall-grid"></div>';anchor.insertAdjacentElement('afterend',section);const refresh=document.getElementById('guestWallRefresh');if(refresh)refresh.addEventListener('click',loadGuestWall);return section}
function renderGuestWall(items){const grid=document.getElementById('guestWallGrid');if(!grid)return;wallItems=(items||[]).filter(x=>x&&(x.url||x.link||x.fileUrl));if(!wallItems.length){grid.innerHTML='<div class="guest-wall-empty"><strong>NO EVIDENCE YET.</strong>Be the first to add to the #ABSON camera roll.</div>';return}grid.innerHTML=wallItems.map((x,i)=>{const url=x.url||x.link||x.fileUrl||'',name=x.name||x.guestName||'Anonymous #ABSON',type=(x.type||x.mimeType||'').toLowerCase(),safe=String(name).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));const media=type.includes('video')?'<span class="guest-wall-video">▶ PLAY VIDEO</span>':'<img class="guest-wall-media" src="'+url+'" alt="'+safe+' — #ABSON" loading="lazy">';return'<article class="guest-wall-card"><button class="guest-wall-open" data-wall-index="'+i+'" type="button">'+media+'</button><div class="guest-wall-meta"><strong>'+safe+'</strong><small>#ABSON CAMERA ROLL</small></div></article>'}).join('');grid.querySelectorAll('.guest-wall-open').forEach(btn=>btn.addEventListener('click',()=>openWallViewer(Number(btn.dataset.wallIndex))))}
async function loadGuestWall(){const section=ensureGuestWall();if(!section)return;const status=document.getElementById('guestWallStatus');if(status)status.textContent='Loading the latest evidence…';try{const r=await fetch(API_URL+'?action=guestPhotos&t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('request failed');const data=await r.json();if(!data.ok)throw new Error(data.error||'feed unavailable');renderGuestWall(data.photos||[]);if(status)status.textContent='Updated just now.'}catch(err){console.warn('#ABSON guest wall:',err);renderGuestWall([]);if(status)status.textContent='The live camera roll is getting ready.'}}

/* ---------- #ABSON People's Wall / RSVP Feedback ---------- */
let feedbackItems=[];

function ensureFeedbackWall(){
  if(document.getElementById('abson-feedback-wall'))return document.getElementById('abson-feedback-wall');
  const anchor=document.getElementById('guest-wall')||document.getElementById('guest-photos');
  if(!anchor)return null;

  if(!document.getElementById('abson-feedback-wall-style')){
    const style=document.createElement('style');
    style.id='abson-feedback-wall-style';
    style.textContent=`
      .abson-feedback-wall{position:relative;overflow:hidden;background:#f5f1e8;padding:clamp(70px,9vw,125px) 5vw}
      .abson-feedback-wall .afw-inner{position:relative;z-index:2;width:min(1180px,92vw);margin:0 auto}
      .abson-feedback-wall .afw-heading{max-width:760px;margin-bottom:34px}
      .abson-feedback-wall .afw-heading .kicker{font-weight:800;letter-spacing:.12em}
      .abson-feedback-wall .afw-heading h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(55px,8vw,105px);line-height:.86;margin:8px 0 16px;color:#111}
      .abson-feedback-wall .afw-heading p{max-width:650px;font-size:17px;line-height:1.65;color:#444}
      .afw-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 25px;border-top:1px solid rgba(0,0,0,.14);border-bottom:1px solid rgba(0,0,0,.14);padding:12px 0}
      .afw-live{font:800 11px 'DM Sans',sans-serif;letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:8px}
      .afw-live span:first-child{width:8px;height:8px;border-radius:50%;background:#111;display:inline-block;box-shadow:0 0 0 4px rgba(17,17,17,.08)}
      .afw-refresh{border:1px solid #111;background:#111;color:#fff;padding:10px 14px;font:800 10px 'DM Sans',sans-serif;letter-spacing:.1em;cursor:pointer}
      .afw-status{font:600 11px 'DM Sans',sans-serif;letter-spacing:.06em;color:#777;margin:0 0 18px}
      .afw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
      .afw-card{position:relative;background:#fff;border:1px solid #111;padding:25px 24px 22px;min-height:190px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:7px 7px 0 #111;transition:transform .2s ease,box-shadow .2s ease}
      .afw-card:hover{transform:translate(-3px,-3px);box-shadow:10px 10px 0 #111}
      .afw-quote{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(18px,2vw,25px);line-height:1.45;color:#171717}
      .afw-quote:before{content:'“';font-size:42px;line-height:0;vertical-align:-12px;margin-right:4px}
      .afw-meta{margin-top:22px;padding-top:12px;border-top:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;gap:10px;align-items:flex-end}
      .afw-name{font:800 11px 'DM Sans',sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#111}
      .afw-event{font:600 9px 'DM Sans',sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#888;text-align:right}
      .afw-empty{border:1px dashed #777;padding:35px;text-align:center;font:600 13px 'DM Sans',sans-serif;color:#555}
      .afw-empty strong{display:block;color:#111;font-size:22px;margin-bottom:7px}
      @media(max-width:900px){.afw-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){
        .abson-feedback-wall{padding:65px 5vw}
        .abson-feedback-wall .afw-inner{width:90vw}
        .abson-feedback-wall .afw-heading h2{font-size:58px}
        .abson-feedback-wall .afw-heading p{font-size:15px}
        .afw-toolbar{align-items:center}
        .afw-grid{grid-template-columns:1fr;gap:15px}
        .afw-card{min-height:0;padding:22px 20px 19px;box-shadow:5px 5px 0 #111}
        .afw-card:hover{transform:none;box-shadow:5px 5px 0 #111}
        .afw-quote{font-size:21px}
        .afw-event{max-width:45%}
      }
    `;
    document.head.appendChild(style);
  }

  const section=document.createElement('section');
  section.id='abson-feedback-wall';
  section.className='abson-feedback-wall section';
  section.innerHTML=`
    <div class="abson-watermark" aria-hidden="true">#ABSON</div>
    <div class="afw-inner">
      <div class="afw-heading">
        <p class="kicker">THE PEOPLE'S WALL</p>
        <h2>YOU SAID IT.<br><em>WE KEPT IT.</em></h2>
        <p>The messages, wishes and questionable wisdom already sent in by the people joining the chaos.</p>
      </div>
      <div class="afw-toolbar">
        <div class="afw-live"><span></span><span id="afwCount">LIVE FEEDBACK</span></div>
        <button class="afw-refresh" id="afwRefresh" type="button">REFRESH ↻</button>
      </div>
      <p id="afwStatus" class="afw-status">Loading the latest messages…</p>
      <div id="afwGrid" class="afw-grid"></div>
    </div>
  `;

  anchor.insertAdjacentElement('afterend',section);
  const refresh=document.getElementById('afwRefresh');
  if(refresh)refresh.addEventListener('click',loadFeedbackWall);
  return section;
}

function renderFeedbackWall(items){
  const grid=document.getElementById('afwGrid');
  const count=document.getElementById('afwCount');
  if(!grid)return;

  feedbackItems=(items||[]).filter(x=>x&&String(x.message||'').trim());
  if(count)count.textContent=feedbackItems.length+' MESSAGES · LIVE';

  if(!feedbackItems.length){
    grid.innerHTML='<div class="afw-empty"><strong>THE WALL IS WAITING.</strong>Your first message will appear here.</div>';
    return;
  }

  grid.innerHTML=feedbackItems.map(x=>{
    const message=String(x.message||'').trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const name=String(x.name||'Anonymous #ABSON').trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const event=String(x.event||'').trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    return '<article class="afw-card"><div class="afw-quote">'+message+'</div><div class="afw-meta"><strong class="afw-name">— '+name+'</strong><small class="afw-event">'+(event||'#ABSON')+'</small></div></article>';
  }).join('');
}

async function loadFeedbackWall(){
  const section=ensureFeedbackWall();
  if(!section)return;
  const status=document.getElementById('afwStatus');
  if(status)status.textContent='Loading the latest messages…';

  try{
    const r=await fetch(API_URL+'?action=feedback&t='+Date.now(),{cache:'no-store'});
    if(!r.ok)throw new Error('request failed');
    const data=await r.json();
    if(!data.ok)throw new Error(data.error||'feedback feed unavailable');
    renderFeedbackWall(data.feedback||[]);
    if(status)status.textContent='Updated just now · new messages appear automatically.';
  }catch(err){
    console.warn('#ABSON feedback wall:',err);
    if(status)status.textContent='Feedback is temporarily unavailable. Please refresh.';
  }
}

loadGuestWall();
setInterval(loadGuestWall,30000);
loadFeedbackWall();
setInterval(loadFeedbackWall,30000);
});
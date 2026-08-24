/* #ABSON — LIVE GOOGLE SHEETS FEEDBACK WALL */
(function(){
  const API_URL='https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec';
  let items=[],index=0,touchX=0;

  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}

  function injectStyles(){
    if(document.getElementById('abson-feedback-styles'))return;
    const s=document.createElement('style');s.id='abson-feedback-styles';
    s.textContent=`
#abson-feedback{position:relative;overflow:hidden;background:#f8f4ec;padding:38px 0 38px}
#abson-feedback .abf-inner{width:min(920px,86vw);margin:0 auto}
#abson-feedback .abf-heading{text-align:center;max-width:620px;margin:0 auto 20px}
#abson-feedback .abf-kicker{font:700 9px/1.2 'DM Sans',sans-serif;letter-spacing:.18em;text-transform:uppercase;margin:0 0 7px;color:#171717}
#abson-feedback .abf-heading h2{font:400 clamp(34px,4.5vw,58px)/.88 'Bebas Neue',sans-serif;margin:0;color:#171717}
#abson-feedback .abf-heading h2 em{font-family:'Playfair Display',serif;font-size:.46em;font-weight:600}
#abson-feedback .abf-heading p{margin:9px auto 0;max-width:500px;font:400 12px/1.45 'DM Sans',sans-serif;color:#5b5b5b}
#abson-feedback .abf-toolbar{width:100%;margin:0 auto 9px;display:flex;justify-content:space-between;align-items:center}
#abson-feedback .abf-live{font:900 9px/1.2 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase;color:#171717}
#abson-feedback .abf-live:before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:#d71920;margin-right:6px}
#abson-feedback .abf-count{font:700 8px/1.2 'DM Sans',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#666}
#absonFeedbackViewport{width:100%;margin:0 auto;overflow:hidden}
#absonFeedbackTrack{display:flex;width:100%;transition:transform .38s cubic-bezier(.2,.8,.2,1);will-change:transform}
.abf-card{flex:0 0 100%;box-sizing:border-box;min-height:145px;background:#fff;border:2px solid #171717;box-shadow:4px 4px 0 #171717;padding:17px 22px;display:flex;flex-direction:column;justify-content:space-between}
.abf-quote{font:italic clamp(17px,2.1vw,26px)/1.18 'Playfair Display',serif;color:#171717;margin:0;max-width:780px;overflow-wrap:anywhere}
.abf-quote:before{content:'“';display:block;font:900 31px/.5 Georgia,serif;margin-bottom:7px;color:#d6aa35}
.abf-divider{height:1px;background:#ddd;margin:12px 0 9px}
.abf-meta{display:flex;align-items:flex-end;justify-content:space-between;gap:14px}
.abf-name{font:900 9px/1.2 'DM Sans',sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#171717}
.abf-tag{font:600 8px/1.2 'DM Sans',sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#777;text-align:right}
#absonFeedbackControls{width:100%;margin:11px auto 0;display:grid;grid-template-columns:36px 1fr 36px;gap:8px;align-items:center}
#absonFeedbackControls button{width:36px;height:36px;border:2px solid #171717;background:#ffd447;color:#171717;box-shadow:2px 2px 0 #171717;font:700 19px/1 Arial,sans-serif;cursor:pointer}
#absonFeedbackCounter{text-align:center;font:700 9px/1.2 'DM Sans',sans-serif;letter-spacing:.16em;color:#171717}
#absonFeedbackDots{display:flex;justify-content:center;gap:5px;margin-top:6px}
#absonFeedbackDots button{width:5px;height:5px;min-width:5px;padding:0;border:0;border-radius:50%;background:#c8c8c8;cursor:pointer}
#absonFeedbackDots button.active{background:#171717;transform:scale(1.3)}
#absonFeedbackUpdated{text-align:center;margin:7px 0 0;font:400 9px/1.3 'DM Sans',sans-serif;color:#777}
.abf-empty{background:#ffd447;border:2px dashed #171717;padding:22px;text-align:center;font:400 13px/1.4 'DM Sans',sans-serif}
.abf-empty strong{display:block;font:400 29px/.95 'Bebas Neue',sans-serif;margin-bottom:7px}
@media(max-width:700px){#abson-feedback{padding:30px 0 34px}#abson-feedback .abf-inner{width:88vw}#abson-feedback .abf-heading{margin-bottom:17px}#abson-feedback .abf-heading h2{font-size:40px}#abson-feedback .abf-heading p{font-size:11px}.abf-card{min-height:135px;padding:15px 16px;box-shadow:3px 3px 0 #171717}.abf-quote{font-size:18px}.abf-quote:before{font-size:29px;margin-bottom:7px}.abf-divider{margin:10px 0 8px}.abf-meta{display:block}.abf-tag{text-align:left;margin-top:5px}#absonFeedbackControls{grid-template-columns:34px 1fr 34px;gap:6px;margin-top:10px}#absonFeedbackControls button{width:34px;height:34px;font-size:19px}}
`;
    document.head.appendChild(s);
  }

  function ensureSection(){
    if(document.getElementById('abson-feedback'))return document.getElementById('abson-feedback');
    const section=document.createElement('section');section.id='abson-feedback';section.className='section';
    section.innerHTML=`<div class="abson-watermark" aria-hidden="true">#ABSON</div><div class="abf-inner"><div class="abf-heading"><p class="abf-kicker">THE PEOPLE’S WALL</p><h2>YOU SAID IT. <em>WE KEPT IT.</em></h2><p>The messages, wishes and questionable wisdom already sent in by the people joining the chaos.</p></div><div class="abf-toolbar"><div class="abf-live">LIVE FEEDBACK</div><div id="absonFeedbackCount" class="abf-count">0 MESSAGES</div></div><div id="absonFeedbackViewport"><div id="absonFeedbackTrack"></div></div><div id="absonFeedbackControls"><button id="absonFeedbackPrev" type="button" aria-label="Previous feedback">‹</button><div><div id="absonFeedbackCounter">00 / 00</div><div id="absonFeedbackDots"></div></div><button id="absonFeedbackNext" type="button" aria-label="Next feedback">›</button></div><p id="absonFeedbackUpdated">Updated just now · new messages appear automatically.</p></div>`;
    const rsvp=document.getElementById('rsvp');
    if(rsvp&&rsvp.parentNode)rsvp.parentNode.insertBefore(section,rsvp);else document.querySelector('main')?.appendChild(section);
    return section;
  }

  function render(){
    const track=document.getElementById('absonFeedbackTrack'),counter=document.getElementById('absonFeedbackCounter'),dots=document.getElementById('absonFeedbackDots'),count=document.getElementById('absonFeedbackCount');
    if(!track)return;
    items=(Array.isArray(items)?items:[]).filter(x=>x&&String(x.message||'').trim());
    if(count)count.textContent=items.length+' MESSAGE'+(items.length===1?'':'S');
    if(!items.length){track.innerHTML='<div class="abf-empty"><strong>NO MESSAGES YET.</strong>Be the first to leave your #ABSON feedback.</div>';document.getElementById('absonFeedbackControls').style.display='none';return;}
    document.getElementById('absonFeedbackControls').style.display='grid';
    track.innerHTML=items.map(x=>{const name=esc(x.name||'Anonymous #ABSON'),msg=esc(x.message||'').replace(/\n/g,'<br>'),tag=esc(x.event||x.attendance||'#ABSON');return `<article class="abf-card"><div><p class="abf-quote">${msg}</p></div><div><div class="abf-divider"></div><div class="abf-meta"><div class="abf-name">— ${name}</div><div class="abf-tag">${tag}</div></div></div></article>`}).join('');
    dots.innerHTML='';items.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Go to feedback '+(i+1));b.onclick=()=>go(i);dots.appendChild(b)});go(0);
  }

  function go(i){if(!items.length)return;index=(i+items.length)%items.length;const track=document.getElementById('absonFeedbackTrack'),counter=document.getElementById('absonFeedbackCounter'),dots=document.getElementById('absonFeedbackDots');if(track)track.style.transform='translateX(-'+index*100+'%)';if(counter)counter.textContent=String(index+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');if(dots)Array.from(dots.children).forEach((d,n)=>d.classList.toggle('active',n===index));}

  async function load(){
    ensureSection();injectStyles();
    try{const r=await fetch(API_URL+'?action=feedback&t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('request failed');const data=await r.json();if(!data.ok)throw new Error(data.error||'feedback unavailable');items=data.feedback||[];render();const u=document.getElementById('absonFeedbackUpdated');if(u)u.textContent='Updated just now · new messages appear automatically.'}
    catch(e){console.warn('#ABSON feedback:',e);items=[];render();}
  }

  function bind(){
    const section=ensureSection();injectStyles();
    document.getElementById('absonFeedbackPrev').onclick=()=>go(index-1);
    document.getElementById('absonFeedbackNext').onclick=()=>go(index+1);
    section.addEventListener('touchstart',e=>{if(e.touches.length)touchX=e.touches[0].clientX},{passive:true});
    section.addEventListener('touchend',e=>{if(!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>55)go(index+(dx<0?1:-1))},{passive:true});
    load();setInterval(load,30000);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();

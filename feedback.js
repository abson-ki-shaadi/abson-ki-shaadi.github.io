/* #ABSON — LIVE GOOGLE SHEETS FEEDBACK WALL */
(function(){
  const API_URL='https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec';
  let items=[],index=0,touchX=0;

  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}

  function injectStyles(){
    if(document.getElementById('abson-feedback-styles'))return;
    const s=document.createElement('style');s.id='abson-feedback-styles';
    s.textContent=`
#abson-feedback{position:relative;overflow:hidden;background:#f8f4ec;padding:55px 0 55px}
#abson-feedback .abf-inner{width:min(1050px,88vw);margin:0 auto}
#abson-feedback .abf-heading{text-align:center;max-width:700px;margin:0 auto 28px}
#abson-feedback .abf-kicker{font:700 10px/1.2 'DM Sans',sans-serif;letter-spacing:.2em;text-transform:uppercase;margin:0 0 9px;color:#171717}
#abson-feedback .abf-heading h2{font:400 clamp(42px,5.5vw,72px)/.88 'Bebas Neue',sans-serif;margin:0;color:#171717}
#abson-feedback .abf-heading h2 em{font-family:'Playfair Display',serif;font-size:.48em;font-weight:600}
#abson-feedback .abf-heading p{margin:12px auto 0;max-width:560px;font:400 14px/1.5 'DM Sans',sans-serif;color:#5b5b5b}
#abson-feedback .abf-toolbar{width:100%;margin:0 auto 12px;display:flex;justify-content:space-between;align-items:center}
#abson-feedback .abf-live{font:900 10px/1.2 'DM Sans',sans-serif;letter-spacing:.15em;text-transform:uppercase;color:#171717}
#abson-feedback .abf-live:before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;background:#d71920;margin-right:7px}
#abson-feedback .abf-count{font:700 9px/1.2 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase;color:#666}
#absonFeedbackViewport{width:100%;margin:0 auto;overflow:hidden}
#absonFeedbackTrack{display:flex;width:100%;transition:transform .38s cubic-bezier(.2,.8,.2,1);will-change:transform}
.abf-card{flex:0 0 100%;box-sizing:border-box;min-height:205px;background:#fff;border:2px solid #171717;box-shadow:5px 5px 0 #171717;padding:24px 30px;display:flex;flex-direction:column;justify-content:space-between}
.abf-quote{font:italic clamp(20px,2.7vw,32px)/1.2 'Playfair Display',serif;color:#171717;margin:0;max-width:850px;overflow-wrap:anywhere}
.abf-quote:before{content:'“';display:block;font:900 38px/.55 Georgia,serif;margin-bottom:10px;color:#d6aa35}
.abf-divider{height:1px;background:#ddd;margin:18px 0 12px}
.abf-meta{display:flex;align-items:flex-end;justify-content:space-between;gap:18px}
.abf-name{font:900 11px/1.2 'DM Sans',sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#171717}
.abf-tag{font:600 9px/1.2 'DM Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#777;text-align:right}
#absonFeedbackControls{width:100%;margin:15px auto 0;display:grid;grid-template-columns:42px 1fr 42px;gap:10px;align-items:center}
#absonFeedbackControls button{width:42px;height:42px;border:2px solid #171717;background:#ffd447;color:#171717;box-shadow:3px 3px 0 #171717;font:700 22px/1 Arial,sans-serif;cursor:pointer}
#absonFeedbackCounter{text-align:center;font:700 10px/1.2 'DM Sans',sans-serif;letter-spacing:.18em;color:#171717}
#absonFeedbackDots{display:flex;justify-content:center;gap:6px;margin-top:8px}
#absonFeedbackDots button{width:6px;height:6px;min-width:6px;padding:0;border:0;border-radius:50%;background:#c8c8c8;cursor:pointer}
#absonFeedbackDots button.active{background:#171717;transform:scale(1.3)}
#absonFeedbackUpdated{text-align:center;margin:10px 0 0;font:400 10px/1.4 'DM Sans',sans-serif;color:#777}
.abf-empty{background:#ffd447;border:2px dashed #171717;padding:28px;text-align:center;font:400 15px/1.5 'DM Sans',sans-serif}
.abf-empty strong{display:block;font:400 34px/.95 'Bebas Neue',sans-serif;margin-bottom:9px}
@media(max-width:700px){#abson-feedback{padding:45px 0 50px}#abson-feedback .abf-inner{width:90vw}#abson-feedback .abf-heading{margin-bottom:22px}#abson-feedback .abf-heading h2{font-size:48px}#abson-feedback .abf-heading p{font-size:13px}.abf-card{min-height:190px;padding:20px 18px;box-shadow:4px 4px 0 #171717}.abf-quote{font-size:21px}.abf-quote:before{font-size:36px;margin-bottom:9px}.abf-divider{margin:15px 0 11px}.abf-meta{display:block}.abf-tag{text-align:left;margin-top:6px}#absonFeedbackControls{grid-template-columns:40px 1fr 40px;gap:7px;margin-top:13px}#absonFeedbackControls button{width:40px;height:40px;font-size:21px}}
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

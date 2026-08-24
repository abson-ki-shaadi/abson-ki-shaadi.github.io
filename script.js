/* #ABSON WEDDING WEBSITE — BROWSER JAVASCRIPT */
document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec";

  /* Opening */
  const opening=document.getElementById("opening"), enterBtn=document.getElementById("enterBtn");

  /* Mobile-safe confetti: uses requestAnimationFrame instead of CSS animation so it also works on iPhone/Android. */
  function createAbsonConfetti(){
    const old=document.getElementById("abson-confetti-layer");
    if(old)old.remove();
    const colors=["#ffd447","#ff6f91","#b7df66","#ffffff"];
    const layer=document.createElement("div");
    layer.id="abson-confetti-layer";
    layer.setAttribute("aria-hidden","true");
    layer.style.cssText="position:fixed;left:0;top:0;width:100%;height:100%;height:100dvh;z-index:2147483647;pointer-events:none;overflow:hidden;display:block;visibility:visible;opacity:1;";
    document.body.appendChild(layer);

    const pieces=[];
    const count=Math.min(85,Math.max(55,Math.floor(window.innerWidth/4)));
    for(let i=0;i<count;i++){
      const p=document.createElement("span");
      const w=5+Math.random()*7;
      const h=8+Math.random()*12;
      p.style.cssText="position:absolute;display:block;left:0;top:0;width:"+w+"px;height:"+h+"px;background:"+colors[i%colors.length]+";border-radius:2px;will-change:transform,opacity;opacity:1;";
      layer.appendChild(p);
      pieces.push({
        el:p,
        x:Math.random()*window.innerWidth,
        y:-30-Math.random()*window.innerHeight*.35,
        vx:(Math.random()-.5)*2.2,
        vy:2.5+Math.random()*3.8,
        gravity:.055+Math.random()*.045,
        rotation:Math.random()*360,
        spin:(Math.random()-.5)*14,
        sway:Math.random()*Math.PI*2,
        swaySpeed:.025+Math.random()*.035,
        opacity:1
      });
    }

    let start=performance.now();
    function frame(now){
      const elapsed=now-start;
      pieces.forEach(function(q){
        q.y+=q.vy;
        q.vy+=q.gravity;
        q.x+=q.vx+Math.sin(q.sway)*.7;
        q.sway+=q.swaySpeed;
        q.rotation+=q.spin;
        q.opacity=Math.max(0,1-Math.max(0,q.y-window.innerHeight*.55)/(window.innerHeight*.65));
        q.el.style.transform="translate3d("+q.x+"px,"+q.y+"px,0) rotate("+q.rotation+"deg)";
        q.el.style.opacity=String(q.opacity);
      });
      if(elapsed<3200){
        requestAnimationFrame(frame);
      }else if(layer.parentNode){
        layer.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  if(opening&&enterBtn) enterBtn.addEventListener("click",()=>{
    if(opening.classList.contains("opening-leaving"))return;
    /* Fire before changing the opening state so mobile browsers cannot lose the animation during the transition. */
    createAbsonConfetti();
    opening.classList.add("opening-leaving");
    enterBtn.disabled=true;
    enterBtn.textContent="BREAKING NEWS...";
    const flash=document.createElement("div");
    flash.className="abson-flash";
    flash.innerHTML="<span>#ABSON</span>";
    flash.style.zIndex="2147483646";
    document.body.appendChild(flash);
    setTimeout(()=>{
      opening.classList.add("hidden");
      setTimeout(()=>{
        opening.style.display="none";
        flash.remove();
      },400);
    },1150);
  });

  /* Countdown */
  const weddingDate=new Date("2027-01-09T15:00:00+05:30").getTime();
  function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,"0")}
  function updateCountdown(){let d=Math.max(0,weddingDate-Date.now());setText("days",Math.floor(d/86400000));setText("hours",Math.floor(d%86400000/3600000));setText("minutes",Math.floor(d%3600000/60000));setText("seconds",Math.floor(d%60000/1000))}
  updateCountdown();setInterval(updateCountdown,1000);

  /* Music */
  const music=document.getElementById("weddingMusic"),musicBtn=document.getElementById("musicBtn");
  if(music&&musicBtn)musicBtn.addEventListener("click",()=>{if(music.paused){music.play().then(()=>{musicBtn.textContent="♫ MUSIC ON";musicBtn.classList.add("playing")}).catch(()=>musicBtn.textContent="TAP AGAIN ♪")}else{music.pause();musicBtn.textContent="♪ MUSIC";musicBtn.classList.remove("playing")}});

  /* Lore */
  const loreData=[
    {image:"01.png",title:"WE MET.",text:"Two people met, started talking and somehow decided this was a good idea.",caption:"Evidence suggests excessive laughter."},
    {image:"02.png",title:"THE CHAOS.",text:"Somewhere between the jokes, food and questionable decisions, things got serious.",caption:"No responsible adults were involved."},
    {image:"03.jpeg",title:"IT GOT SERIOUS.",text:"Then came the dates, the memories and the tiny realisation that this wasn't just another chapter.",caption:"Plot development detected."},
    {image:"04.jpeg",title:"THE QUESTION.",text:"One question was asked. One answer was given. And suddenly everyone had opinions.",caption:"Family group chats went into overdrive."},
    {image:"05.jpeg",title:"#ABSON.",text:"And now here we are. Two people, one wedding and approximately 300 witnesses.",caption:"No refunds. 09.01.2027."}
  ];
  const loreImage=document.getElementById("loreImage"),loreTitle=document.getElementById("loreTitle"),loreText=document.getElementById("loreText"),loreCaption=document.getElementById("loreCaption"),loreCurrent=document.getElementById("loreCurrent"),loreNumber=document.getElementById("loreNumber"),loreSteps=document.querySelectorAll(".lore-step"),lorePrev=document.getElementById("lorePrev"),loreNext=document.getElementById("loreNext");let loreIndex=0;
  function showLore(index){if(!loreImage)return;if(index<0)index=loreData.length-1;if(index>=loreData.length)index=0;loreIndex=index;const item=loreData[index];loreImage.classList.add("lore-changing");setTimeout(()=>{loreImage.src=item.image;loreImage.alt=item.title+" — #ABSON";if(loreTitle)loreTitle.textContent=item.title;if(loreText)loreText.textContent=item.text;if(loreCaption)loreCaption.textContent=item.caption;const n=String(index+1).padStart(2,"0");if(loreCurrent)loreCurrent.textContent=n;if(loreNumber)loreNumber.textContent=n;loreImage.classList.remove("lore-changing")},170);loreSteps.forEach((s,i)=>s.classList.toggle("active",i===index))}
  loreSteps.forEach(s=>s.addEventListener("click",()=>showLore(Number(s.dataset.step))));if(lorePrev)lorePrev.addEventListener("click",()=>showLore(loreIndex-1));if(loreNext)loreNext.addEventListener("click",()=>showLore(loreIndex+1));showLore(0);

  /* Lightbox */
  const lightbox=document.getElementById("lightbox"),lightboxImage=document.getElementById("lightboxImage"),lightboxCaption=document.getElementById("lightboxCaption"),lightboxClose=document.getElementById("lightboxClose");
  function closeLightbox(){if(!lightbox)return;lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true")}
  document.querySelectorAll(".gallery-photo img,.story-image img,.lore-photo-card img").forEach(img=>img.addEventListener("click",()=>{if(!lightbox||!lightboxImage)return;lightboxImage.src=img.currentSrc||img.src;lightboxImage.alt=img.alt||"";const fig=img.closest("figure"),cap=fig&&fig.querySelector("figcaption");if(lightboxCaption)lightboxCaption.textContent=cap?cap.textContent:"";lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false")}));
  if(lightboxClose)lightboxClose.addEventListener("click",closeLightbox);if(lightbox)lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

  /* RSVP */
  const rsvpForm=document.getElementById("rsvpForm"),formNote=document.getElementById("formNote");
  if(rsvpForm)rsvpForm.addEventListener("submit",async e=>{e.preventDefault();const button=rsvpForm.querySelector('button[type="submit"]');if(button){button.disabled=true;button.textContent="SENDING..."}if(formNote)formNote.textContent="Sending your RSVP...";const f=new FormData(rsvpForm),payload={action:"rsvp",name:f.get("name")||"",guests:f.get("guests")||"",attendance:f.get("attendance")||"",event:f.get("event")||"",message:f.get("message")||""};try{const r=await fetch(API_URL,{method:"POST",body:JSON.stringify(payload)}),result=await r.json();if(!result.ok)throw new Error(result.error||"Unable to submit RSVP.");if(formNote)formNote.textContent=payload.attendance.toLowerCase().includes("yes")?"🎉 KNEW IT. SEE YOU AT #ABSON.":"😭 This is deeply disappointing.";rsvpForm.reset();createAbsonConfetti()}catch(err){console.error(err);if(formNote)formNote.textContent="Something went wrong. Please try again."}finally{if(button){button.disabled=false;button.textContent="LOCK IN MY RSVP ✦"}}});

  /* Guest upload */
  const guestForm=document.getElementById("guestUploadForm"),guestFiles=document.getElementById("guestFiles"),guestName=document.getElementById("guestName"),uploadPreview=document.getElementById("uploadPreview"),uploadStatus=document.getElementById("uploadStatus");
  function readFileAsBase64(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)})}
  if(guestFiles)guestFiles.addEventListener("change",()=>{if(!uploadPreview)return;uploadPreview.innerHTML="";Array.from(guestFiles.files||[]).forEach(file=>{const p=document.createElement("div");p.className="file-pill";p.textContent=file.name;uploadPreview.appendChild(p)})});
  if(guestForm)guestForm.addEventListener("submit",async e=>{e.preventDefault();const files=Array.from(guestFiles?guestFiles.files||[]:[]);if(!files.length){if(uploadStatus)uploadStatus.textContent="Please choose at least one photo or video.";return}const button=guestForm.querySelector(".upload-button");if(button){button.disabled=true;button.textContent="UPLOADING..."}if(uploadStatus)uploadStatus.textContent="Sending your evidence to #ABSON...";try{for(const file of files){const payload={action:"uploadGuestFile",guestName:guestName?guestName.value:"",fileName:file.name,mimeType:file.type,base64:await readFileAsBase64(file)};const r=await fetch(API_URL,{method:"POST",body:JSON.stringify(payload)}),result=await r.json();if(!result.ok)throw new Error(result.error||"Upload failed")}if(uploadStatus)uploadStatus.textContent="🎉 Evidence received. #ABSON has it.";guestForm.reset();if(uploadPreview)uploadPreview.innerHTML="";loadGuestWall()}catch(err){console.error(err);if(uploadStatus)uploadStatus.textContent="Upload failed. Please try again."}finally{if(button){button.disabled=false;button.textContent="SEND TO #ABSON →"}}});

  /* Live Guest Wall */
  function ensureGuestWall(){if(document.getElementById("guest-wall"))return document.getElementById("guest-wall");const anchor=document.getElementById("guest-photos");if(!anchor)return null;const link=document.createElement("link");link.rel="stylesheet";link.href="guest-wall.css";document.head.appendChild(link);const section=document.createElement("section");section.id="guest-wall";section.className="guest-wall section";section.innerHTML='<div class="abson-watermark" aria-hidden="true">#ABSON</div><div class="section-heading"><p class="kicker">THE PEOPLE’S CAMERA ROLL</p><h2>Live from the chaos.</h2><p>Photos and videos shared by the people who were actually there.</p></div><div class="guest-wall-toolbar"><div class="guest-wall-live"><span></span>LIVE CAMERA ROLL</div><button class="guest-wall-refresh" id="guestWallRefresh" type="button">REFRESH ↻</button></div><p id="guestWallStatus" class="guest-wall-status">Loading the latest evidence…</p><div id="guestWallGrid" class="guest-wall-grid"></div>';anchor.insertAdjacentElement("afterend",section);document.querySelectorAll("#guest-wall .abson-watermark").forEach(x=>x.style.zIndex="0");const refresh=document.getElementById("guestWallRefresh");if(refresh)refresh.addEventListener("click",loadGuestWall);return section}
  function renderGuestWall(items){const grid=document.getElementById("guestWallGrid");if(!grid)return;if(!items||!items.length){grid.innerHTML='<div class="guest-wall-empty"><strong>NO EVIDENCE YET.</strong>Be the first to add to the #ABSON camera roll.</div>';return}grid.innerHTML=items.map(x=>{const url=x.url||x.link||x.fileUrl||"",name=x.name||x.guestName||"Anonymous #ABSON",type=(x.type||x.mimeType||"").toLowerCase();if(!url)return"";const safeName=String(name).replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));const media=type.includes("video")?'<a class="guest-wall-video" href="'+url+'" target="_blank" rel="noopener">▶ WATCH VIDEO</a>':'<a href="'+url+'" target="_blank" rel="noopener"><img class="guest-wall-media" src="'+url+'" alt="'+safeName+' — #ABSON" loading="lazy"></a>';return'<article class="guest-wall-card">'+media+'<div class="guest-wall-meta"><strong>'+safeName+'</strong><small>#ABSON CAMERA ROLL</small></div></article>'}).join("")}
  async function loadGuestWall(){const section=ensureGuestWall();if(!section)return;const status=document.getElementById("guestWallStatus");if(status)status.textContent="Loading the latest evidence…";try{const r=await fetch(API_URL+"?action=guestPhotos&t="+Date.now(),{cache:"no-store"});if(!r.ok)throw new Error("request failed");const data=await r.json();if(!data.ok)throw new Error(data.error||"feed unavailable");renderGuestWall(data.photos||[]);if(status)status.textContent="Updated just now."}catch(err){console.warn("#ABSON guest wall:",err);renderGuestWall([]);if(status)status.textContent="The live camera roll is getting ready."}}
  loadGuestWall();setInterval(loadGuestWall,30000);
});
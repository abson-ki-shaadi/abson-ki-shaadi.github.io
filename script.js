const WEDDING_DATE=new Date("2027-01-09T15:00:00+05:30").getTime();
const music=document.getElementById("weddingMusic"),musicBtn=document.getElementById("musicBtn"),opening=document.getElementById("opening");
let musicReady=true; music.addEventListener("error",()=>musicReady=false);
function confettiBurst(){const colors=["#ffd447","#ff6f91","#5b7cfa","#b7df66","#ff5b4d"];for(let i=0;i<70;i++){const p=document.createElement("i");p.className="confetti";p.style.left="50%";p.style.top="45%";p.style.background=colors[i%colors.length];p.style.setProperty("--x",`${(Math.random()-.5)*110}vw`);p.style.setProperty("--y",`${(Math.random()-.5)*100}vh`);p.style.transform=`rotate(${Math.random()*360}deg)`;document.body.appendChild(p);setTimeout(()=>p.remove(),1600)}}
async function playMusic(){if(!musicReady)return;try{await music.play();musicBtn.textContent="❚❚ MUSIC";musicBtn.classList.add("playing")}catch(e){}}
document.getElementById("enterBtn").addEventListener("click",async()=>{opening.classList.add("hidden");confettiBurst();await playMusic()});
musicBtn.addEventListener("click",async()=>{if(!musicReady){alert("Wedding music could not be loaded.");return}if(music.paused){await playMusic()}else{music.pause();musicBtn.textContent="♪ MUSIC";musicBtn.classList.remove("playing")}});
function countdown(){let d=WEDDING_DATE-Date.now();if(d<0)d=0;document.getElementById("days").textContent=String(Math.floor(d/86400000)).padStart(2,"0");document.getElementById("hours").textContent=String(Math.floor(d/3600000)%24).padStart(2,"0");document.getElementById("minutes").textContent=String(Math.floor(d/60000)%60).padStart(2,"0");document.getElementById("seconds").textContent=String(Math.floor(d/1000)%60).padStart(2,"0")};countdown();setInterval(countdown,1000);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("seen")}),{threshold:.12});document.querySelectorAll(".section,.event-card,.gallery-photo").forEach((el,i)=>{el.style.setProperty("--delay",`${(i%8)*70}ms`);el.style.transitionDelay="var(--delay)";el.style.transformOrigin="center";observer.observe(el)});const style=document.createElement("style");style.textContent='.section.seen,.event-card.seen,.gallery-photo.seen{opacity:1;transform:translateY(0) rotate(var(--r,0deg));transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}';document.head.appendChild(style);

// Click any gallery/story photo to open it individually.
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCaption=document.getElementById("lightboxCaption");
const lightboxClose=document.getElementById("lightboxClose");
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow="";lightboxImage.src=""}
document.querySelectorAll(".gallery-photo img,.story-image img").forEach(img=>{img.addEventListener("click",()=>{lightboxImage.src=img.currentSrc||img.src;lightboxImage.alt=img.alt||"ABSON photo";const cap=img.closest("figure")?.querySelector("figcaption")?.textContent||img.closest(".story-image")?.querySelector(".photo-label")?.textContent||"#ABSON";lightboxCaption.textContent=cap;lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"})});
lightboxClose.addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&lightbox.classList.contains("open"))closeLightbox()});

const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec';

document.getElementById("rsvpForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById("formNote");
  const button = form.querySelector("button[type=submit]");
  const data = Object.fromEntries(new FormData(form).entries());
  if (RSVP_ENDPOINT.includes("PASTE_YOUR")) {
    note.textContent = "RSVP form is ready — connect the Google Sheet endpoint first. ❤️";
    return;
  }
  button.disabled = true;
  button.textContent = "SENDING…";
  note.textContent = "Saving your RSVP…";
  try {
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    note.textContent = `You're on the list, ${data.name}! 🎉 #ABSON will see you there.`;
    confettiBurst();
    form.reset();
  } catch (err) {
    note.textContent = "Oops — the RSVP could not be saved. Please try again.";
  } finally {
    button.disabled = false;
    button.textContent = "LOCK IN MY RSVP ✦";
  }
});


/* #ABSON Guest Photo Upload
   After deploying the Google Apps Script below, paste its /exec URL here. */
const GUEST_UPLOAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec";

const guestUploadForm = document.getElementById("guestUploadForm");
const guestFiles = document.getElementById("guestFiles");
const uploadPreview = document.getElementById("uploadPreview");
const uploadStatus = document.getElementById("uploadStatus");

if (guestFiles) {
  guestFiles.addEventListener("change", () => {
    uploadPreview.innerHTML = "";
    [...guestFiles.files].forEach(file => {
      const pill = document.createElement("div");
      pill.className = "file-pill";
      pill.textContent = `${file.name} · ${(file.size/1024/1024).toFixed(1)} MB`;
      uploadPreview.appendChild(pill);
    });
  });
}

if (guestUploadForm) {
  guestUploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!guestFiles.files.length) {
      uploadStatus.textContent = "Please choose at least one photo or video.";
      return;
    }
    if (GUEST_UPLOAD_ENDPOINT.includes("PASTE_YOUR")) {
      uploadStatus.textContent = "The upload connection still needs to be deployed in Google Apps Script.";
      return;
    }

    const button = guestUploadForm.querySelector(".upload-button");
    button.disabled = true;
    uploadStatus.textContent = "Uploading your #ABSON memories…";

    try {
      const guestName = document.getElementById("guestName").value.trim();
      for (const file of guestFiles.files) {
        const reader = new FileReader();
        const base64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const payload = {
          action: "uploadGuestFile",
          guestName,
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          base64
        };

        await fetch(GUEST_UPLOAD_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: {"Content-Type":"text/plain;charset=utf-8"},
          body: JSON.stringify(payload)
        });
      }

      uploadStatus.textContent = "Done! Your memories are now part of the #ABSON archive. ❤️";
      guestUploadForm.reset();
      uploadPreview.innerHTML = "";
    } catch (err) {
      uploadStatus.textContent = "Upload failed. Please try again or share the photos with the couple directly.";
    } finally {
      button.disabled = false;
    }
  });
  /* =========================================
   #ABSON INTERACTIVE OPENING
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const opening = document.getElementById("opening");
  const enterBtn = document.getElementById("enterBtn");

  if (!opening || !enterBtn) return;

  enterBtn.addEventListener("click", () => {

    // Prevent double-clicks
    if (opening.classList.contains("opening-leaving")) return;

    opening.classList.add("opening-leaving");

    enterBtn.disabled = true;
    enterBtn.innerHTML = "BREAKING NEWS...";

    // Create #ABSON flash
    const flash = document.createElement("div");

    flash.className = "abson-flash";
    flash.innerHTML = `
      <span>#ABSON</span>
    `;

    document.body.appendChild(flash);

    // Confetti
    createAbsonConfetti();

    // Remove opening after animation
    setTimeout(() => {
      opening.style.display = "none";
      flash.remove();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 1500);

  });


  function createAbsonConfetti() {

    const pieces = 45;

    for (let i = 0; i < pieces; i++) {

      const piece = document.createElement("span");

      piece.className = "abson-confetti";

      piece.style.left =
        Math.random() * 100 + "vw";

      piece.style.animationDelay =
        Math.random() * 0.4 + "s";

      piece.style.transform =
        `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 2200);

    }
    /* =========================================================
   #ABSON — INTERACTIVE LORE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const loreData = [

    {
      image: "01.png",
      title: "WE MET.",
      text:
        "Two people met, started talking and somehow decided this was a good idea.",
      caption:
        "Evidence suggests excessive laughter."
    },

    {
      image: "02.png",
      title: "THE CHAOS.",
      text:
        "Somewhere between the jokes, food and questionable decisions, things got serious.",
      caption:
        "No responsible adults were involved."
    },

    {
      image: "03.jpeg",
      title: "IT GOT SERIOUS.",
      text:
        "Then came the dates, the memories and the tiny realisation that this wasn't just another chapter.",
      caption:
        "Plot development detected."
    },

    {
      image: "04.jpeg",
      title: "THE QUESTION.",
      text:
        "One question was asked. One answer was given. And suddenly everyone had opinions.",
      caption:
        "Family group chats went into overdrive."
    },

    {
      image: "05.jpeg",
      title: "#ABSON.",
      text:
        "And now here we are. Two people, one wedding and approximately 300 witnesses.",
      caption:
        "No refunds. 09.01.2027."
    }

  ];


  const image = document.getElementById("loreImage");
  const title = document.getElementById("loreTitle");
  const text = document.getElementById("loreText");
  const caption = document.getElementById("loreCaption");

  const number = document.getElementById("loreNumber");
  const current = document.getElementById("loreCurrent");

  const steps = document.querySelectorAll(".lore-step");
  const next = document.getElementById("loreNext");


  if (
    !image ||
    !title ||
    !text ||
    !caption ||
    !steps.length
  ) {
    return;
  }


  let currentStep = 0;


  function showLore(step) {

    const item = loreData[step];

    if (!item) return;

    currentStep = step;


    /* Animate image out */

    image.classList.add("changing");


    setTimeout(function () {

      image.src = item.image;
      image.alt = item.title;

      title.textContent = item.title;
      text.textContent = item.text;
      caption.textContent = item.caption;

      const displayNumber =
        String(step + 1).padStart(2, "0");

      number.textContent = displayNumber;
      current.textContent = displayNumber;


      image.classList.remove("changing");

    }, 180);


    /* Active button */

    steps.forEach(function (button, index) {

      button.classList.toggle(
        "active",
        index === step
      );

    });


    /* Update next button */

    if (step === loreData.length - 1) {

      next.textContent =
        "START AGAIN ↻";

    } else {

      next.textContent =
        "NEXT CHAPTER →";

    }

  }


  /* Timeline buttons */

  steps.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const step =
          Number(button.dataset.step);

        showLore(step);

      }
    );

  });


  /* Next button */

  if (next) {

    next.addEventListener(
      "click",
      function () {

        let nextStep =
          currentStep + 1;

        if (
          nextStep >= loreData.length
        ) {
          nextStep = 0;
        }

        showLore(nextStep);

      }
    );

  }


  /* Initial state */

  showLore(0);

});

  }

});
}

/* =========================================================
   #ABSON WEDDING WEBSITE — BROWSER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------
     CONFIG
     --------------------------------------------------------- */

  const API_URL =
    "https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec";


  /* ---------------------------------------------------------
     OPENING SCREEN
     --------------------------------------------------------- */

  const opening = document.getElementById("opening");
  const enterBtn = document.getElementById("enterBtn");

  if (opening && enterBtn) {

    enterBtn.addEventListener("click", function () {

      if (opening.classList.contains("opening-leaving")) return;

      opening.classList.add("opening-leaving");

      enterBtn.disabled = true;
      enterBtn.textContent = "BREAKING NEWS...";

      const flash = document.createElement("div");

      flash.className = "abson-flash";

      flash.innerHTML = "<span>#ABSON</span>";

      document.body.appendChild(flash);

      createAbsonConfetti();

      setTimeout(function () {

        opening.classList.add("hidden");

        setTimeout(function () {
          opening.style.display = "none";
          flash.remove();
        }, 400);

      }, 1150);

    });

  }


  function createAbsonConfetti() {

    for (let i = 0; i < 45; i++) {

      const piece =
        document.createElement("span");

      piece.className = "abson-confetti";

      piece.style.left =
        Math.random() * 100 + "vw";

      piece.style.animationDelay =
        Math.random() * .4 + "s";

      piece.style.transform =
        "rotate(" +
        Math.random() * 360 +
        "deg)";

      document.body.appendChild(piece);

      setTimeout(function () {
        piece.remove();
      }, 2200);

    }

  }


  /* ---------------------------------------------------------
     COUNTDOWN
     --------------------------------------------------------- */

  const weddingDate =
    new Date("2027-01-09T15:00:00+05:30").getTime();

  function updateCountdown() {

    const now = Date.now();

    let distance =
      weddingDate - now;

    if (distance < 0) {
      distance = 0;
    }

    const days =
      Math.floor(distance / 86400000);

    const hours =
      Math.floor(
        (distance % 86400000) / 3600000
      );

    const minutes =
      Math.floor(
        (distance % 3600000) / 60000
      );

    const seconds =
      Math.floor(
        (distance % 60000) / 1000
      );


    setText("days", days);
    setText("hours", hours);
    setText("minutes", minutes);
    setText("seconds", seconds);

  }


  function setText(id, value) {

    const element =
      document.getElementById(id);

    if (!element) return;

    element.textContent =
      String(value).padStart(2, "0");

  }


  updateCountdown();

  setInterval(updateCountdown, 1000);


  /* ---------------------------------------------------------
     MUSIC
     --------------------------------------------------------- */

  const music =
    document.getElementById("weddingMusic");

  const musicBtn =
    document.getElementById("musicBtn");

  if (music && musicBtn) {

    musicBtn.addEventListener("click", function () {

      if (music.paused) {

        music.play()
          .then(function () {

            musicBtn.textContent =
              "♫ MUSIC ON";

            musicBtn.classList.add("playing");

          })
          .catch(function () {

            musicBtn.textContent =
              "TAP AGAIN ♪";

          });

      } else {

        music.pause();

        musicBtn.textContent =
          "♪ MUSIC";

        musicBtn.classList.remove("playing");

      }

    });

  }


  /* ---------------------------------------------------------
     INTERACTIVE LORE
     --------------------------------------------------------- */

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


  const loreImage =
    document.getElementById("loreImage");

  const loreTitle =
    document.getElementById("loreTitle");

  const loreText =
    document.getElementById("loreText");

  const loreCaption =
    document.getElementById("loreCaption");

  const loreCurrent =
    document.getElementById("loreCurrent");

  const loreNumber =
    document.getElementById("loreNumber");

  const loreSteps =
    document.querySelectorAll(".lore-step");

  const lorePrev =
    document.getElementById("lorePrev");

  const loreNext =
    document.getElementById("loreNext");


  let loreIndex = 0;


  function showLore(index) {

    if (!loreImage) return;

    if (index < 0) {
      index = loreData.length - 1;
    }

    if (index >= loreData.length) {
      index = 0;
    }

    loreIndex = index;

    const item =
      loreData[index];

    loreImage.classList.add("lore-changing");


    setTimeout(function () {

      loreImage.src = item.image;

      loreImage.alt =
        item.title + " — #ABSON";

      if (loreTitle) {
        loreTitle.textContent =
          item.title;
      }

      if (loreText) {
        loreText.textContent =
          item.text;
      }

      if (loreCaption) {
        loreCaption.textContent =
          item.caption;
      }

      const number =
        String(index + 1).padStart(2, "0");

      if (loreCurrent) {
        loreCurrent.textContent =
          number;
      }

      if (loreNumber) {
        loreNumber.textContent =
          number;
      }

      loreImage.classList.remove(
        "lore-changing"
      );

    }, 170);


    loreSteps.forEach(
      function (step, stepIndex) {

        step.classList.toggle(
          "active",
          stepIndex === index
        );

      }
    );

  }


  loreSteps.forEach(
    function (step) {

      step.addEventListener(
        "click",
        function () {

          showLore(
            Number(step.dataset.step)
          );

        }
      );

    }
  );


  if (lorePrev) {

    lorePrev.addEventListener(
      "click",
      function () {
        showLore(loreIndex - 1);
      }
    );

  }


  if (loreNext) {

    loreNext.addEventListener(
      "click",
      function () {
        showLore(loreIndex + 1);
      }
    );

  }


  showLore(0);


  /* ---------------------------------------------------------
     GALLERY + STORY LIGHTBOX
     --------------------------------------------------------- */

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxCaption =
    document.getElementById("lightboxCaption");

  const lightboxClose =
    document.getElementById("lightboxClose");


  document
    .querySelectorAll(
      ".gallery-photo img, .story-image img, .lore-photo-card img"
    )
    .forEach(function (img) {

      img.addEventListener(
        "click",
        function () {

          if (!lightbox || !lightboxImage) {
            return;
          }

          lightboxImage.src =
            img.currentSrc ||
            img.src;

          lightboxImage.alt =
            img.alt || "";

          if (lightboxCaption) {

            const figure =
              img.closest("figure");

            const caption =
              figure
                ? figure.querySelector("figcaption")
                : null;

            lightboxCaption.textContent =
              caption
                ? caption.textContent
                : "";

          }

          lightbox.classList.add("open");
          lightbox.setAttribute(
            "aria-hidden",
            "false"
          );

        }
      );

    });


  function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      function (event) {

        if (event.target === lightbox) {
          closeLightbox();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeLightbox();
      }

    }
  );


  /* ---------------------------------------------------------
     RSVP
     --------------------------------------------------------- */

  const rsvpForm =
    document.getElementById("rsvpForm");

  const formNote =
    document.getElementById("formNote");


  if (rsvpForm) {

    rsvpForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        const button =
          rsvpForm.querySelector(
            'button[type="submit"]'
          );

        if (button) {
          button.disabled = true;
          button.textContent =
            "SENDING...";
        }

        if (formNote) {
          formNote.textContent =
            "Sending your RSVP...";
        }


        const formData =
          new FormData(rsvpForm);

        const payload = {

          action: "rsvp",

          name:
            formData.get("name") || "",

          guests:
            formData.get("guests") || "",

          attendance:
            formData.get("attendance") || "",

          event:
            formData.get("event") || "",

          message:
            formData.get("message") || ""

        };


        try {

          const response =
            await fetch(
              API_URL,
              {
                method: "POST",
                body: JSON.stringify(payload)
              }
            );


          const result =
            await response.json();


          if (!result.ok) {
            throw new Error(
              result.error ||
              "Unable to submit RSVP."
            );
          }


          if (formNote) {

            const attendance =
              payload.attendance || "";

            if (
              attendance
                .toLowerCase()
                .includes("yes")
            ) {

              formNote.textContent =
                "🎉 KNEW IT. SEE YOU AT #ABSON.";

            } else {

              formNote.textContent =
                "😭 This is deeply disappointing.";

            }

          }


          rsvpForm.reset();

          createAbsonConfetti();

        } catch (error) {

          console.error(error);

          if (formNote) {

            formNote.textContent =
              "Something went wrong. Please try again.";

          }

        } finally {

          if (button) {

            button.disabled = false;

            button.textContent =
              "LOCK IN MY RSVP ✦";

          }

        }

      }
    );

  }


  /* ---------------------------------------------------------
     GUEST PHOTO / VIDEO UPLOAD
     --------------------------------------------------------- */

  const guestForm =
    document.getElementById(
      "guestUploadForm"
    );

  const guestFiles =
    document.getElementById(
      "guestFiles"
    );

  const guestName =
    document.getElementById(
      "guestName"
    );

  const uploadPreview =
    document.getElementById(
      "uploadPreview"
    );

  const uploadStatus =
    document.getElementById(
      "uploadStatus"
    );


  if (guestFiles) {

    guestFiles.addEventListener(
      "change",
      function () {

        if (!uploadPreview) return;

        uploadPreview.innerHTML = "";

        Array.from(
          guestFiles.files || []
        ).forEach(function (file) {

          const pill =
            document.createElement("div");

          pill.className =
            "file-pill";

          pill.textContent =
            file.name;

          uploadPreview.appendChild(
            pill
          );

        });

      }
    );

  }


  if (guestForm) {

    guestForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        const files =
          Array.from(
            guestFiles
              ? guestFiles.files || []
              : []
          );


        if (!files.length) {

          if (uploadStatus) {

            uploadStatus.textContent =
              "Please choose at least one photo or video.";

          }

          return;

        }


        const button =
          guestForm.querySelector(
            ".upload-button"
          );


        if (button) {

          button.disabled = true;

          button.textContent =
            "UPLOADING...";

        }


        if (uploadStatus) {

          uploadStatus.textContent =
            "Sending your evidence to #ABSON...";

        }


        try {

          for (const file of files) {

            const base64 =
              await readFileAsBase64(
                file
              );


            const payload = {

              action:
                "uploadGuestFile",

              guestName:
                guestName
                  ? guestName.value
                  : "",

              fileName:
                file.name,

              mimeType:
                file.type,

              base64:
                base64

            };


            const response =
              await fetch(
                API_URL,
                {
                  method: "POST",
                  body:
                    JSON.stringify(
                      payload
                    )
                }
              );


            const result =
              await response.json();


            if (!result.ok) {

              throw new Error(
                result.error ||
                "Upload failed."
              );

            }

          }


          if (uploadStatus) {

            uploadStatus.textContent =
              "🎉 Evidence received. #ABSON thanks you.";

          }


          guestForm.reset();

          if (uploadPreview) {
            uploadPreview.innerHTML = "";
          }

          createAbsonConfetti();


        } catch (error) {

          console.error(error);

          if (uploadStatus) {

            uploadStatus.textContent =
              "Upload failed. Please try again.";

          }

        } finally {

          if (button) {

            button.disabled = false;

            button.textContent =
              "SEND TO #ABSON →";

          }

        }

      }
    );

  }


  function readFileAsBase64(file) {

    return new Promise(
      function (resolve, reject) {

        const reader =
          new FileReader();

        reader.onload =
          function () {

            resolve(
              reader.result
            );

          };

        reader.onerror =
          reject;

        reader.readAsDataURL(file);

      }
    );

  }

});

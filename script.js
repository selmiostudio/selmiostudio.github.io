/* =========================================================
   SELMIO — WEDDING INVITATION
   COMPLETE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01 — OPENING INVITATION
  ======================================================= */

  const opening =
    document.getElementById("opening");

  const openingTrigger =
    document.getElementById("openingTrigger");

  let invitationOpened = false;


  /* =======================================================
     01A — BACKGROUND MUSIC
  ======================================================= */

 const weddingMusic =
  new Audio("audio/wedding-music.mp3.mp3");

  weddingMusic.loop = true;
  weddingMusic.volume = 0.45;
  weddingMusic.preload = "auto"; 
   /* Music control button */

const musicButton =
  document.createElement("button");

musicButton.className = "music-toggle";
musicButton.type = "button";
musicButton.setAttribute(
  "aria-label",
  "Pause music"
);

musicButton.innerHTML = `
  <span class="music-toggle__icon">♪</span>
`;

document.body.appendChild(musicButton);


function updateMusicButton() {

  if (weddingMusic.paused) {

    musicButton.classList.remove("is-playing");

    musicButton.setAttribute(
      "aria-label",
      "Play music"
    );

  } else {

    musicButton.classList.add("is-playing");

    musicButton.setAttribute(
      "aria-label",
      "Pause music"
    );

  }

}


musicButton.addEventListener(
  "click",
  () => {

    if (weddingMusic.paused) {

      weddingMusic
        .play()
        .then(updateMusicButton)
        .catch(() => {});

    } else {

      weddingMusic.pause();

      updateMusicButton();

    }

  }
);


weddingMusic.addEventListener(
  "play",
  updateMusicButton
);

weddingMusic.addEventListener(
  "pause",
  updateMusicButton
);


  function startWeddingMusic() {

    weddingMusic
      .play()
      .catch((error) => {

        console.log(
          "Music playback was prevented:",
          error
        );

      });

  }


  function openInvitation() {

    if (
      invitationOpened ||
      !opening
    ) {
      return;
    }


    invitationOpened = true;


    /* Start music directly from the guest's click */
    startWeddingMusic();


    opening.classList.add("is-opening");


    setTimeout(() => {

      opening.classList.add("is-hidden");

      document.body.classList.remove("is-locked");

    }, 850);


    setTimeout(() => {

      opening.style.display = "none";

    }, 1900);

  }


  if (openingTrigger) {

    openingTrigger.addEventListener(
      "click",
      openInvitation
    );

  }



  /* =======================================================
     02 — COUNTDOWN
  ======================================================= */

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  const weddingDate =
    new Date("2027-05-24T17:00:00+02:00");


  function updateCountdown() {

    if (
      !daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement
    ) {
      return;
    }


    const now = new Date();

    const difference =
      weddingDate.getTime() -
      now.getTime();


    if (difference <= 0) {

      daysElement.textContent = "000";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      return;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (
          difference %
          (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
      );


    const minutes =
      Math.floor(
        (
          difference %
          (1000 * 60 * 60)
        ) /
        (1000 * 60)
      );


    const seconds =
      Math.floor(
        (
          difference %
          (1000 * 60)
        ) /
        1000
      );


    daysElement.textContent =
      String(days).padStart(3, "0");

    hoursElement.textContent =
      String(hours).padStart(2, "0");

    minutesElement.textContent =
      String(minutes).padStart(2, "0");

    secondsElement.textContent =
      String(seconds).padStart(2, "0");

  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );



  /* =======================================================
     03 — MOBILE GALLERY
  ======================================================= */

  const galleryGrid =
    document.getElementById("galleryGrid");

  const galleryPrev =
    document.getElementById("galleryPrev");

  const galleryNext =
    document.getElementById("galleryNext");

  const galleryCounter =
    document.getElementById("galleryCounter");


  const galleryItems =
    galleryGrid
      ? Array.from(
          galleryGrid.querySelectorAll(
            ".gallery__item"
          )
        )
      : [];


  let currentGalleryItem = 0;


  function updateGalleryCounter() {

    if (
      !galleryCounter ||
      !galleryItems.length
    ) {
      return;
    }


    galleryCounter.textContent =
      `${currentGalleryItem + 1} / ${galleryItems.length}`;

  }


  function scrollToGalleryItem(index) {

    if (!galleryItems.length) {
      return;
    }


    if (index < 0) {
      index = galleryItems.length - 1;
    }


    if (index >= galleryItems.length) {
      index = 0;
    }


    currentGalleryItem = index;


    galleryItems[currentGalleryItem]
      .scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });


    updateGalleryCounter();

  }


  if (galleryPrev) {

    galleryPrev.addEventListener(
      "click",
      () => {

        scrollToGalleryItem(
          currentGalleryItem - 1
        );

      }
    );

  }


  if (galleryNext) {

    galleryNext.addEventListener(
      "click",
      () => {

        scrollToGalleryItem(
          currentGalleryItem + 1
        );

      }
    );

  }


  if (galleryGrid && galleryItems.length) {

    let galleryScrollTimer;


    galleryGrid.addEventListener(
      "scroll",
      () => {

        clearTimeout(galleryScrollTimer);


        galleryScrollTimer =
          setTimeout(() => {

            const gridCenter =
              galleryGrid.scrollLeft +
              galleryGrid.clientWidth / 2;


            let closestIndex = 0;
            let closestDistance = Infinity;


            galleryItems.forEach(
              (item, index) => {

                const itemCenter =
                  item.offsetLeft +
                  item.offsetWidth / 2;


                const distance =
                  Math.abs(
                    gridCenter -
                    itemCenter
                  );


                if (
                  distance <
                  closestDistance
                ) {

                  closestDistance =
                    distance;

                  closestIndex =
                    index;

                }

              }
            );


            currentGalleryItem =
              closestIndex;

            updateGalleryCounter();

          }, 100);

      },
      {
        passive: true
      }
    );

  }


  updateGalleryCounter();



  /* =======================================================
     04 — RSVP ATTENDANCE
  ======================================================= */

  const attendanceOptions =
    document.querySelectorAll(
      'input[name="attendance"]'
    );

  const guestDetails =
    document.getElementById(
      "guestDetails"
    );

  const guestCount =
    document.getElementById(
      "guestCount"
    );

  const companionNames =
    document.getElementById(
      "companionNames"
    );


  attendanceOptions.forEach(
    (option) => {

      option.addEventListener(
        "change",
        () => {

          if (!guestDetails) {
            return;
          }


          if (option.value === "yes") {

            guestDetails.classList.add(
              "is-visible"
            );

          } else {

            guestDetails.classList.remove(
              "is-visible"
            );


            if (guestCount) {
              guestCount.value = "1";
            }


            if (companionNames) {
              companionNames.value = "";
            }

          }

        }
      );

    }
  );



  /* =======================================================
     05 — RSVP FORM
     PORTFOLIO DEMO MODE
  ======================================================= */

  const rsvpForm =
    document.getElementById("rsvpForm");

  const rsvpStatus =
    document.getElementById("rsvpStatus");


  if (rsvpForm) {

    rsvpForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const guestNameInput =
          document.getElementById(
            "guestName"
          );


        const guestMessageInput =
          document.getElementById(
            "guestMessage"
          );


        const guestName =
          guestNameInput
            ? guestNameInput.value.trim()
            : "";


        const attendance =
          document.querySelector(
            'input[name="attendance"]:checked'
          );


        const guestMessage =
          guestMessageInput
            ? guestMessageInput.value.trim()
            : "";


        if (
          !guestName ||
          !attendance
        ) {

          if (rsvpStatus) {

            rsvpStatus.textContent =
              "Please complete the required fields.";

          }

          return;

        }


        const rsvpData = {

          name:
            guestName,

          attendance:
            attendance.value,

          guestCount:
            attendance.value === "yes" &&
            guestCount
              ? Number(guestCount.value)
              : 0,

          companions:
            attendance.value === "yes" &&
            companionNames
              ? companionNames.value.trim()
              : "",

          message:
            guestMessage,

          submittedAt:
            new Date().toISOString()

        };


        console.log(
          "RSVP DEMO:",
          rsvpData
        );


        if (rsvpStatus) {

          if (
            attendance.value === "yes"
          ) {

            rsvpStatus.textContent =
              `Thank you, ${guestName}. We can't wait to celebrate with you!`;

          } else {

            rsvpStatus.textContent =
              `Thank you for letting us know, ${guestName}. You will be missed!`;

          }

        }


        const submitButton =
          rsvpForm.querySelector(
            ".rsvp-form__submit"
          );


        if (submitButton) {

          submitButton.textContent =
            "RSVP RECEIVED";

          submitButton.disabled =
            true;

          submitButton.style.opacity =
            "0.65";

        }

      }
    );

  }



  /* =======================================================
     06 — SMOOTH INTERNAL LINKS
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );

});

/* =========================================================
   SELMIO — WEDDING INVITATION
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01 — OPENING ENVELOPE
  ======================================================= */

  const opening = document.getElementById("opening");
  const envelope = document.getElementById("envelope");

  let invitationOpened = false;


  function openInvitation() {

    if (invitationOpened) return;

    invitationOpened = true;

    // Open envelope
    envelope.classList.add("is-open");


    // After the card comes out,
    // fade away the opening screen
    setTimeout(() => {

      opening.classList.add("is-hidden");

      document.body.classList.remove("locked");

    }, 1900);


    // Remove opening screen after animation
    setTimeout(() => {

      opening.style.display = "none";

    }, 3000);

  }


  envelope.addEventListener(
    "click",
    openInvitation
  );


  envelope.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openInvitation();

      }

    }
  );



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


  /*
    Wedding date:
    24 May 2027 at 17:00
    Lake Como local time
  */

  const weddingDate =
    new Date("2027-05-24T17:00:00+02:00");


  function updateCountdown() {

    const now = new Date();

    let difference =
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
          galleryGrid.querySelectorAll("figure")
        )
      : [];


  let currentGalleryItem = 0;


  function updateGalleryCounter() {

    if (!galleryCounter) return;

    galleryCounter.textContent =
      `${currentGalleryItem + 1} / ${galleryItems.length}`;

  }


  function scrollToGalleryItem(index) {

    if (!galleryItems.length) return;


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


  updateGalleryCounter();



  /* =======================================================
     04 — RSVP ATTENDANCE
  ======================================================= */

  const attendanceOptions =
    document.querySelectorAll(
      'input[name="attendance"]'
    );

  const guestDetails =
    document.getElementById("guestDetails");

  const guestCount =
    document.getElementById("guestCount");

  const companionNames =
    document.getElementById("companionNames");


  attendanceOptions.forEach(
    (option) => {

      option.addEventListener(
        "change",
        () => {

          if (option.value === "yes") {

            guestDetails.classList.add(
              "is-visible"
            );

          } else {

            guestDetails.classList.remove(
              "is-visible"
            );

            guestCount.value = "1";
            companionNames.value = "";

          }

        }
      );

    }
  );



  /* =======================================================
     05 — RSVP FORM
     DEMO MODE
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


        const guestName =
          document
            .getElementById("guestName")
            .value
            .trim();


        const attendance =
          document.querySelector(
            'input[name="attendance"]:checked'
          );


        const guestMessage =
          document
            .getElementById("guestMessage")
            .value
            .trim();


        if (!guestName || !attendance) {

          rsvpStatus.textContent =
            "Please complete the required fields.";

          return;

        }


        /*
          IMPORTANT

          At the moment this is DEMO MODE.

          The information is collected here,
          but it is NOT yet sent to our online
          database.

          Later we will connect this section
          to the RSVP database.
        */


        const rsvpData = {

          name: guestName,

          attendance:
            attendance.value,

          guestCount:
            attendance.value === "yes"
              ? Number(guestCount.value)
              : 0,

          companions:
            attendance.value === "yes"
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


        if (attendance.value === "yes") {

          rsvpStatus.textContent =
            `Thank you, ${guestName}. We can't wait to celebrate with you!`;

        } else {

          rsvpStatus.textContent =
            `Thank you for letting us know, ${guestName}. You will be missed!`;

        }


        const submitButton =
          rsvpForm.querySelector(
            ".rsvp-form__submit"
          );


        submitButton.textContent =
          "RSVP RECEIVED";

        submitButton.disabled = true;

        submitButton.style.opacity = "0.7";

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


          if (!target) return;


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

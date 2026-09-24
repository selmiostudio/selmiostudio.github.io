/* =========================================================
   SELMIO — Wedding Invitation
   Amelia & Oliver
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     Smooth reveal
  ------------------------- */

  const revealItems = document.querySelectorAll(
    ".hero__intro, .hero__title, .hero__date, .hero__composition, .hero__bottom, .invitation__inner"
  );

  revealItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(25px)";

    setTimeout(() => {
      item.style.transition =
        "opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)";

      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 180 + index * 160);
  });


  /* -------------------------
     Invitation reveal
  ------------------------- */

  const invitation = document.querySelector(
    ".invitation__inner"
  );

  if (invitation) {

    invitation.style.opacity = "0";
    invitation.style.transform = "translateY(35px)";

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            invitation.style.transition =
              "opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)";

            invitation.style.opacity = "1";
            invitation.style.transform = "translateY(0)";

            observer.unobserve(invitation);
          }

        });

      },
      {
        threshold: 0.2
      }
    );

    observer.observe(invitation);
  }


  /* -------------------------
     Subtle photo movement
  ------------------------- */

  const photo = document.querySelector(
    ".hero__photo img"
  );

  window.addEventListener(
    "scroll",
    () => {

      if (!photo) return;

      const scrollPosition =
        window.scrollY;

      const movement =
        Math.min(
          scrollPosition * 0.018,
          10
        );

      photo.style.transform =
        `scale(1.035) translateY(${movement}px)`;
    },
    {
      passive: true
    }
  );

});

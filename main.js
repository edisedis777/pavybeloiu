document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile menu toggle functionality ---
  const menuToggle = document.querySelector(".menu-toggle");
  const sidePanel = document.querySelector(".side-panel");

  if (menuToggle && sidePanel) {
    menuToggle.addEventListener("click", function () {
      sidePanel.classList.toggle("active");
      const expanded = sidePanel.classList.contains("active");
      this.setAttribute("aria-expanded", expanded);
      document.body.classList.toggle("menu-open", expanded);
    });
  }

  // --- Close mobile menu when clicking outside or a link ---
  document.addEventListener("click", function (event) {
    if (
      window.innerWidth <= 768 &&
      sidePanel &&
      sidePanel.classList.contains("active")
    ) {
      const isClickInsideSidePanel = sidePanel.contains(event.target);
      // Ensure menuToggle exists before trying to check if it contains the event.target
      const isClickOnMenuToggle =
        menuToggle && menuToggle.contains(event.target);
      const isClickOnNavLink = event.target.closest(".side-panel nav a");

      if (!isClickInsideSidePanel && !isClickOnMenuToggle) {
        sidePanel.classList.remove("active");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      } else if (isClickOnNavLink) {
        // Also close if a nav link inside the panel is clicked
        sidePanel.classList.remove("active");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    }
  });

  // --- Active navigation link highlighting ---
  const navLinks = document.querySelectorAll(".side-panel nav ul li a");
  // Normalize current path: /index.html becomes / for easier comparison
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

  let activeLinkSet = false;
  navLinks.forEach((link) => {
    link.classList.remove("active");
    // Get the pathname from the link's href (fully resolved), also normalizing index.html
    const linkPath = new URL(link.href).pathname.replace(/\/index\.html$/, "/");

    if (linkPath === currentPath) {
      link.classList.add("active");
      activeLinkSet = true;
    }
  });

  // If on a sub-page of "Writings" (e.g., /writings/conics.html) and no direct link was active,
  // highlight the main "Writings" navigation link.
  if (!activeLinkSet && window.location.pathname.startsWith("/writings/")) {
    navLinks.forEach((link) => {
      const linkPathForWritings = new URL(link.href).pathname;
      // Check if this link points to the main writings.html page
      if (linkPathForWritings.endsWith("/writings.html")) {
        link.classList.add("active");
      }
    });
  }

  // --- Image Magnification Modal Functionality ---
  // (Only run if modal elements are present on the current page)
  const modal = document.getElementById("imageModal");
  if (modal) {
    // Check if the modal container exists on the current page
    const modalImg = document.getElementById("magnifiedImage");
    const magnifiableImages = document.querySelectorAll(".magnifiable");
    // Query for close button within the modal context
    const closeModalSpan = modal.querySelector(".close-modal");

    if (modalImg && closeModalSpan) {
      // Ensure inner modal elements also exist
      magnifiableImages.forEach((img) => {
        img.onclick = function () {
          modal.style.display = "block";
          modalImg.src = this.src;
          modalImg.alt = this.alt;
        };
      });

      closeModalSpan.onclick = function () {
        modal.style.display = "none";
      };

      // Close modal if user clicks anywhere outside the image content
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  }
});

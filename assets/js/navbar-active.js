
    document.addEventListener("DOMContentLoaded", function () {
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".JVVZ__navbar .nav-link");

      function onScroll() {
        let scrollPos = window.scrollY + 150;

        sections.forEach((section) => {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          const id = section.getAttribute("id");

          if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              }
            });
          }
        });
      }

      window.addEventListener("scroll", onScroll);
      onScroll();
    });
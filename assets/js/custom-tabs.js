
  (function () {
    const tabbed = document.querySelector(".tabbed");
    const tablist = tabbed.querySelector("ul");
    const tabs = tablist.querySelectorAll("a");
    const panels = tabbed.querySelectorAll('[data-tab]');

    const switchTab = (oldTab, newTab) => {
      newTab.focus();
      newTab.removeAttribute("tabindex");
      newTab.setAttribute("aria-selected", "true");
      oldTab.removeAttribute("aria-selected");
      oldTab.setAttribute("tabindex", "-1");

      let index = Array.prototype.indexOf.call(tabs, newTab);
      let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
      panels[oldIndex].hidden = true;
      panels[index].hidden = false;
    };

    tablist.setAttribute("role", "tablist");

    tabs.forEach((tab, i) => {
      tab.setAttribute("role", "tab");
      tab.setAttribute("id", "tab" + (i + 1));
      tab.setAttribute("tabindex", "-1");
      tab.parentNode.setAttribute("role", "presentation");

      tab.addEventListener("click", (e) => {
        e.preventDefault();
        const currentTab = tablist.querySelector("[aria-selected]");
        if (e.currentTarget !== currentTab) {
          switchTab(currentTab, e.currentTarget);
        }
      });

      tab.addEventListener("keydown", (e) => {
        const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
        const dir = e.which === 37 ? index - 1
                  : e.which === 39 ? index + 1
                  : e.which === 40 ? "down"
                  : null;

        if (dir !== null) {
          e.preventDefault();
          dir === "down"
            ? panels[i].focus()
            : tabs[dir]
              ? switchTab(e.currentTarget, tabs[dir])
              : void 0;
        }
      });
    });

    panels.forEach((panel, i) => {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("tabindex", "-1");
      panel.setAttribute("aria-labelledby", tabs[i].id);
      panel.hidden = true;
    });

    tabs[0].removeAttribute("tabindex");
    tabs[0].setAttribute("aria-selected", "true");
    panels[0].hidden = false;

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      let activeId = null;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          if (id && id.startsWith("section")) continue;

          activeId = id;
        }
      }

      if (activeId) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
      }
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  })();
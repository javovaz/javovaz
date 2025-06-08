
    document.addEventListener("DOMContentLoaded", () => {
      const darkSwitch = document.getElementById("dark-mode");
      const body = document.body;
      const html = document.documentElement;
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

      // Aplica la preferencia del sistema
      function applySystemPreference() {
        if (prefersDarkMode.matches) {
          body.classList.add("dark-mode");
          html.classList.add("dark-mode");
        } else {
          body.classList.remove("dark-mode");
          html.classList.remove("dark-mode");
        }
        toggleIcons();
      }

      // Cambia entre modo claro/oscuro sin guardar estado
      function toggleDarkMode() {
        body.classList.toggle("dark-mode");
        html.classList.toggle("dark-mode");
        toggleIcons();
      }

      // Alterna los íconos de sol y luna
      function toggleIcons() {
        const isDark = document.body.classList.contains("dark-mode");

        document.querySelector(".switch-light").classList.toggle("hidden", isDark);
        document.querySelector(".switch-dark").classList.toggle("hidden", !isDark);
      }

      // Aplica la preferencia del sistema al cargar
      applySystemPreference();

      // Reacciona a cambios en la configuración del sistema
      prefersDarkMode.addEventListener("change", applySystemPreference);

      // Evento de click en el botón
      darkSwitch.addEventListener("click", toggleDarkMode);
    });
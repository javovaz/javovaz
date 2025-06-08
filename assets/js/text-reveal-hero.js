
    document.addEventListener("DOMContentLoaded", () => {
      const textReveal = document.querySelector(".text-reveal-hero");
      const cta = document.querySelector(".hero-CTA-header");
      const lineBefore = document.querySelector(".line-before");
      
      if (lineBefore) {
        void lineBefore.offsetWidth;
      }
      
      document.body.classList.add("loaded");
      
      setTimeout(() => {
        document.body.classList.add("animate-line");
      }, 50);
      
      if (textReveal) {
        setTimeout(() => {
          textReveal.classList.add("revealed");
        }, 500);
      }
      
      if (cta) {
        setTimeout(() => {
          cta.classList.add("visible");
        }, 900);
      }
    });
    
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        document.body.classList.remove("loaded", "animate-line");
        const textReveal = document.querySelector(".text-reveal-hero");
        const cta = document.querySelector(".hero-CTA-header");

        if (textReveal) textReveal.classList.remove("revealed");
        if (cta) cta.classList.remove("visible");
      }
    });
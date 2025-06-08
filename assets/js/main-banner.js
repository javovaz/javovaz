
document.addEventListener("DOMContentLoaded", () => {
    const textReveal = document.querySelector(".text-reveal-hero");
    const cta = document.querySelector(".hero-CTA-header");
    const lineBefore = document.querySelector(".line-before");

    // 1. Forzar reflow de la línea
    if (lineBefore) {
        void lineBefore.offsetWidth;
    }

    // 2. Agregar la clase que dispara todo lo demás
    document.body.classList.add("loaded");

    // 3. Activar animación de línea
    setTimeout(() => {
        document.body.classList.add("animate-line");
    }, 50);

    // 4. Animar texto principal
    if (textReveal) {
        setTimeout(() => {
            textReveal.classList.add("revealed");
        }, 500);
    }

    // 5. Mostrar CTA
    if (cta) {
        setTimeout(() => {
            cta.classList.add("visible");
        }, 900);
    }
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        // Borrar clases que activan animaciones
        document.body.classList.remove("loaded", "animate-line");
        const textReveal = document.querySelector(".text-reveal-hero");
        const cta = document.querySelector(".hero-CTA-header");

        if (textReveal) textReveal.classList.remove("revealed");
        if (cta) cta.classList.remove("visible");
    }
});
document.querySelectorAll("code, pre, .code-block").forEach((block) => {
  block.innerHTML = block.innerHTML.replace(/(--[\w-]+)/g, (match) => {
    const type = match.includes("color")
      ? "color"
      : match.includes("font")
      ? "font"
      : match.includes("shadow")
      ? "shadow"
      : match.includes("size")
      ? "size"
      : "token";
    return `<span data-token-type="${type}">${match}</span>`;
  });
});

document.querySelectorAll("code, pre, .code-block").forEach((block) => {
  block.innerHTML = block.innerHTML.replace(
    /(--color-[\w-]+)/g,
    (match) => `
      <span class="token-color">
        <span class="swatch" style="background-color: var(${match});"></span>
        ${match}
      </span>`
  );
});

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function updateColorTokens() {
  document.querySelectorAll(".token-meta").forEach((meta) => {
    const hexEl = [...meta.querySelectorAll("em")].find((el) =>
      el.textContent.includes("HEX: #")
    );
    if (!hexEl) return;

    const hex = hexEl.textContent.match(/#([A-Fa-f0-9]{6})/)?.[0];
    if (!hex) return;

    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);

    const rgbText = `RGB: ${r}, ${g}, ${b}`;
    const hslText = `HSL: hsl(${h}, ${s}%, ${l}%)`;

    // Reemplaza o actualiza los elementos correspondientes
    const rgbEl = [...meta.querySelectorAll("em")].find((el) =>
      el.textContent.startsWith("RGB:")
    );
    const hslEl = [...meta.querySelectorAll("em")].find((el) =>
      el.textContent.startsWith("HSL:")
    );

    if (rgbEl) {
      rgbEl.textContent = rgbText;
    } else {
      const em = document.createElement("em");
      em.textContent = rgbText;
      meta.appendChild(em);
    }

    if (hslEl) {
      hslEl.textContent = hslText;
    } else {
      const em = document.createElement("em");
      em.textContent = hslText;
      meta.appendChild(em);
    }
  });
}

document.addEventListener("DOMContentLoaded", updateColorTokens);

const cursor = (function() {
  "use strict";

  const tooltip = document.querySelector(".again-tooltip");
  const offset = 20;

  const tooltipEH = (e) => {
    tooltip.style.setProperty("left", `${e.pageX + offset}px`);
    tooltip.style.setProperty("top", `${e.pageY + offset}px`);
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("mousemove", tooltipEH);
  });
})();
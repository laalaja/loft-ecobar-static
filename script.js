(() => {
  const selector = ".button, .actionCard, .mobileDock a";
  let resetTimer;

  const resetButtons = () => {
    if (resetTimer) {
      window.clearTimeout(resetTimer);
      resetTimer = undefined;
    }

    document.documentElement.classList.remove("hasActiveButton");
    document
      .querySelectorAll(".isActiveButton")
      .forEach((button) => button.classList.remove("isActiveButton"));
  };

  const activateButton = (event) => {
    const target = event.target.closest(selector);

    if (!target) return;

    resetButtons();
    document.documentElement.classList.add("hasActiveButton");
    target.classList.add("isActiveButton");
    resetTimer = window.setTimeout(resetButtons, 900);
  };

  document.addEventListener("click", activateButton);
  window.addEventListener("pageshow", resetButtons);
  window.addEventListener("focus", resetButtons);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") resetButtons();
  });

  resetButtons();
})();

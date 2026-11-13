(() => {
  const link = document.querySelector("[data-menu-download]");
  const status = document.querySelector("[data-download-status]");
  const message = status.querySelector("span");
  const isAppleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (!isAppleMobile || !navigator.share || !navigator.canShare) return;

  const probe = new File([""], "loft-menu.pdf", { type: "application/pdf" });
  if (!navigator.canShare({ files: [probe] })) return;

  let menuFile;
  let loading;
  let sharing = false;

  const showMessage = (text) => {
    message.textContent = text;
    status.hidden = false;
  };

  const prepareFile = () => {
    if (loading) return;
    loading = fetch(link.href)
      .then((response) => {
        if (!response.ok) throw new Error("PDF unavailable");
        return response.blob();
      })
      .then((blob) => {
        menuFile = new File([blob], "loft-menu.pdf", { type: "application/pdf" });
      })
      .catch(() => {
        showMessage("Не удалось загрузить меню. Повторите скачивание или откройте PDF.");
      })
      .finally(() => {
        loading = undefined;
      });
  };

  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (sharing) return;

    if (!menuFile) {
      showMessage("Готовим PDF. Через несколько секунд нажмите стрелку скачивания ещё раз.");
      prepareFile();
      return;
    }

    status.hidden = true;
    sharing = true;
    // Open sharing during the tap, using the file prepared in advance.
    navigator.share({ files: [menuFile], title: "Меню ЛОФТ эко-бар" })
      .catch((error) => {
        if (error.name !== "AbortError") {
          showMessage("Не удалось открыть сохранение. Попробуйте ещё раз или откройте PDF.");
        }
      })
      .finally(() => {
        sharing = false;
      });
  });

  prepareFile();
})();

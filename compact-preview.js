(() => {
  document.documentElement.classList.add('compact-preview');
  const bar = document.querySelector('.compactBar');
  const hero = document.querySelector('.heroActions');
  const update = () => {
    const visible = hero.getBoundingClientRect().bottom <= 0;
    bar.classList.toggle('is-visible', visible);
    bar.inert = !visible;
    bar.setAttribute('aria-hidden', String(!visible));
  };
  bar.hidden = false;
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

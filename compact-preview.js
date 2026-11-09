(() => {
  document.documentElement.classList.add('compact-preview');
  const bar = document.querySelector('.compactBar');
  const hero = document.querySelector('.heroActions');
  const update = () => { bar.hidden = hero.getBoundingClientRect().bottom > 0; };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

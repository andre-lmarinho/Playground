window.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.js-hover-move');
  if (!els.length) return;

  els.forEach(el => {
    el.style.transition = 'transform 0.2s ease-out';
    el.style.transformOrigin = 'center center';

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const moveX = px * 20;
      const moveY = py * 20;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    });
  });
});
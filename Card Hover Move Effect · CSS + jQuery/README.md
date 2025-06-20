# Hover Move Effect · JavaScript Snippet

This script adds a subtle **mouse-based hover animation** to elements, making them shift position slightly in response to cursor movement — perfect for adding interactivity to call-to-action sections, cards, or buttons.

---

## ✅ What It Does

- Selects all elements with the class `.js-hover-move`.
- When hovered, each element:
  - Moves slightly in the direction of the cursor.
  - Returns smoothly to its original position when the mouse leaves.

---

## 💡 How It Works

```javascript
el.addEventListener('mousemove', e => {
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  const moveX = px * 20;
  const moveY = py * 20;
  el.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

# Multi-Content Toggle (MTC) · CSS + jQuery

This snippet enables a simple toggle system where clicking different buttons shows or hides specific content blocks — ideal for Divi-based layouts using custom classes like `.mtc_element_X` and `.mtc_button_X`.

---

## ✅ What It Does

- Hides all toggleable elements by default (outside the Visual Builder).
- Clicking one of the `.mtc_button_X` buttons:
  - Reveals the matching `.mtc_element_X` section.
  - Hides all other content blocks immediately (no transition).
  - Applies visual styles to the active button.

---

## 🧩 Class Naming Structure

- `.mtc_button_1` → toggles `.mtc_element_1`
- `.mtc_button_2` → toggles `.mtc_element_2`
- ...
- `.mtc_button_5` → toggles `.mtc_element_5`

### Helper Classes:
- `.mtc_button_opened` and `.mtc_button_closed` control button styles (active/inactive).
- Elements are **hidden by default** using `display: none`, except within Divi Builder (`.et-fb`).

---

## 💡 How to Use

1. **Add the HTML structure** in your Divi layout:
   ```html
   <div class="mtc_button_1 mtc_button">Tab 1</div>
   <div class="mtc_button_2 mtc_button">Tab 2</div>
   ...
   <div class="mtc_element_1">Content for Tab 1</div>
   <div class="mtc_element_2">Content for Tab 2</div>
   ...


2. Paste the CSS in:
Appearance → Customize → Additional CSS

3. Add the JS script in the footer using Divi's theme options, or enqueue via child theme:
<script src="mtc-toggle.js"></script>

4. Ensure jQuery is loaded, which Divi includes by default.


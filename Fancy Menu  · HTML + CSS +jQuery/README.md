## Mobile Menu Toggle – jQuery + CSS

Custom implementation of a **slide-in mobile menu** using jQuery and CSS transitions. Built for WordPress (Divi), this script ensures:
- Smooth hamburger menu toggle animation
- Push-in effect for the slide-in menu container
- Dynamic header spacing calculation to avoid layout overlap

### 🧠 Features
- jQuery-based toggle for menu open/close
- Animated hamburger icon (transform to X)
- Responsive layout fix by dynamically adjusting padding-top
- CSS transitions for smooth UX

### ⚙️ How to Implement

1. **Insert the HTML** into a Text Module:

    ```html
    <span class="line line-1"></span>
    <span class="line line-2"></span>
    <span class="line line-3"></span>
    ```

2. **Create a `<div>`** and apply the following CSS class:

    ```
    slide-in-menu-container
    ```

    *(You can place your menu content inside this `<div>`.)*


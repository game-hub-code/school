# Mount St. Patrick Academy — Website

Static multi-page HTML/CSS/jQuery website for Mount St. Patrick Academy.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero banner/slider, school highlights, links into the other pages. |
| `mount-st-patrick-academy.html` | "About Us" page. |
| `from-the-principal.html` | Principal's welcome message page. |
| `patrician-brothers.html` | Page about the Patrician Brothers (the order/founding body). |
| `working-hours.html` | School working hours / enquiry-contact page (linked from the "Enquire Now" nav button). |

## CSS (`css/`)

| File | Purpose |
|---|---|
| `style.css` | Main site stylesheet — layout, header/nav, sections, typography, colors. |
| `responsive.css` | Media-query overrides for tablet/mobile breakpoints. |
| `slider.css` | Styling specific to the Slick fullscreen slider. |
| `animate.css` | Third-party library (Animate.css) — CSS keyframe animation classes (fade/slide/bounce etc.) used for scroll-in effects. |
| `font-awesome.css` / `font-awesome.min.css` | Font Awesome icon font library (unminified + minified). |
| `owl.carousel.min.css` / `owl.theme.default.min.css` | Third-party library (Owl Carousel) core + default theme styles, used for the banner carousel. |
| `slick.min.css` | Third-party library (Slick Slider) core styles. |
| `simplelightbox.min.css` | Third-party library (SimpleLightbox) styles for image lightbox popups. |

## JavaScript (`js/`)

| File | Purpose |
|---|---|
| `script.js` | Site-specific glue code: dynamically loads `device.min.js` and `jquery.easing.js`, toggles a header "shrink" class on scroll, and initializes the Owl Carousel banner on page load. |
| `menu.js` | Site-specific nav behavior: toggles dropdown submenus, closes menus on outside click, and toggles the mobile hamburger (`#nav-toggle`) menu open/close. |
| `slider.js` | Site-specific wrapper that initializes and configures the Slick fullscreen slider (autoplay speed, transition speed, thumbnail sync). |
| `jquery.js` | Third-party library — jQuery core. |
| `jquery.easing.js` | Third-party plugin — additional jQuery animation easing functions. |
| `owl.carousel.js` | Third-party library — Owl Carousel (used for the homepage banner). |
| `slick.min.js` | Third-party library — Slick Slider (minified). |
| `simple-lightbox.js` | Third-party library — SimpleLightbox image popup viewer. |
| `wow.js` | Third-party library — WOW.js, triggers Animate.css classes when elements scroll into view. |
| `device.min.js` | Third-party library — device/browser detection (used to add device-specific classes to `<html>` or `<body>`). |

## Assets

| Folder | Purpose |
|---|---|
| `images/` | All site imagery: campus/facility photos (classrooms, computer lab, library, sports facilities, etc.), event photos (Independence Day, Inter-House Dance, Investiture Ceremony, Red Colour Day), portal/admissions screenshots, homepage slider images (`Slide1–4.jpg`), the school logo, staff photo, and small UI SVGs (carousel arrows, Academics icon). Several `.png` files alongside same-named `.jpg` files appear to be duplicate/alternate-format or thumbnail versions of the same photos. |
| `fonts/` | `fontawesome-webfont.woff2` — the Font Awesome icon webfont referenced by `font-awesome.css`. |

## Tech stack summary

- Plain HTML/CSS, no build step or framework.
- jQuery-based interactivity.
- Third-party libraries: jQuery, Owl Carousel, Slick Slider, SimpleLightbox, WOW.js, Animate.css, Font Awesome, device.js.
- Custom logic limited to three small files: `script.js`, `menu.js`, `slider.js`.

## Notes / things to verify

- [UNKNOWN] Whether the `.png` duplicates in `images/` (e.g. `Class-Rooms.png` next to `Class-Rooms.jpg`) are actively referenced anywhere or are leftover/unused assets — not confirmed from file listing alone.
- [UNKNOWN] License terms for the bundled third-party libraries were not inspected in this pass; check each library's own header/license file before redistributing.
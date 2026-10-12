# Mara Ellis · Editorial Minimal Portfolio

A calm editorial portfolio template for designers and writers. Warm paper background, ink text, one burnt orange accent. Magazine style grid with generous whitespace.

## Features

1. Sticky nav with mobile hamburger menu and smooth scroll
2. Hero with large serif type, portrait placeholder, availability badge and CTAs
3. Selected Work grid with 6 CSS only cards and working category filter
4. About plus Services plus rotating testimonial
5. Contact form with inline validation plus footer

## How to Run

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## How to Customize

Colors: open `styles.css` and edit the `:root` block at the top:

```css
--paper: #FAF9F6;
--ink: #1A1815;
--accent: #E85D2A;
```

Text: open `index.html` and replace the name, hero headline, project cards, about copy, testimonial quotes and contact details. All content is plain HTML, no build step.

Fonts: the template loads Fraunces (headlines) and Inter (body) from Google Fonts. To change, edit the font link in the `<head>` of `index.html` and the `--serif` and `--sans` values in `styles.css`.

Work filter: each card has a `data-cat` value (`editorial`, `brand`, `writing`). Filter buttons use matching `data-filter` values. Add a new card by copying any `<article class="card">` block and setting its `data-cat`.

## Folder Structure

```text
portfolio-editorial-minimal/
  index.html   page structure and copy
  styles.css   all styling, responsive rules
  script.js    menu, filter, reveals, quotes, form validation
  README.md    this guide
```

студія веб розробки ловабле

Структура проєкту:

studio-gulp/
├── gulpfile.js              — Gulp 4 таски (HTML, SCSS, JS, images, BrowserSync)
├── package.json
├── src/
│   ├── html/
│   │   ├── pages/index.html         — головна сторінка з @@include
│   │   └── components/              — _header, _hero, _services, _portfolio, _process, _contact, _footer
│   ├── scss/
│   │   ├── main.scss                — точка входу
│   │   ├── base/                    — _variables, _reset, _typography
│   │   ├── utilities/               — _mixins (media, flex, grid, glass), _animations
│   │   ├── components/              — _buttons, _inputs
│   │   ├── layout/                  — _header, _footer
│   │   └── pages/                   — _hero, _services, _portfolio, _process, _contact
│   ├── js/main.js                   — бургер, sticky header, IntersectionObserver анімації
│   ├── img/ та fonts/

.github/
└── workflows/
    └── deploy.yml
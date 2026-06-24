// const { src, dest, watch, series, parallel } = require("gulp");
// const browserSync = require("browser-sync").create();
// const fileInclude = require("gulp-file-include");
// const sass = require("gulp-sass")(require("sass"));


// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");

// const cleanCSS = require("gulp-clean-css");
// const groupMedia = require("gulp-group-css-media-queries");

// const terser = require("gulp-terser");
// const htmlmin = require("gulp-htmlmin");

// const rename = require("gulp-rename");
// const imagemin = require("gulp-imagemin");
// const webp = require("gulp-webp");
// const newer = require("gulp-newer");
// const del = require("del");

// const plumber = require("gulp-plumber");
// const notify = require("gulp-notify");
// const sourcemaps = require("gulp-sourcemaps");
// const gulpIf = require("gulp-if");

// const isProd = process.argv.includes("build");

// const path = {
//   src: {
//     html: "src/html/pages/*.html",
//     scss: "src/scss/main.scss",
//     js: "src/js/main.js",
//     img: "src/img/**/*.{jpg,png,svg,gif,ico,webp}",
//     fonts: "src/fonts/**/*",
//   },
//   watch: {
//     html: "src/html/**/*.html",
//     scss: "src/scss/**/*.scss",
//     js: "src/js/**/*.js",
//     img: "src/img/**/*.{jpg,png,svg,gif,ico,webp}",
//   },
//   dist: {
//     html: "dist/",
//     css: "dist/css/",
//     js: "dist/js/",
//     img: "dist/img/",
//     fonts: "dist/fonts/",
//   },
//   clean: "dist/",
// };

// function html() {
//   return src(path.src.html)
//     .pipe(plumber(notify.onError("HTML Error: <%= error.message %>")))
//     .pipe(fileInclude({ prefix: "@@", basepath: "src/html/" }))
//     .pipe(
//       gulpIf(
//         isProd,
//         htmlmin({
//           collapseWhitespace: true,
//           removeComments: true,
//         }),
//       ),
//     )
//     .pipe(dest(path.dist.html))
//     .pipe(browserSync.stream());
// }

// function scss() {
//   return (
//     src(path.src.scss, { allowEmpty: true })
//       .pipe(plumber(notify.onError("SCSS Error: <%= error.message %>")))
//       .pipe(gulpIf(!isProd, sourcemaps.init()))
//       .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
//       .pipe(groupMedia())
//       // .pipe(autoprefixer({ overrideBrowserslist: ["last 5 versions"], cascade: true }))

//       .pipe(
//         postcss([
//           autoprefixer({
//             overrideBrowserslist: ["last 5 versions"],
//             cascade: false,
//           }),
//         ]),
//       )

//       .pipe(gulpIf(!isProd, sourcemaps.write(".")))
//       .pipe(dest(path.dist.css))
//       .pipe(cleanCSS())
//       .pipe(rename({ suffix: ".min" }))
//       .pipe(dest(path.dist.css))
//       .pipe(browserSync.stream())
//   );
// }

// function js() {
//   return (
//     src(path.src.js, { allowEmpty: true })
//       .pipe(plumber(notify.onError("JS Error: <%= error.message %>")))
//       .pipe(dest(path.dist.js))
//       // .pipe(uglify())
//       .pipe(terser())
//       .pipe(rename({ suffix: ".min" }))
//       .pipe(dest(path.dist.js))
//       .pipe(browserSync.stream())
//   );
// }

// function images() {
//   return src(path.src.img)
//     .pipe(newer(path.dist.img))
//     .pipe(webp({ quality: 80 }))
//     .pipe(dest(path.dist.img))
//     .pipe(src(path.src.img))
//     .pipe(newer(path.dist.img))
//     .pipe(imagemin({ verbose: true }))
//     .pipe(dest(path.dist.img));
// }

// function fonts() {
//   return src(path.src.fonts, { allowEmpty: true }).pipe(dest(path.dist.fonts));
// }

// function clean() {
//   return del(path.clean);
// }

// function serve() {
//   browserSync.init({ server: { baseDir: "dist/" }, port: 3000, notify: false });
//   watch(path.watch.html, html);
//   watch(path.watch.scss, scss);
//   watch(path.watch.js, js);
//   watch(path.watch.img, images);
// }

// const build = series(clean, parallel(html, scss, js, images, fonts));
// const dev = series(build, serve);

// exports.default = dev;
// exports.build = build;
// exports.html = html;
// exports.scss = scss;
// exports.js = js;
// exports.images = images;
// exports.clean = clean;



const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const cleanCSS = require("gulp-clean-css");
const groupMedia = require("gulp-group-css-media-queries");

const terser = require("gulp-terser");
const htmlmin = require("gulp-htmlmin");

const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const newer = require("gulp-newer");
const del = require("del");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");

const isProd = process.argv.includes("build");

const path = {
  src: {
    html: "src/html/pages/*.html",
    scss: "src/scss/main.scss",
    js: "src/js/main.js",
    img: "src/img/**/*.{jpg,png,svg,gif,ico,webp}",
    videos: "src/img/**/*.{mp4,webm}", // Додано шлях до вихідних відеофайлів
    fonts: "src/fonts/**/*",
  },
  watch: {
    html: "src/html/**/*.html",
    scss: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
    img: "src/img/**/*.{jpg,png,svg,gif,ico,webp}",
    videos: "src/img/**/*.{mp4,webm}", // Додано відстежування відео
  },
  dist: {
    html: "dist/",
    css: "dist/css/",
    js: "dist/js/",
    img: "dist/img/", // Відео копіюватиметься сюди ж, поруч із картинками
    fonts: "dist/fonts/",
  },
  clean: "dist/",
};

function html() {
  return src(path.src.html)
    .pipe(plumber(notify.onError("HTML Error: <%= error.message %>")))
    .pipe(fileInclude({ prefix: "@@", basepath: "src/html/" }))
    .pipe(
      gulpIf(
        isProd,
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        }),
      ),
    )
    .pipe(dest(path.dist.html))
    .pipe(browserSync.stream());
}

function scss() {
  return (
    src(path.src.scss, { allowEmpty: true })
      .pipe(plumber(notify.onError("SCSS Error: <%= error.message %>")))
      .pipe(gulpIf(!isProd, sourcemaps.init()))
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(groupMedia())
      .pipe(
        postcss([
          autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: false,
          }),
        ]),
      )
      .pipe(gulpIf(!isProd, sourcemaps.write(".")))
      .pipe(dest(path.dist.css))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: ".min" }))
      .pipe(dest(path.dist.css))
      .pipe(browserSync.stream())
  );
}

function js() {
  return (
    src(path.src.js, { allowEmpty: true })
      .pipe(plumber(notify.onError("JS Error: <%= error.message %>")))
      .pipe(dest(path.dist.js))
      .pipe(terser())
      .pipe(rename({ suffix: ".min" }))
      .pipe(dest(path.dist.js))
      .pipe(browserSync.stream())
  );
}

function images() {
  return src(path.src.img)
    .pipe(newer(path.dist.img))
    .pipe(webp({ quality: 80 }))
    .pipe(dest(path.dist.img))
    .pipe(src(path.src.img))
    .pipe(newer(path.dist.img))
    .pipe(imagemin({ verbose: true }))
    .pipe(dest(path.dist.img));
}

// Нова функція для простого копіювання відеофайлів без обробки плагінами
function videos() {
  return src(path.src.videos, { allowEmpty: true })
    .pipe(newer(path.dist.img))
    .pipe(dest(path.dist.img))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(path.src.fonts, { allowEmpty: true }).pipe(dest(path.dist.fonts));
}

function clean() {
  return del(path.clean);
}

function serve() {
  browserSync.init({ server: { baseDir: "dist/" }, port: 3000, notify: false });
  watch(path.watch.html, html);
  watch(path.watch.scss, scss);
  watch(path.watch.js, js);
  watch(path.watch.img, images);
  watch(path.watch.videos, videos); // Додано відстежування змін у відео
}

// Додано таск videos до загального списку паралельного виконання
const build = series(clean, parallel(html, scss, js, images, videos, fonts));
const dev = series(build, serve);

exports.default = dev;
exports.build = build;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.videos = videos; // Експорт нового таску
exports.clean = clean;
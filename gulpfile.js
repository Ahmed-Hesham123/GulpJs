const gulp = require("gulp"),
  livereload = require("gulp-livereload");

// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin"),
  // Using more than one function
  { parallel } = require("gulp"),
  //   gulp plugin to minify CSS, using clean-css.
  cleanCSS = require("gulp-clean-css"),
  //   to concat files
  concat = require("gulp-concat");

function minifyHTML() {
  return gulp
    .src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}

function minifyCSS() {
  return gulp
    .src(["src/style.css", "src/animation.css"])
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("allmin.css"))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}

exports.default = function () {
  require("./server.js");
  livereload.listen();

  gulp.watch(["src/index.html"], parallel(minifyHTML, minifyCSS));
};

import gulp from "gulp";
import { paths } from "../gulpfile";
import jeditor from "gulp-json-editor";
import gulpif from "gulp-if";
import merge from "gulp-merge-json";

function addAutoreloadScript(manifestJson) {
  const hasScripts = manifestJson.background && manifestJson.background.scripts;

  return {
    ...manifestJson,
    background: {
      ...manifestJson.background,
      scripts: [
        "autoreload.js",
        ...(hasScripts ? manifestJson.background.scripts : [])
      ]
    }
  };
}

export function manifest() {
  return gulp
    .src(paths.manifest)
    .pipe(gulpif(!global.IS_PRODUCTION, jeditor(addAutoreloadScript)))
    .pipe(
      merge({
        fileName: "manifest.json"
      })
    )
    .pipe(gulp.dest("build"));
}

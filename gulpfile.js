const octo = require('@octopusdeploy/gulp-octo');
const gulp = require('gulp');

gulp.task('publish', () =>
  gulp
    .src(['build/**'])
    .pipe(
      octo.pack('zip', {
        version: `1.0.${process.env.TRAVIS_BUILD_NUMBER}`,
      })
    )
    .pipe(octo.push({ apiKey: process.env.octopusKey, host: 'https://linguaben.octopus.app' }))
);

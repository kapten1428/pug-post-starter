let gulp = require('gulp'),
usemin = require('gulp-usemin'),
cssnano = require('gulp-cssnano'),
browserSync = require('browser-sync').create();

gulp.task('testDocs',() => {
	browserSync.init({
		notify: false,
		server:{
			baseDir : "docs"
		}
	})
});

gulp.task('createDocs',()=>{
	let copyFolder = [
	'./app/**/*',
	'!./app/assets/styles/**/*',
	'!./app/pug/**/*',
	'!./app/temp',
	'!./app/temp/**/*',
	]
	return gulp.src(copyFolder)
	.pipe(gulp.dest('./docs'))
});

gulp.task('usemin',['styles'],()=>{
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css:[function() {return cssnano()}],
	}))
	.pipe(gulp.dest("./docs"));
});

gulp.task('build',['createDocs','usemin']);
let gulp = require('gulp'),
watch  = require('gulp-watch'),
plumber = require('gulp-plumber'),
pug = require('gulp-pug'),
browserSync = require('browser-sync').create();

gulp.task('watch',()=>{

	browserSync.init({
		notify:false,
		server:{
			baseDir : 'app'
		}
	});

	watch('./app/index.html',()=>{
		browserSync.reload()
	})

	watch('./app/assets/styles/**/*.css',()=>{
		gulp.start('cssInject')
	});

	watch('./app/pug/**/*.pug',()=>{
		gulp.start('pug')
	})
})

gulp.task('cssInject',['styles'],() => {
	return gulp.src('./app/assets/styles/**/*.css')
			.pipe(browserSync.stream())
});

gulp.task('pug',()=>{
	return gulp.src('./app/pug/index.pug')
			.pipe(plumber())
			.pipe(pug({
				pretty : true
			}))
			.pipe(gulp.dest('./app'))
})
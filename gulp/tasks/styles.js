let gulp = require('gulp'),
plumber = require('gulp-plumber'),
autoprefixer = require('autoprefixer'),
postcss = require('gulp-postcss'),
cssImport = require('postcss-import'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');

gulp.task('styles',()=>{
	let processorCSS = [
		cssImport,cssvars,mixins,nested,hexrgba,autoprefixer
	];

	return gulp.src('./app/assets/styles/main.styles.css')
			.pipe(postcss(processorCSS))
			.on('error',function(errorInfo){
				console.log(errorInfo.toString());
				this.emit('end')
			})
			.pipe(gulp.dest('./app/temp/assets/styles'))
})
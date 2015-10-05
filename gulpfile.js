var gulp = require('gulp'),
	 del = require('del'),
	 jade = require('gulp-jade'),
	 webserver = require('gulp-webserver');



var paths = {
	temp:'public',
	index:'app/index.jade'
};

// to copy all the files
gulp.task('copyAll',function(){
	return gulp
				.src(paths.index)
				.pipe(jade())
				.pipe(gulp.dest(paths.temp));
});

gulp.task('serve',function(){
	return gulp
				.src(paths.temp)
				.pipe(webserver({
					livereload:true,
					
				}));
});

gulp.task('clean',function(){
	del([paths.temp]);

});

gulp.task('watch',['serve'],function(){
	gulp.watch(paths.index,['copyAll']);
})
gulp.task('default',['watch']);




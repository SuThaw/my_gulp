var gulp = require('gulp'),
	 del = require('del'),
	 jade = require('gulp-jade'),
	 webserver = require('gulp-webserver')
	 mainBowerFiles = require('main-bower-files'),
	 gulpFilter = require('gulp-filter')
	 less = require('gulp-less'),
	 inject = require('gulp-inject');

var paths = {
	app:'app/**/*',
	temp:'public',
	index:'app/index.jade',
	tempIndex:'public/index.html',
	tempVendor : 'public/vendor',
	tempScript : 'public/scripts',
	tempCSS : 'public/styles',
	tempView : 'public/views',
	appJS:'app/scripts/**/*',
	appCSS:'app/styles/**/*',
	appView:'app/views/**/*'

};




// to copy all the files
gulp.task('copyAll',function(){
	var lessFilter = gulpFilter('**/*.less',{restore:true});
	var tempVendor = gulp
						.src(mainBowerFiles())
						.pipe(lessFilter)
						.pipe(less())
						.pipe(lessFilter.restore)
						.pipe(gulp.dest(paths.tempVendor));

	
	var appJS = gulp
					.src(paths.appJS)
					.pipe(gulp.dest(paths.tempScript))


	var appCSS = gulp
					.src(paths.appCSS)
					.pipe(less())
					.pipe(gulp.dest(paths.tempCSS));
	
	var appView = gulp
					.src(paths.appView)
					.pipe(jade())
					.pipe(gulp.dest(paths.tempView));
	return gulp
				.src(paths.index)
				.pipe(jade())
				.pipe(gulp.dest(paths.temp))
				.pipe(inject(tempVendor,
						{
							relative:true,
							name:'vendorInject'
						}))
				.pipe(inject(appJS,{
					relative:true
				}))
				.pipe(inject(appCSS,{
					relative:true
				}))
				.pipe(gulp.dest(paths.temp));
				
});


gulp.task('serve',['copyAll'],function(){
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
	
	gulp.watch(paths.app,['copyAll']);
})
gulp.task('default',['watch']);




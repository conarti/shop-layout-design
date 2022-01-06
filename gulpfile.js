const { join } = require('path');
const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const aliases = require('gulp-style-aliases');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const svgSprite = require('gulp-svg-sprite');
const makePaths = require('./paths.js');

const SRC_DIR = 'src';
const BUILD_DIR = 'build';

const paths = makePaths(SRC_DIR, BUILD_DIR);

const sassAliasesConfig = {
	'~': './node_modules/'
};

const jsDependencies = [join(SRC_DIR, 'index.js')];

const svgConfig = {
	mode: {
		stack: {
			sprite: '../sprite.svg'
		}
	},
};

const sassCompile = () => {
	return src(paths.SCSS_ENTRY)
		.pipe(aliases(sassAliasesConfig))
		.pipe(sass())
		.pipe(dest(paths.STYLE_BUILD_DIR))
		.pipe(browserSync.stream());
};

const htmlCompile = () => {
	return src(paths.HTML_ENTRY)
		.pipe(dest(BUILD_DIR))
		.pipe(browserSync.stream());
};

const imageCompile = () => {
	return src(paths.IMAGES_DIR)
		.pipe(dest(paths.IMAGES_BUILD_DIR))
		.pipe(browserSync.stream());
};

const scriptsCompile = () => {
	return src(jsDependencies)
		.pipe(concat('index.js'))
		.pipe(dest(BUILD_DIR))
		.pipe(browserSync.stream());
};

const makeSprite = () => {
	return src(paths.SVG_ENTRY)
		.pipe(svgSprite(svgConfig))
		.pipe(dest(BUILD_DIR))
		.pipe(browserSync.stream());
};

const cleanBuild = () => {
	return src(`${BUILD_DIR}/*`)
		.pipe(clean());
};

const browserSyncJob = () => {
	browserSync.init({
		server: BUILD_DIR
	});

	watch(paths.SCSS_WATCH, sassCompile);
	watch(paths.HTML_WATCH, htmlCompile);
	watch(paths.JS_WATCH, scriptsCompile);
	watch(paths.SVG_WATCH, makeSprite);
	watch(paths.IMG_WATCH, imageCompile);
};

const build = series(cleanBuild, parallel(sassCompile, htmlCompile));

exports.default = series(build, browserSyncJob);
exports.serve = series(build, browserSyncJob);
exports.makeSprite = makeSprite;
exports.clean = cleanBuild;
exports.build = build;

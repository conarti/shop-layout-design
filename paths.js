const { resolve } = require('path');

const getPaths = (src, build) => {
	const makePath = (type, path = '') => resolve(__dirname, type, path);

	return {
		SCSS_ENTRY: makePath(src, 'scss/index.scss'),
		HTML_ENTRY: makePath(src, '*.html'),
		SVG_ENTRY: makePath(src, 'assets/**/*.svg'),
		JS_ENTRY: makePath(src, 'index.js'),
		IMAGES_DIR: makePath(src, 'assets/images/**/*'),
		STYLE_BUILD_DIR: makePath(build),
		IMAGES_BUILD_DIR: makePath(build, 'images'),
		SCSS_WATCH: makePath(src, 'scss/**/*'),
		HTML_WATCH: makePath(src, '*.html'),
		JS_WATCH: makePath(src, '**/*.js'),
		SVG_WATCH: makePath(src, 'assets/**/*.svg'),
		IMG_WATCH: makePath(src, 'assets/images/**/*'),
	};
};

module.exports = getPaths;

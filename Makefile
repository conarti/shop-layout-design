serve:
	gulp serve

install:
	npm install

remove-git:
	rm -rf .git

git-init:
	git init

sprite:
	gulp makeSprite

build:
	gulp build

deploy: build
	npx surge ./build/ --domain shop-layout-design.surge.sh

setup: install remove-git git-init

lint:
	npx stylelint ./src/scss/**/*

.PHONY: build

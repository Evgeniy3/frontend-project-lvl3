install: 
	npm ci

publish: 
	npm publish --dry-run	

link:
	npm link

lint: 
	npx eslint . 

start:
	npm run server 	
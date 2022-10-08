gcp-manual-update:
	yarn
	yarn build
	sudo cp -r ./build/* /usr/share/nginx/html

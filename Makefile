gcp-manual-update:
	yarn
	yarn build
	sudo cp -r ./build/* /var/www/chernyshov.app/html
	# sudo cp -r ./build/* /usr/share/nginx/html

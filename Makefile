app/playlist.js: bundle.js
	webpack $< $@

server: app/playlist.js
	node ./dev-server.js

bundle.js: ./src/playlist.js

clean:
	rm app/playlist.js

release: clean app/playlist.js
	aws s3 sync app s3://repurpose.com/app
	aws s3 sync views s3://repurpose.com/views

test: clean app/playlist.js
	npm test


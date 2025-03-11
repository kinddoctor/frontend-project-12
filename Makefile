start-frontend:
	npm run start

start-backend:
	npx start-server

develop:
	make start-backend & make start-frontend

install:
	npm ci

build:
	rm -rf /build
	npm run build
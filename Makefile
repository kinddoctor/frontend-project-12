install:
	npm ci
	cd frontend && npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	make -C frontend build

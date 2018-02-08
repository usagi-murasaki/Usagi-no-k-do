FROM node:9.5.0-slim

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --unsafe-perm

COPY src/ src

CMD ["/bin/sh", "-c", "npm start > log.txt 2>&1"]
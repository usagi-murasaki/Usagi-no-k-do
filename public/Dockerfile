FROM node:9.5.0-slim

WORKDIR /usr/src/app

RUN mkdir -p /var/log/usagi-no-k-do-public

COPY package.json .

RUN npm install --unsafe-perm --no-package-lock

COPY src src

CMD ["/bin/sh", "-c", "npm start > /var/log/usagi-no-k-do-public/log.txt 2>&1"]
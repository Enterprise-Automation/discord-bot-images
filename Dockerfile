FROM node:alpine

COPY src /var/app

WORKDIR /var/app

RUN npm install

ENTRYPOINT ["npm", "start"]

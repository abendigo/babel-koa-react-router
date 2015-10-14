FROM node:4.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production
COPY dist /usr/src/app/dist

EXPOSE 3001
CMD [ "npm", "start" ]
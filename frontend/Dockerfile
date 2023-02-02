FROM node:16.18.1-alpine
WORKDIR /app
COPY package.json /app/
RUN npm i
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
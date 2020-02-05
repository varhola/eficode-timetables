FROM node:12.2.0-alpine

RUN mkdir -p /app/api/
WORKDIR /app/api/

COPY package.json /app/api/package.json
RUN npm install

COPY . /app/api/
CMD ["npm", "start"]

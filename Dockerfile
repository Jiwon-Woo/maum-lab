FROM node:20

WORKDIR /backend

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i

COPY ./src ./src

RUN npm run build

CMD ["npm", "run", "start:prod"]
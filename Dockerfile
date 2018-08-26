FROM node:latest

WORKDIR /usr/app

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn install

ADD ./src ./src
ADD ./tsconfig.json .
RUN yarn run build

ENTRYPOINT yarn run serve
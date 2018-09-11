FROM node:latest

WORKDIR /usr/app

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn

ADD ./src ./src
ADD ./tsconfig.json .

ENTRYPOINT yarn serve:dev

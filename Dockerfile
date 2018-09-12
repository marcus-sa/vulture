# yarn install --production --ignore-scripts --prefer-offline

FROM node:alpine

WORKDIR /usr/app

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn

ADD ./src ./src
ADD ./tsconfig.json .

ENTRYPOINT yarn serve:dev

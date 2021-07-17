# build env
FROM node:14.17.3-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . ./
RUN yarn build
RUN tar -cvf ./deploy.tar --exclude='*.map' ./captain-definition /app/build/*
RUN npx caprover login -c /app/caproverConfig.json
RUN npx caprover deploy --default -t ./deploy.tar
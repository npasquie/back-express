FROM node:lts
WORKDIR ./
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN if ["$NODE_ENV" = "development"]; \
    then nodemon back.js; \
    else node back.js;
    fi
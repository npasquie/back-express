FROM node:lts
WORKDIR ./
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "back.js"]
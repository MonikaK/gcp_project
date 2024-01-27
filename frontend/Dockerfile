FROM node:18-alpine
WORKDIR /frontend/
COPY src/ /frontend/src
COPY public/ /frontend/public
COPY package.json /frontend/
COPY tsconfig.json /frontend/
RUN yarn install
CMD ["yarn", "start"]
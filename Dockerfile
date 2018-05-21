FROM node:8
COPY package.json .
RUN npm -v
RUN node -v
RUN npm install
COPY . .
EXPOSE 8080
ENV  NODE_ENV production
CMD npm start

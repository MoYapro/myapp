FROM node:8
COPY . .
RUN npm -v
RUN node -v
RUN npm install
EXPOSE 3000

CMD npm start

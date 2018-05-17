FROM mhart/alpine-node:8
ADD local/ src/
WORKDIR src/
RUN npm install

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD [ \"npm\", \"start\" ]

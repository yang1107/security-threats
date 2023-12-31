FROM node:20-alpine
RUN apk add --no-cache python3 g++ make
LABEL authors="Carlos Rodriguez Dominguez"

WORKDIR /usr/app
RUN npm install -g @angular/cli
COPY ./ /usr/app
RUN rm package-lock.json
RUN npm install
RUN npm run build
RUN printf "node index.js &\ncd server\nnode index.js\n" > entrypoint.sh

WORKDIR /usr/app/server
RUN rm package-lock.json
RUN npm install

EXPOSE 4200
EXPOSE 8080

WORKDIR /usr/app
CMD ["/bin/sh", "entrypoint.sh"]

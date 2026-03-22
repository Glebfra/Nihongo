FROM node:24 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --include=optional && npm rebuild lightningcss
COPY . .

FROM build AS prod

ARG FRONTEND_PORT=5173
EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "build"]
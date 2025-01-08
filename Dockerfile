# build stage
FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install && npm i eslint
COPY . .

ENV GENERATE_SOURCEMAP false

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
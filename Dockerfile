FROM node:15.3.0-buster as builder
COPY ./react/ /react/
WORKDIR /react/
RUN npm install
RUN npm run build-css
RUN npm run build

#nginx/Dockerfile
FROM nginx:latest
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /react/build/ /var/www/
RUN ls /var/www

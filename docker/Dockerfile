FROM node:12.14-alpine as build
RUN mkdir -p /usr/server-dashboard
WORKDIR /usr/server-dashboard
COPY package.json .
RUN npm install --unsafe-perm
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY /docker/nginx.conf /etc/nginx/nginx.conf
COPY /docker/default.conf /etc/nginx/conf.d/default.conf
COPY /docker/routes.conf /etc/nginx/conf.d/routes/routes.conf
COPY --from=build /usr/server-dashboard/dist /usr/share/nginx/html
EXPOSE 80

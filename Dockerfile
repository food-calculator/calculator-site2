FROM nginx:alpine
LABEL authors="Fridolin42"
EXPOSE 80

COPY ./dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
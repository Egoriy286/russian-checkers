# base image
FROM node:20.17.0-alpine3.20

# set working directory
WORKDIR /app
# install and cache app dependencies
COPY . .
RUN npm install
RUN npm install @vue/cli@5.0.8 -g
EXPOSE 80
# start app
CMD ["npm", "run", "serve"]
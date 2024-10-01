# base image
FROM node:10.8.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli@5.0.8 -g
EXPOSE 3000
# start app
CMD ["npm", "run", "serve"]
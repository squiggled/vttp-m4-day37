FROM node:21

WORKDIR /app

COPY package.* .
COPY angular-json .
COPY tsconfig.* .
COPY src .

# install node modules
#we only want to run ng build if npm ci works
RUN npm ci && ng build 
# we dont want docker to copy node_modules as it is huge, so we ignore it with .dockerignore
RUN 
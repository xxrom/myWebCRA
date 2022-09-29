# Building: docker build -f Docker.dev . -t my-web-cra
# Run: docker run -p 3300:3333 my-web-cra
# Browser link: localhost:3300
# ---------------------------------
#FROM node:alpine
FROM node:16.17.0-bullseye-slim

# Update witn dumb-init for cashing ?
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# productions mode
ENV NODE_ENV production

# Init and copy package.json 
WORKDIR '/home/node/app'

COPY ./package*.json ./
# instal only required "devDependencies"
RUN npm ci
RUN npm run build
#RUN yarn
#RUN npm ci --only=production #RUN yarn

# Copy all files
COPY ./ ./

# open only one port
EXPOSE 3333
# Run project
CMD ["yarn", "start"]
# don't run as root inside
# USER node # issue with cra access

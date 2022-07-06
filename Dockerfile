FROM node:16.15.1-bullseye
LABEL maintainer_devops="michael.silva@jam3.com"
LABEL maintainer_architect="iran.reyes@jam3.com"

# Upgrade npm
RUN npm install -g npm@8

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package-lock.json .
COPY package.json .
RUN npm set-script prepare ""
RUN npm ci

# Copy source files
COPY . .

# Expose files
VOLUME ["/usr/src/app"]

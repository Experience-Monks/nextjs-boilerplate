FROM node:14
LABEL maintainer_devops="michael.silva@jam3.com"
LABEL maintainer_architect="iran.reyes@jam3.com"

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package-lock.json .
COPY package.json .
RUN npm ci

# Copy source files
COPY . .

# Expose files
VOLUME ["/usr/src/app"]

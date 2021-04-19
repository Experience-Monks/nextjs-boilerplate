FROM node:12
LABEL maintainer_devops="michael.silva@jam3.com"
LABEL maintainer_architect="iran.reyes@jam3.com"

# Set working directory
WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install dependencies
RUN npm ci --only=production

# Expose files
VOLUME ["/usr/src/app"]

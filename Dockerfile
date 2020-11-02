FROM node:10
LABEL maintainer_architect="iran.reyes@jam3.com"
LABEL maintainer_devops="michael.silva@jam3.com"

# install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install dependencies
RUN npm install


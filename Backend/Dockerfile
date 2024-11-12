# Use official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to install dependencies
COPY package.json package-lock.json ./

# Install the backend dependencies
RUN npm install

# Copy all the backend source code into the container
COPY . .

# Copy serviceAccountKey.json into the container
COPY ./config/serviceAccountKey.json ./config/serviceAccountKey.json

# Expose the port your Node.js server listens on (default is 5000)
EXPOSE 5001

# Start the Node.js server
CMD ["node", "server.js"]

# Stage 1: Build React app using Node.js
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app (this will generate the build/ directory)
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration file (from your local nginx/config directory)
COPY nginx/config/default.conf /etc/nginx/conf.d/

# Copy the build output from the build stage to Nginx's default html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8080 (instead of 80) for Cloud Run
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

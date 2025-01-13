# Use the Node.js image for building the app
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app into the container
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the built files to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom config to override default
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# Use official Node.js image
FROM node:20


# Install PM2 globally
RUN npm install -g pm2

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Use PM2 to start your application
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

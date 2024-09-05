# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the .env file
COPY .env .env

# Copy the rest of the app
COPY . .

# Copy the entrypoint script
COPY create-config.sh /usr/local/bin/create-config.sh

# Make the script executable
RUN chmod +x /usr/local/bin/create-config.sh

# Set the entrypoint to the script
ENTRYPOINT ["/usr/local/bin/create-config.sh"]

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]

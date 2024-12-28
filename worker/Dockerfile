# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Install Prisma CLI globally for migrations and generate Prisma client
RUN npm install -g prisma && prisma generate

# Expose the port (if the worker has an HTTP healthcheck)
EXPOSE 3001

# Start the worker
CMD ["npm", "run", "start"]

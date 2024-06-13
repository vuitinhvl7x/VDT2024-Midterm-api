# Stage 1: Build stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy the rest of the application code
COPY . .

# Build the application (if you have a build step)
# RUN npm run build 

# Stage 2: Production stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the production dependencies
COPY --from=build /app/package*.json ./
RUN npm ci --only=production 

# Copy the application code from the build stage
COPY --from=build /app ./

# Expose the port the app runs DB_HOST
EXPOSE 4000

# Command to run the application
CMD ["node", "server.js"]

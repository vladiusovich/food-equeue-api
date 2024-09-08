ARG NODE_VERSION=22.4.1

FROM node:${NODE_VERSION}-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application
FROM node:${NODE_VERSION}-alpine AS prod

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./

RUN npm install

# Expose the application port (default is 3000 for NestJS)
EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/main"]

FROM node:18-alpine

# Set working directory

WORKDIR /app

# Copy package files

COPY package*.json ./

# Install dependencies

RUN yarn install --production

# Copy source code

COPY . .

# Expose port

EXPOSE 3000

# Health check

# Start the application

CMD ["yarn", "start"]

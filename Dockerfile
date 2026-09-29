FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npx playwright install --with-deps

# Default command runs CI tests
CMD ["npm", "run", "test:ci"]

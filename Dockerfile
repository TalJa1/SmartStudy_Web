# Use official Node.js image for build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Use official Nginx image for serving static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy nginx.conf to /etc/nginx/nginx.conf for main config, and also to default.conf for server block
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --spider -q http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]

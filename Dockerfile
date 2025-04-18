# Stage 1: Build app
FROM node:23-alpine3.20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app to nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Note: The nginx.conf file is optional and can be used to customize the Nginx server settings.
# You can create a custom nginx.conf file in the same directory as this Dockerfile and uncomment the COPY line to use it.
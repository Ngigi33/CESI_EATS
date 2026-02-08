# Étape 1 : build (compile l'app React)
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : serveur statique via nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# CRA : remplace `/dist` par `/build` si tu utilises Create React App

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

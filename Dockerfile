# Usamos una imagen base de Node.js
FROM node:18-alpine AS build-stage

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalamos las dependencias usando yarn
RUN yarn install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Construimos la aplicación para producción
RUN yarn build

# Usamos una imagen de Nginx para servir la aplicación en producción
FROM nginx:alpine AS production-stage

# Copiamos los archivos generados en la etapa anterior a la carpeta de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto que inicia Nginx
CMD ["nginx", "-g", "daemon off;"]

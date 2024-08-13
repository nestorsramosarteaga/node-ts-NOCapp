# Proyecto node-ts-NetworkOperationCenter-app
Crear un NOC con algunas caracteristicas usando Arquitectura Limpia

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
```
3. Instalar dependencias ``` npm install ```
4. Levantar las bases de datos en composer
```
docker compose up -d
```
5. Iniciar aplicacion en modo dev ``` npm run dev ```
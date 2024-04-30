#Development

Pasos para levantar la App en Desarrollo

1. Levantar la Base de Datos

```
docker compose up -d
```

2. Crear la copia de el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando `npm install`
5. Ejecutar el comando `npm run dev`
6. Ejecutar estos comandos de prisma

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# prod

# stage

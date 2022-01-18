## Instrucciones

Clonar el repo, correr npm install

Una vez que esta todo clonado, crear un archivo .env (pueden usar en .env.example) y cambiar la KEY por la que quieran

Cambiar en el .env MONGO_URI por la url de la base mongo que usen.

correr ```npm run start:dev``` la api se activa en http://localhost:3000

en la ruta ```http://localhost:3000/swagger-ui``` se encuentra swagger, para realizar consultas en swagger, utilizar la KEY en el menu Authorize

para consultas con fetch o clientes enviar el header Authorization: Bearer "acalaKEY"

en este mismo repo hay un archivo llamado ***NestFirstAPI.postman_collection.json*** para importar en Postman

**NOTA IMPORTANTE** tienen que tener mongodb instalado y andando sino se va a colgar todo.


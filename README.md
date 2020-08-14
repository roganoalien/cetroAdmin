#### CETRO ADMIN

Se necesita tener instalado mongodb y nodejs tanto en el servidor como en local

Una vez clonado el repositorio se debe de hacer un `npm install` para instalar todas las dependencias y se debe de cambiar el archivo `.env.example` por `.env` para poder crear la base de datos y utilizar la palabra secreta para la sesi'on del usuario.

Para correr en local hay que usar el comando `npm run dev` pero primero se debe de estar corriendo mongodb. 
Este no se conecta remotamente a la base de datos sino se conecta de forma local para que sea más rápida la respuesta de la misma. 

Al abrir el proyecto en el navegador te manda a la página de inicio de sesión pero se debe de acceder a `/registro` para poder crear un usuario. **ES IMPORTANTE** deshabilitar esta ruta para producción una vez creados los usuarios base admin


## ON SERVER
Para poder correr el repositorio en un servidor se necesita igualmente tener instalado NODEJS y MongoDB o cambiar la ruta para usar un sistema de tercero de la base de datos como MONGO ATLAS anteriormente mLab. Al igual que su necesaria configuración de NGiNX o Apache.

Se clona en el repositorio y se utilza **PM2** para correr el proyecto en el servidor. Si se utilizará algún servicio como `Heroku`, `Vercel`, o `Netlify` no es necesaria la instalación de los paquetes ya que estos servidores lo harán por ti pero si se necesita utilizar un proveedor de base de datos y hacer la conexión directamente con ellos

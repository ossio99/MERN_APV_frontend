# MERN APV frontend  
Este es un proyecto fullstack, especificamente stack mern cuyas funciones son:  
-Administrar pacientes de veterinaria  
-Crear cuentas de veterinarios  
-Cada veterinario podra registrar y administrar solo sus pacientes (tendra que autenticarse con sus credenciales) 
-Editar informacion del propio perfil de veterinario  

Todo esto es posible gracias a que en este proyecto se implementaron las siguientes caracteristicas:  
### Front  
-Registro  
Registro y confirmacion del correo registrado gracias al envio de email  
-Recuperación de contraseña  
De igual forma es posible recuperar la contraseña del veterinario  
-Autenticacion  
Autenticacion con jwt que expiran cada 30 días, por lo que sera neceriario volver a autenticarse
-Routing por el lado del front  
Para poder moverse entre las diferentes paginas del sistema  

### Back  
-Routing por parte del back
Se desarrollaron diferentes endpoints los cuales atienden a cada una de las peticiones del front  
-Conexión a la base de datos  
Los endpoints que requieren informacion de la db hacen peticiones a esta para devolversela al cliente

## Tecnologías 
-React  
-React router  
-Tailwind  
-Node  
-Express  
-MongoDB  

### Deploy
[Apv deploy](https://mern-apv-frontend-ashy.vercel.app)  

### Codigo del backend   
[Apv - backend](https://github.com/ossio99/MERN_APV_backend)  


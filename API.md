# CETRO API
------
Lista de funciones que están listas:

| Actualmente corriendo | Sin correr |
| --------------------- | ---------- |
| Todos los Eventos | Login de usuario |
| Detalle de Evento | Registro de usuario |
| Todos los Miradores | Detalle de Usuario |
| Detalle de Mirador | --- |
| Todas las Promociones | --- |
| Detalle de Promoción | --- |
| Todas las Marcas | --- |
| Detalle de Marca | --- |

### Tipos de peticiones
Las peticiones habilitadas, deshabilitadas y que estarán habilitadas

| Habilitadas | Estará habilita | Deshabilitadas |
| ----------- | --------------- | -------------- |
| GET | POST | PUT, PATCH, DELETE, etc |


#### Ruta principal de prueba
Por el momento este es el dominio donde está alojada la API

```shell
https://cetro.techarmy.mx
```

---
----

### Peticiones

###### Comprobar Conexión
Petición que sirve para ver si está disponible la API. No tiene bloqueo por el momento pero se configurará para utilizar JWT con autentificación por vía de petición

| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/`` |

###### Todos los Eventos
| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/events`` |

###### Detalle de Evento
Se tiene que reemplazar ``:id`` por el id del evento que devuelve la petición anterior

| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/events/:id`` |

###### Todos los Miradores
| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/miradores`` |

###### Detalle de Mirador
Se tiene que reemplazar ``:id`` por el id del evento que devuelve la petición anterior

| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/miradores/:id`` |

###### Todos los Promociones
| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/promos`` |

###### Detalle de Promoción
Se tiene que reemplazar ``:id`` por el id del evento que devuelve la petición anterior

| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/promos/:id`` |

###### Todas las Marcas
| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/brands`` |

###### Detalle de Marca
Se tiene que reemplazar ``:id`` por el id del evento que devuelve la petición anterior

| Petición | url |
| -------- | --- |
| GET | ``.../api/1.0/brands/:id`` |
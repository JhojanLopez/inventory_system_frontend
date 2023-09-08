# Sistema de inventario
Sistema de invetario el cual permite realizar la gestion a distintas mercancias que queramos registrar, modificar, eliminar. proyecto generado por [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Requerimientos
El sistema requiere todo el ambiente de microservicios con spring cloud, para ello es indispensable que se use el [docker compose](https://github.com/JhojanLopez/inventory_system) añadido en la raiz del proyecto.

## Despliege
Una vez desplegado el ambiente de microservicios con la base de datos usamos los siguientes comandos (se debe estar en la raiz del proyecto):

1. Instalamos dependencias:
```shell
npm install
```

2. Corremos el proyecto con el proxy.config para realizar las peticiones al backend.
```shell
ng serve -o --proxy-config proxy.config.js
```

3. Una vez ejecutado se abrira el host y puerto del proyecto.



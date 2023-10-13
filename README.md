### News

- Se subió el proyecto inicial con los requerimientos solicitados.

# PHPoll - Prueba Técnica Desis 2023
#### PHP Versión 8.0.28 / MySQL 15.1 10.4.28-MariaDB

![](https://www.php.net/images/logos/new-php-logo.svg)

Preparación del Entorno
-------------

### XAMPP
Para empezar, deberás instalar lo que será el servidor web y gestor de base de datos MySQL.

Puedes descargar la versión necesaria directamente desde acá:
[XAMPP 8.0.28](https://www.apachefriends.org/es/download.html "Descargar XAMPP 8.0.28")

*Recomiendo realizar una instalación limpia sin modificaciones, sólo dar next y finalizar.*

### htdocs
La instalación limpia de XAMPP nos va a generar una carpeta en la raíz de nuestro Disco C:.

- C:\xampp

Para continuar con la instalación, ubicaremos la carpeta htdocs dentro del directorio antes mencionado.

- C:\xampp\htdocs

Instalación del Proyecto
-------------
Con todo lo anterior claro, ya se puede empezar la instalación del proyecto. Primero deberás elegir entre <code>clonar</code> o descargar el repositorio en <code>.zip</code> 
### Repositorio
El repositorio lo puedes encontrar en el siguiente enlace: **https://github.com/mtapiagonzalez/PHPoll.git**

Puedes decidir entre clonar o descargar el repositorio, a continuación te muestro ambas maneras.
- ##### Clonar

En tu linea de comando o GitBash deberás ingresar lo siguiente:

###### $	git clone https://github.com/mtapiagonzalez/PHPoll.git

- ##### Descargar
Para descargar el repositorio tendrás que dirigirte a [PHPoll](https://github.com/mtapiagonzalez/PHPoll.git "Repositorio GitHub")
y al desplegar el boton <code><> Code</code> tendrás que hacer click en <code>Download Zip</code>


### Directorio
Una vez descargado o clonado el proyecto <code>PHPoll-main.zip</code> deberás extraer el contenido. Debería quedar una carpeta llamada **/PHPoll-main**

Tendrás que renombrar la carpeta solamente a <code>PHPoll/</code> y la vas a mover a la carpeta **/htdocs** que mencioné al comienzo. 

Para validar que todo esté correcto, te comparto la ubicación o ruta final del directorio donde debería estar el proyecto.
- ##### C:\xampp\htdocs\PHPoll

### Dependencias
Las dependencias de este proyecto además de instalar el servidor y gestor, es crear la propia base de datos la cual se adjunta en los archivos de la carpeta **/sql** del repositorio. 

De todas maneras a continuación se muestran los script para crear la base de datos y las tablas necesarias para que el proyecto funcione.

- ##### Base de datos

```sql
CREATE DATABASE PHPoll;
USE PHPoll;

```


- ##### Creación de Tablas

```sql
CREATE TABLE CANDIDATO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255),
    rut VARCHAR(12),
    activo INT
);
```
```sql
CREATE TABLE REGION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    simbolo VARCHAR(10),
    activo INT
);
```
```sql
CREATE TABLE COMUNA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    id_region INT,
    activo INT,
    FOREIGN KEY (id_region) REFERENCES REGION(id)
);

```
```sql
CREATE TABLE VOTO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255),
    alias VARCHAR(50),
    rut VARCHAR(12),
    email VARCHAR(100),
    region INT,
    comuna INT,
    candidato INT,
    in_web INT,
    in_tv INT,
    in_rrss INT,
    in_amigo INT,
    activo INT,
    FOREIGN KEY (region) REFERENCES REGION(id),
    FOREIGN KEY (comuna) REFERENCES COMUNA(id),
    FOREIGN KEY (candidato) REFERENCES CANDIDATO(id)
);
```


- ##### Poblamiento de Datos

Es demasiada información adjuntar la inserción de datos para las tablas, pero aquí está un enlace para que puedan descargar el archivo **[populate-db.sql](https://github.com/mtapiagonzalez/PHPoll/blob/main/sql/populate-db.sql "Poblar Database")**

Las tablas que se deben abastecer para que todo funcione son en el siguiente orden:

**CANDIDATO** / **REGION** / **COMUNA**

- ##### Ejecución de Querys

Las querys deberán ser ejecutadas dentro del administrador de base de datos **phpMyAdmin**. 

En la siguiente sección se explica cómo levantar los servicios de **MySQL**.

-------------
### Ejecutar Proyecto

Para ejecutar el proyecto deberas iniciar primero el **XAMPP Control Panel**, puedes buscarlo en tu panel de windows o puedes abrirlo directamente en su directorio raíz. 
- C:\xampp\xampp-control.exe

Una vez abierto podrás ver que se nos muestra la opción de iniciar los servicios de:
Apache, MySQL, FileZilla, Mercury, Tomcat.

A nosotros nos interesa levantar sólamente los servicios de **Apache y MySQL** para que el proyecto **PHPoll** pueda funcionar de manera correcta. 

Damos click en <code>Start</code> en ambos servicios para iniciarlos.

![](https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Screenshots/EN_XAMPP_Control_Panel_2.PNG)


Una vez arriba los servicios, podemos dirigirnos a la página principal de bienvenida.
A través de cualquier navegador ingresa a:
- **[localhost/](localhost/ "Página de Bienvenida XAMPP")** 

Puedes ingresar directamente al gestor de base de datos en:

- **[localhost/phpmyadmin](localhost/phpmyadmin "phpMyAdmin")** 

Pero lo que realmente nos importa es visitar la aplicación web, nos vamos a dirigir a:

- **[localhost/PHPoll](localhost/PHPoll "PHPoll")** 

------------

### Requerimientos

A continuación se presenta la lista de requerimientos y su cumplimiento.

- Se utiliza **HTML, PHP, JavaScript, AJAX MySQL**. :white_check_mark:

- Se valida que los Inputs no queden en blanco, largo y limitaciones de carácteres. :white_check_mark:

- Los ComboBox se cargan desde la base y existe relación entre Región -> Comuna. :white_check_mark: 

- Se valida que al menos 2 checkbox estén seleccionados. :white_check_mark:

- Se valida el RUT y el formato de Correo Electrónico. :white_check_mark: 

- No permite registros duplicados. :white_check_mark: 

----

Antes de despedirme, voy a explicar cómo funciona la aplicación y en qué consiste.

**PHPoll** te permite realizar un voto por tu candidato favorito registrado hasta la fecha. Además te facilita la búsqueda por Región y filtros por Comuna. Además, surge la duda de cuál fue el canal de comunicación por el cual te enteraste de PHPoll.

*¡Recuerda, tienes sólo 1 voto!*

Sin mas que agregar, me despido agradecido por la oportunidad.

-Mathias Tapia González

----
### Bibliografía
Sección donde adjunto los enlaces que me sirvieron de referencia para construir esta aplicación. Muchas gracias por todo lo disponible al alcance.

##### SQL
- https://gist.github.com/gonzunigad/e22505055e485d782343b47c82b11f96
- https://www.php.net/manual/en/function.mysql-connect.php
- https://kafle.io/tutorials/php/MySQL
- https://www.w3schools.com/sql/sql_foreignkey.asp
##### CSS
- https://es.stackoverflow.com/questions/135207/como-alinear-input-de-formulario-con-labels
- https://www.w3schools.com/css/css_border.asp
- https://www.w3schools.com/cssref/pr_border-width.php

##### Valida RUT
- https://codepen.io/donpandix/pen/jWNNKj

##### Limita y Valida Input
- https://codepen.io/sakuragy/pen/oNPQWq

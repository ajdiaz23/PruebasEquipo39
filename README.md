# Miembros del equipo

| Nombre            | Correo                           |
| ----------------- | -------------------------------- |
| Axl Díaz          | aj.diaz23@uniandes.edu.co        |
| Diego Jaramillo   | df.jaramilloa1@uniandes.edu.co   |
| Nicolas Ibarra    | n.ibarra@uniandes.edu.co         |
| Andrés Rentería   | af.renteria2@uniandes.edu.co     |
| ----------------- | -------------------------------- |

# Instrucciones para la instalación y ejecución de las pruebas con Cypress

Luego de haber clonado el repositorio: https://github.com/ajdiaz23/Pruebas_MISO4103_2024_12_Equipo_21.git,
abra una terminal y ejecute los siguientes comandos:

- npm init -y
- npm install -g cypress

Si no se ha instalado correctamente cypress y sus respectivos plugins es necesario implementar los siguientes comandos:

- npm install faker
- npm install -D cypress-log-to-output
- npm install -D cypress-plugin-tab

Si con el anterior comando no se instala faker para probar todas las pruebas, pruebe con el siguiente comando:

- npm install @faker-js/faker --save-dev

Por ultimo,  para ejecutar las pruebas debe acceder a la carpeta "cypress" y luego en la terminal escribir el comando:
- cd cypress
- cypress run --headless

---

# Instrucciones para la instalación y ejecución de las pruebas con kraken

Luego de haber clonado el repositorio: https://github.com/ajdiaz23/Pruebas_MISO4103_2024_12_Equipo_21.git,
abra una terminal y ejecute los siguientes comandos en este orden:

- npm init -y
- npm install kraken-node
- npm install android-platform-tools
- npm install appium
- npx kraken-node gen

y para ejecutar use:

- npx kraken-node run

Por motivos de lo que parece ser un bug, debe probarse cada archivo por separado. Todos los archivos de prueba están ubicados en la carpeta:
.kraken\features\web\support\featuresToTest\

Para que las pruebas puedan correr sin problema se recomienda tener un único archivo de prueba en la carpeta:
.kraken\features\web\support\
y lanzar la prueba.

Luego intercambiar los archivos con los que están ubicados en la carpeta ..\featuresToTest\ y ejecutar cada vez y por separado.
De esta manera se logra evitar correr todos los archivos al tiempo y generar errores en las pruebas por falta de capacidad de procesamiento.

# Guía para levantar el proyecto Inventory Sales Management

## Requisitos previos

### Base de Datos
- PostgreSQL instalado en el sistema (versión 12 o superior).

### Backend
- Java 11 instalado.
- Apache Maven instalado.

### Frontend
- Node.js versión 20 (se recomienda usar `nvm` para un mejor control de versiones de Node.js).

---

## Instrucciones para configurar y ejecutar el proyecto

### 1. Base de Datos

1. **Configurar PostgreSQL:**
   - Asegúrate de que PostgreSQL esté instalado y corriendo en tu sistema.
   - Si no tienes PostgreSQL instalado, puedes seguir las instrucciones en la [documentación oficial](https://www.postgresql.org/download/).
   - Una vez que esté levantada la base, accedemos a la terminal y ejecutamos
   ```bash
   psql -U postgres -f database.sql
   ```
   Asegúrate de que el archivo `database.sql` esté en el directorio actual. Este script crea las tablas necesarias y las llena con datos iniciales.

---

### 2. Backend

0. **Especificar conexión de backend hacia la base**
   En el directorio del backend, dirigirse a `src/main/resources` y editar el archivo `application.yaml` especificando en la línea 8 la ip y puerto donde está alojada la base

1. **Compilar el backend:**
   Ve al directorio del backend y ejecuta el siguiente comando para construir el archivo `.jar` del proyecto:
   ```bash
   mvn clean install
   ```

2. **Ejecutar el backend:**
   Una vez que el archivo `.jar` se haya generado, ejecútalo con:
   ```bash
   java -jar target/inventory-sales-mgmt-1.0.0.jar
   ```
   Esto iniciará el servidor backend.

---

### 3. Frontend

1. **Configurar Node.js:**
   - Verificar que Node.js versión 20 está instalado. Si no, se sugiere usar `nvm` para instalarla:
     ```bash
     nvm install 20
     nvm use 20
     ```

2. **Instalar dependencias:**
   Ve al directorio del frontend y ejecutar:
   ```bash
   npm install
   ```

3. **Ejecutar el frontend:**
   Una vez instaladas las dependencias, ejecutar:
   ```bash
   npm start
   ```
   Esto iniciará el aplicativo del front y se mostrará en el navegador predeterminado.

---

## Notas

- **Asegúrate de que el backend y el frontend estén corriendo simultáneamente** para que el proyecto funcione correctamente.
- **Frontend:** Si el backend corre en un host o puerto diferente, asegúrate de actualizar la configuración de la URL del API en el frontend.

# 📦 Mundo ALY - Backend API

¡Bienvenido al repositorio oficial del Backend de **Mundo ALY**! Esta es la API RESTful encargada de gestionar la lógica de negocio, el almacenamiento de datos y el procesamiento de compras para nuestra tienda de ropa femenina en línea. 

Este backend provee todos los servicios necesarios para alimentar la interfaz desarrollada en Angular.

## 🚀 Características Principales
* **API RESTful Estructurada:** Endpoints normalizados, limpios y optimizados para el consumo del frontend.
* **Gestión de Catálogo:** Operaciones CRUD completas para productos y organización automática por categorías (Bodys, Vestidos y Básicas).
* **Control de Inventario y Órdenes:** Lógica centralizada para procesar compras y gestionar el flujo de `/checkout`.
* **Arquitectura Escalable:** Estructura modular de carpetas que facilita el mantenimiento y la futura expansión del sistema.

## 🛠️ Tecnologías Utilizadas
* **Node.js** (Entorno de ejecución de JavaScript)
* **Express** (Framework web rápido y minimalista)
* **MongoDB / Mongoose** (Base de datos NoSQL para un catálogo flexible)
* **Cors** (Gestión de seguridad para permitir peticiones desde el frontend en Angular)

---

## 📂 Organización del Proyecto

El código del servidor está estructurado de forma modular para separar responsabilidades:

```text
mundo-aly-backend/
├── src/
│   ├── config/         # Conexión a la base de datos y variables globales
│   ├── controllers/    # Lógica de negocio (procesamiento de peticiones)
│   ├── models/         # Esquemas y modelos de datos (Product, Category, Order)
│   ├── routes/         # Definición de rutas y endpoints de la API
│   └── server.js       # Punto de entrada y configuración inicial del servidor
├── .env.example        # Plantilla para la configuración de variables de entorno
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Documentación del repositorio
```

---

## 💻 Instalación y Ejecución Local

Sigue estos pasos para clonar el proyecto y poner en marcha el servidor de desarrollo en tu entorno local:

1. **Clonar este repositorio:**
   ```bash
   git clone https://github.com
   ```

2. **Acceder a la carpeta del proyecto:**
   ```bash
   cd mundo-aly-backend
   ```

3. **Instalar todas las dependencias necesarias:**
   ```bash
   npm install
   ```

4. **Configurar las variables de entorno:**
   Duplica el archivo `.env.example`, renombralo como `.env` e introduce tus credenciales locales:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mundo_aly
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

El servidor comenzará a escuchar peticiones en: `http://localhost:3000/api`

---

## 🗺️ Endpoints Principales (API v1)

### 👗 Productos y Categorías
* `GET /api/products` - Obtener el listado de ropa (permite filtrar por categorías como Bodys, Vestidos, Básicas).
* `GET /api/products/:id` - Obtener el detalle y stock de una prenda específica.
* `GET /api/categories` - Obtener las categorías activas de la tienda.

### 🛒 Carrito y Compras
* `POST /api/orders` - Recibir los datos de compra del frontend y generar una orden de pago.

---

## 📈 Roadmap (Próximas Mejoras)
* [ ] Integrar pasarela de pagos en línea (Stripe / Mercado Pago).
* [ ] Conectar un servicio de almacenamiento en la nube (Cloudinary / AWS S3) para las imágenes de las prendas.

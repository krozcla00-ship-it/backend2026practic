// 1 importar la dependencias
import express from 'express'
import dotenv from 'dotenv'
import { connectionMongo } from './src/config/dataBase.js';
import { usersRouter } from './src/routes/users.routes.js'
import { productsRouter } from './src/routes/products.routes.js'

//  2 crear configuraciones
const app = express()//llamar a express para crear la app
dotenv.config()// llama las variables de entorno del archivo .env
let port = process.env.PORT;
connectionMongo() //llama a la funcion de conexion a la base de datos
app.use(express.json())//configura la app para que pueda recibir datos en formato json

// 3 rutas
app.get('/', (req, res) => {
    res.send('hola desde mi backend')
})
app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);

// 4 iniciar el servidor
app.listen(port, () => {
    console.log(`servidor ejecutando http://localhost:${port}`)
})


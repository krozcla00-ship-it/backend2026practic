import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectionMongo } from './src/config/dataBase.js';
import { usersRouter } from './src/routes/users.routes.js'
import { productsRouter } from './src/routes/products.routes.js'
import { messagesRouter } from './src/routes/messages.routes.js';

import orderRoutes from './src/routes/order.routes.js'; 



const app = express()
dotenv.config()
let port = process.env.PORT || 3000;

connectionMongo()


app.use(cors()) 
app.use(express.json()) 


app.get('/', (req, res) => {
    res.send('hola desde mi backend')
})

app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);
app.use('/mensajes',messagesRouter)
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`servidor ejecutando http://localhost:${port}`)
})

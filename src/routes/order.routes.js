import express from 'express';
const router = express.Router();

import { productModel as ProductModel } from '../models/products.models.js';
import OrderModel from '../models/Order.model.js';



router.post('/checkout', async (req, res) => {
    try {
    const { userId, items } = req.body; 

    if (!items || items.length === 0) {
    return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    let totalAmount = 0;
    const finalItems = [];


    for (const item of items) {
    const dbProduct = await ProductModel.findById(item._id);

    if (!dbProduct) {
        return res.status(404).json({ mensaje: `El producto "${item.name}" ya no existe en el catálogo` });
    }


    if (dbProduct.stock < item.quantity) {
        return res.status(400).json({ 
        mensaje: `Stock insuficiente para "${dbProduct.name}". Disponibles: ${dbProduct.stock}` 
        });
    }


    dbProduct.stock -= item.quantity;
    await dbProduct.save();

    
      totalAmount += dbProduct.price * item.quantity;

    finalItems.push({
        productId: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity: item.quantity
    });
    }


    const nuevaOrden = new OrderModel({
    user: userId || '650f1a2b3c4d5e6f7a8b9c0d', 
    items: finalItems,
    totalAmount: totalAmount
    });

    await nuevaOrden.save();


    res.status(201).json({
    mensaje: 'Compra procesada y registrada con éxito',
    datos: nuevaOrden
    });

} catch (error) {
    console.error('Error en el checkout:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al procesar la compra' });
}
});


router.get('/usuario/:userId', async (req, res) => {
try {
    const { userId } = req.params;


    const historial = await OrderModel.find({ user: userId }).sort({ createdAt: -1 });

    
    if (!historial || historial.length === 0) {
    return res.status(200).json({
        mensaje: 'Este usuario no tiene compras registradas',
        datos: []
    });
    }

    
    res.status(200).json({
    mensaje: 'Historial de compras recuperado con éxito',
    datos: historial
    });

} catch (error) {
    console.error('Error al obtener el historial:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al cargar el historial' });
}
});


export default router;

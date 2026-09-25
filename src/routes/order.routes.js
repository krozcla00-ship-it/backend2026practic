import express from 'express';
const router = express.Router();

import { productModel as ProductModel } from '../models/products.models.js';
import OrderModel from '../models/Order.model.js';
// 1. IMPORTAMOS EL MIDDLEWARE USANDO TU ESTILO DE ES MODULES
import auth from '../middleware/auth.js'; 

// POST: Procesar la compra (Ruta Protegida con 'auth')
router.post('/checkout', auth, async (req, res) => {
  try {
    const { items } = req.body; // Ya no necesitamos recibir el userId desde el body

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

    // 2. EXTRAEMOS EL ID REAL DIRECTAMENTE DEL TOKEN VERIFICADO
    const nuevaOrden = new OrderModel({
      user: req.usuario.id, 
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

// GET: Obtener el historial del usuario que está logueado (Ruta Protegida con 'auth')
router.get('/historial', auth, async (req, res) => {
  try {
    // 3. OBTENEMOS EL ID DESDE EL TOKEN (Ya no dependemos de req.params)
    const userIdReal = req.usuario.id; 

    const historial = await OrderModel.find({ user: userIdReal }).sort({ createdAt: -1 });
    
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
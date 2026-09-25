// 1. CORRECCIÓN: Importar mongoose correctamente con la sintaxis ESM
import mongoose from 'mongoose'; 

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      name: { type: String, required: true },
      price: { type: Number, required: true }, 
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'pagado', 'enviado', 'cancelado'],
    default: 'pendiente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 2. CORRECCIÓN: Definir el modelo antes de exportarlo
const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel; 

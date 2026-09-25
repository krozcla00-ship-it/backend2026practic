import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

export const MessageModel = model('Message', messageSchema);

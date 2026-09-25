import { Router } from 'express';
import { MessageModel } from '../models/message.model.js';

export const messagesRouter = Router();

messagesRouter.post('/', async (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body;

        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const nuevoMensaje = new MessageModel({ nombre, correo, mensaje });
        await nuevoMensaje.save();

        res.status(201).json({ mensaje: 'Mensaje recibido y guardado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al guardar el mensaje' });
    }
});

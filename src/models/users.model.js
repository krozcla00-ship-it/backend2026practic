// 1 importar las dependencias  
import mongoose from "mongoose";

// 2 crear el esquema de usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// 3 crear el modelo de usuario: es el que permite definir las acciones que crearemos con los controladores
export  const userModel  = mongoose.model("User", userSchema);

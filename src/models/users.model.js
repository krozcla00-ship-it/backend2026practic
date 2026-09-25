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
    },

    rol: {
type: String,
enum: ['user', 'admin'], 
default: 'user'          
}
});


export  const userModel  = mongoose.model("User", userSchema);

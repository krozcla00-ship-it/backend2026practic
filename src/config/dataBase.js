// 1 importar las dependencias
import mongoose from "mongoose";


// 2 establecer la conexion a la base de datos
export async function connectionMongo() {
// manejos de errores 
    try{
        await mongoose.connect(process.env.URI_MONGO);
        console.log('conexion a la base de datos establecida');
    }
    catch(error){
        console.error('error al conectar a la base de datos', error);
    }

}
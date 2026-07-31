//los controladores -> gestionan la logica de las peticiones y respuestas de la API

import { productModel } from "../models/products.models.js";

//peticion post -> crear un producto
export function postProduct(request, response) {

    try {

        const newProduct = await productModel.create(request.body);

        return response.status(200).json({message: "Producto creado correctamente", product: newProduct})


    } catch  (error) {
        return  response.status(500).json({message: "Error al crear el producto", error: error || error.message,})
    }
}


//peticion get -> obtener  productos
export const getProduct = async (request, response) => {

    // LÓGICA DE LA PETICIÓN GET (IMPORTANTE -> manejo de errores)

    try {
        // método find() -> mostrarme todo lo que encuentra en la base de datos
        let products = await productModel.find();

        // podemos agregar validaciones 
        // Qué pasa si no hay nada almacenado en la base de datos
        if(products.length === 0){
            return response.status(200).json({
                mensaje: 'No se encontraron productos en la base de datos'
            });
        }

        // Si sí tiene productos guardados,que me los muestre
        return response.status(200).json({
            mensaje: 'Estos son todos los productos encontrados',
            datos: products
        });


    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al buscar los productos',
            problem: error || error.message 
        });
    }

}

//peticion put -> actualizar  producto

export const putProductById = async (request, response) => {

    // LÓGICA DE LA PETICIÓN PUT
    try {
        let idForPut = request.params.id; //el parámetro id del producto que queremos actualizar
        let dataForUpdate = request.body; //pasarle la información actualizada

                                                //2 parámetros, primero el id y luego la info actualizada
        const productUpdated = await productModel.findByIdAndUpdate(idForPut, dataForUpdate);

        // validación cuando el id no es correcto o no existe
        // !productUpdated -> negación de una variable -> no hay nada en esa variable -> falsa
        if(!productUpdated){
            return response.status(404).json({
                mensaje: 'Lo siento! No se encontró producto para actualizar'
            });
        }

        return response.status(200).json({
            mensaje: 'Se actualizó el producto correctamente',
            datos: productUpdated
        });

        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al actualizar producto',
            problem: error || error.message 
        });
    }
}


//peticion delete -> eliminar  producto

export const deleteProductById = async (request, response) => {

    // LÓGICA DE LA PETICIÓN DELETE
    try {
        let idForDelete = request.params.id;
        // lo que se elimina no lo tenemos que guardar en variables
        // escuentreme el producto con ese id y elimínelo
        await productModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            mensaje: 'Producto eliminado satisfactoriamente'
        });
        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Ocurrió un error al eliminar producto',
            problem: error || error.message 
        });
    }
}
const productSchema = new mongoose.Schema({
    //este nombre lo eligen usted, son caracteristicas de la info que quiere guardar
    image:{type: String, required: true}, 
    name: {type: String, required: true},
    category:{type:String, required: false},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    isAvailable: {type: Boolean}, //true o false -> buleano

});

export const productModel = mongoose.model("Product", productSchema);
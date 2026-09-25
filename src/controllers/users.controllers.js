import { userModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// PETICIÓN POST -> Crear usuarios con contraseña encriptada y rol por defecto
export async function createUser(request, response) {
    try {
        // 1. Agregamos 'rol' a la desestructuración de la petición (opcional por si lo mandas desde el front)
        const { name, email, password, rol } = request.body;
        const codedPassword = await bcrypt.hash(password, 10);

        // 2. Al crear el usuario, asignamos el rol recibido o por defecto 'user' (cliente normal)
        const newUser = await userModel.create({
            name,
            email,
            password: codedPassword,
            rol: rol || 'user' 
        });

        return response.status(200).json({
            menssage: 'Usuario creado correctamente',
            user: newUser
        });

    } catch (error) {
        return response.status(500).json({
            menssage: 'Ocurrió un error al crear un usuario',
            problema: error || error.message
        });
    }
}

// PETICIÓN GET -> Obtener usuarios
export async function showUsers(req, res){
    try {
        let users = await userModel.find();
        if (users.length === 0) {
            return res.status(200).json({
                mensaje: 'No hay usuarios almacenados'
            });
        }

        return res.status(200).json({
            menasaje: 'Se encontraron usuarios almacenados',
            numeroUsuarios: users.length,
            datos: users
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrió un error al mostrar los usuarios',
            problema: error || error.message
        });
    }
}

// PETICIÓN POST -> Hacer un inicio de sesión (login) con validación de contraseña y rol
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debes proporcionar el correo y la contraseña",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas",
            });
        }

        const passwordValido = await bcrypt.compare(password, user.password);

        if (!passwordValido) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas",
            });
        }

        // 3. MODIFICACIÓN CRÍTICA: Inyectamos el rol del usuario en el payload del JWT
        // Agrupamos bajo un objeto 'usuario' para que coincida exactamente con la decodificación de Angular
        const token = jwt.sign(
            {
                usuario: {
                    id: user._id,
                    email: user.email,
                    rol: user.rol || 'user' // Si no está definido en el modelo, toma 'user' por seguridad
                }
            },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } 
        );

        // 4. Respondemos con el token y añadimos un objeto resumen opcional
        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token,
            rol: user.rol || 'user' // Enviado explícitamente por si el front lo necesita directo
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error al iniciar sesión",
            problema: error.message || error,
        });
    }
};
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // 1. Leer el token que viene en la cabecera HTTP
  const token = req.header('x-auth-token');

  // 2. Revisar si el Token no existe
  if (!token) {
    return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });
  }

  // 3. Validar el token
  try {
    // Reemplaza esto por tu clave secreta de firma (idealmente usando process.env.JWT_SECRET)
    const cifrado = jwt.verify(token, 'PALABRA_SECRETA_DE_TU_MARCA');
    
    // Inyectamos los datos del usuario autenticado en el objeto request
    req.usuario = cifrado.usuario; 
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token no válido o expirado' });
  }
};

export default authMiddleware;
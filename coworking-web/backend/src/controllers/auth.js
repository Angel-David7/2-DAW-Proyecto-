const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    // Validación de campos requeridos
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verifica si el correo ya está registrado
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Encripta la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Inserta el usuario en la base de datos
    const [user] = await db('users')
      .insert({ name, surname, email, password: hash, role: 'user' }, ['id', 'role']);

    // Verifica que JWT_SECRET esté definida
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Falta JWT_SECRET en las variables de entorno' });
    }

    // Genera el token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Respuesta con token y datos del usuario
    res.json({
      token,
      user: {
        id: user.id,
        name,
        surname,
        email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ message: 'Error en el servidor al registrar el usuario' });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    // Buscar el usuario en la base de datos
    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verifica que JWT_SECRET esté definida
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Falta JWT_SECRET en las variables de entorno' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Respuesta
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
  }
};

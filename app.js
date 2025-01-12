const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Array de objetos con los datos de los usuarios
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// Leer todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios); // muestra el array usuarios en formato json
});


// Leer usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(user => user.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
});


// Actualizar usuario por nombre. !! REVISAR PORQUE NO ACTUALIZA EL NOMBRE !!
app.put('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex(user => user.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    usuarios[index] = { ...usuarios[index], ...req.body }; // combina objeto de array con datos pasados en la petición
    res.json(usuarios[index]);
});


// Crear nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.status(200).json(nuevoUsuario);
});


// Eliminar usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const usuariosFiltrados = usuarios.filter(user => user.nombre.toLowerCase() !== req.params.nombre.toLowerCase());
    if (usuarios.length === usuariosFiltrados.length) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    usuarios = usuariosFiltrados;
    res.json({ mensaje: 'Usuario eliminado correctamente' });
});



// Iniciamos servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en puerto: ${port}`);
});

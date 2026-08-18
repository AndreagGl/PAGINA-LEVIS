const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let verificationCodes = {}; // Almacena los códigos generados

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rebecccccccc@gmail.com', // Tu correo
        pass: '12345'        // Tu contraseña o token de aplicación
    }
});

// Ruta para enviar el código
app.post('/send-code', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send('Correo requerido.');

    const code = generateCode(5); // Generar código aleatorio
    verificationCodes[email] = code; // Guardar el código temporalmente

    try {
        await transporter.sendMail({
            from: 'sotomrebeca@gmail.com',
            to: email,
            subject: 'Código de verificación Levi\'s',
            text: `Tu código de verificación es: ${code}`
        });
        res.status(200).send('Código enviado.');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo.');
    }
});

function generateCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));

const { Router } = require('express');
const User = require('./models/User.js');
const Code = require('./models/Code.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { SECRET_KEY, USER_EMAIL, PASSWORD_EMAIL } = require ('./config.js');
const verifyToken = require('./verifyToken.js');
const { createAccount, recoverAccount, updateAccount } = require('./templates.js');
const router = Router();

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = new User({
        username: username,
        email: email,
        password: password
    });

    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    res.json({auth: true, token})
});

router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId);
    
    if (!user) { return res.status(404).send('Usuario no encontrado'); }
    res.json(user);
});

router.post('/signin', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username});
    
    if (!user) { return res.status(404).send("Usuario incorrecto"); }
    const validPassword = await user.validatePassword(password);
    
    if (!validPassword) { return res.status(404).send("Contraseña incorrecta"); }
    const token = jwt.sign({id: user._id}, SECRET_KEY, { expiresIn: 60 * 60 * 24 });

    res.json({auth: true, token});
});

router.post('/verifyEmailRegister', async (req, res, next) => {
    const { email, username } = req.body;
    
    const verifyUser = await User.findOne({username: username});
    const verifyUserEmail = await User.findOne({email: email});
    const verifyCodeEmail = await Code.findOne({email: email});

    if (verifyUser) { return res.status(400).send("El usuario ya existe"); }
    if (verifyUserEmail) { return res.status(400).send("El correo ya existe"); }
    if (verifyCodeEmail) { return res.status(400).send("Ya ha sido enviado el correo de verificación a este correo"); }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) { return res.status(400).send('Correo inválido'); }
    
    const codeRandom = Math.floor(Math.random() * 900000) + 100000;
    const verifyEmailHtml = await createAccount(username, codeRandom);

    const code = new Code({ 
        email: email,
        code: codeRandom,
        createAt: new Date()
    });

    await code.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_EMAIL,
            pass: PASSWORD_EMAIL
        }
    });

    const emailOptions = {
        from: USER_EMAIL,
        to: email,
        subject: 'Confirmar dirección de correo electrónico para ConsulToria',
        html: verifyEmailHtml
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Fallo al enviar el correo de verificación');
        } else {
            console.log('Email send: ' + info.response);
            res.status(200).send('Correo de verificación enviado con éxito');
        }
    });
});

router.post('/verifyCode', async (req, res) => {
    const { email, code } = req.body;

    const findCode = await Code.findOne({ email: email, code: code });
    if (!findCode) {
        res.status(400).send('El código es incorrecto');
    } else {
        await Code.deleteOne({ email: email, code: code });
        res.status(200).send('El correo ha sido verificado con éxito');
    }
});

router.post('/recoverAccount', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(400).send('El correo no existe');
    } else {
        user.password = await user.encryptPassword(password);
        await user.save();
    
        res.status(200).send('La contraseña ha sido modificada con éxito');
    }
});

router.post('/verifyEmailRecover', async (req, res, next) => {
    const { email } = req.body;

    const verifyUser = await User.findOne({email: email});
    const verifyCodeEmail = await Code.findOne({email: email});
    
    if (!verifyUser) { return res.status(400).send("El correo no existe"); }
    if (verifyCodeEmail) { return res.status(400).send("Ya ha sido enviado el correo de verificación a este correo"); }

    const username = verifyUser.username;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) { return res.status(400).send('Correo inválido'); }
    
    const codeRandom = Math.floor(Math.random() * 900000) + 100000;
    const verifyEmailHtml = await recoverAccount(username, codeRandom);

    const code = new Code({ 
        email: email,
        code: codeRandom,
        createAt: new Date()
    });

    await code.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_EMAIL,
            pass: PASSWORD_EMAIL
        }
    });

    const emailOptions = {
        from: USER_EMAIL,
        to: email,
        subject: 'Confirmar dirección de correo electrónico para ConsulToria',
        html: verifyEmailHtml
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Fallo al enviar el correo de verificación');
        } else {
            console.log('Email send: ' + info.response);
            res.status(200).send('Correo de verificación enviado con éxito');
        }
    });
});

router.post('/accessAccount', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username});
    
    if (!user) { return res.status(404).send("Usuario incorrecto"); }
    const validPassword = await user.validatePassword(password);
    
    if (!validPassword) { return res.status(404).send("Contraseña incorrecta"); }
    const token = jwt.sign({id: user._id}, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    
    res.json({auth: true, message: 'success'});
});

router.post('/verifyEmailUpdate', async (req, res, next) => {
    const { email, username, olduser, oldemail } = req.body;
    
    const verifyUser = await User.findOne({username: username});
    const verifyUserEmail = await User.findOne({email: email});
    const verifyCodeEmail = await Code.findOne({email: email});

    if (olduser != username) {
        if (verifyUser) { return res.status(400).send("El usuario ya existe"); }
    } else if (oldemail != email) {
        if (verifyUserEmail) { return res.status(400).send("El correo ya existe"); }
    }

    if (verifyCodeEmail) { return res.status(400).send("Ya ha sido enviado el correo de verificación a este correo"); }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) { return res.status(400).send('Correo inválido'); }
    
    const codeRandom = Math.floor(Math.random() * 900000) + 100000;
    const verifyEmailHtml = await updateAccount(username, codeRandom);

    const code = new Code({ 
        email: email,
        code: codeRandom,
        createAt: new Date()
    });

    await code.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_EMAIL,
            pass: PASSWORD_EMAIL
        }
    });

    const emailOptions = {
        from: USER_EMAIL,
        to: email,
        subject: 'Confirmar dirección de correo electrónico para ConsulToria',
        html: verifyEmailHtml
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Fallo al enviar el correo de verificación');
        } else {
            console.log('Email send: ' + info.response);
            res.status(200).send('Correo de verificación enviado con éxito');
        }
    });
});

router.post('/updateAccount', async (req, res) => {
    const { username, email, password, olduser } = req.body;
    const user = await User.findOne({ username: olduser });

    if (!user) {
        res.status(400).send('El usuario no existe');
    } else {
        user.username = username;
        user.email = email;
        user.password = await user.encryptPassword(password);
        await user.save();

        res.status(200).send('Su cuenta ha sido modificada con éxito');
    }
});

module.exports = router;
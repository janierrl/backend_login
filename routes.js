const { Router } = require("express");
const User = require("./models/User.js");
const Code = require("./models/Code.js");
const Enterprise = require("./models/Enterprise.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const formidable = require("formidable");
const { SECRET_KEY, USER_EMAIL, PASSWORD_EMAIL } = require("./config.js");
const verifyToken = require("./verifyToken.js");
const {
  createAccount,
  recoverAccount,
  updateAccount,
} = require("./templates.js");
const router = Router();

router.post("/signup", async (req, res, next) => {
  const { name, lastname, username, email, password, enterprise } = req.body;

  const user = new User({
    name: name,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
    photo: "",
    enterprise: enterprise,
  });

  user.password = await user.encryptPassword(user.password);
  await user.save();

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token });
});

router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.json(user);
  } catch (error) {
    return res.status(500).send("Error al obtener datos del usuario");
  }
});

router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).send("Usuario o contraseña incorrectos");
  }
  const validPassword = await user.validatePassword(password);

  if (!validPassword) {
    return res.status(404).send("Usuario o contraseña incorrectos");
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token });
});

router.post("/verifyEmailRegister", async (req, res, next) => {
  const { email, username } = req.body;

  const verifyUser = await User.findOne({ username: username });
  const verifyUserEmail = await User.findOne({ email: email });
  const verifyCodeEmail = await Code.findOne({ email: email });

  if (verifyUser) {
    return res.status(400).send("El usuario ya existe");
  }
  if (verifyUserEmail) {
    return res.status(400).send("El correo ya existe");
  }
  if (verifyCodeEmail) {
    return res
      .status(400)
      .send("Ya ha sido enviado el correo de verificación a este correo");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Correo inválido");
  }

  const codeRandom = Math.floor(Math.random() * 900000) + 100000;
  const verifyEmailHtml = await createAccount(username, codeRandom);

  const code = new Code({
    email: email,
    code: codeRandom,
    createAt: new Date(),
  });

  await code.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER_EMAIL,
      pass: PASSWORD_EMAIL,
    },
  });

  const emailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: "Confirmar dirección de correo electrónico para ConsulToria",
    html: verifyEmailHtml,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Fallo al enviar el correo de verificación");
    } else {
      console.log("Email send: " + info.response);
      res.status(200).send("Correo de verificación enviado con éxito");
    }
  });
});

router.post("/verifyCode", async (req, res) => {
  const { email, code } = req.body;

  const findCode = await Code.findOne({ email: email, code: code });
  if (!findCode) {
    res.status(400).send("El código es incorrecto");
  } else {
    await Code.deleteOne({ email: email, code: code });
    res.status(200).send("El correo ha sido verificado con éxito");
  }
});

router.post("/recoverAccount", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).send("El correo no existe");
  } else {
    user.password = await user.encryptPassword(password);
    await user.save();

    res.status(200).send("La contraseña ha sido modificada con éxito");
  }
});

router.post("/verifyEmailRecover", async (req, res, next) => {
  const { email } = req.body;

  const verifyUser = await User.findOne({ email: email });
  const verifyCodeEmail = await Code.findOne({ email: email });

  if (!verifyUser) {
    return res.status(400).send("El correo no existe");
  }
  if (verifyCodeEmail) {
    return res
      .status(400)
      .send("Ya ha sido enviado el correo de verificación a este correo");
  }

  const username = verifyUser.username;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Correo inválido");
  }

  const codeRandom = Math.floor(Math.random() * 900000) + 100000;
  const verifyEmailHtml = await recoverAccount(username, codeRandom);

  const code = new Code({
    email: email,
    code: codeRandom,
    createAt: new Date(),
  });

  await code.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER_EMAIL,
      pass: PASSWORD_EMAIL,
    },
  });

  const emailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: "Confirmar dirección de correo electrónico para ConsulToria",
    html: verifyEmailHtml,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Fallo al enviar el correo de verificación");
    } else {
      console.log("Email send: " + info.response);
      res.status(200).send("Correo de verificación enviado con éxito");
    }
  });
});

router.post("/accessAccount", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).send("Usuario incorrecto");
  }
  const validPassword = await user.validatePassword(password);

  if (!validPassword) {
    return res.status(404).send("Contraseña incorrecta");
  }

  res.json({ auth: true, message: "success" });
});

router.post("/verifyEmailUpdate", async (req, res, next) => {
  const { email, username, olduser, oldemail } = req.body;

  const verifyUser = await User.findOne({ username: username });
  const verifyUserEmail = await User.findOne({ email: email });
  const verifyCodeEmail = await Code.findOne({ email: email });

  if (olduser != username) {
    if (verifyUser) {
      return res.status(400).send("El usuario ya existe");
    }
  } else if (oldemail != email) {
    if (verifyUserEmail) {
      return res.status(400).send("El correo ya existe");
    }
  }

  if (verifyCodeEmail) {
    return res
      .status(400)
      .send("Ya ha sido enviado el correo de verificación a este correo");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Correo inválido");
  }

  const codeRandom = Math.floor(Math.random() * 900000) + 100000;
  const verifyEmailHtml = await updateAccount(username, codeRandom);

  const code = new Code({
    email: email,
    code: codeRandom,
    createAt: new Date(),
  });

  await code.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER_EMAIL,
      pass: PASSWORD_EMAIL,
    },
  });

  const emailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: "Confirmar dirección de correo electrónico para ConsulToria",
    html: verifyEmailHtml,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Fallo al enviar el correo de verificación");
    } else {
      console.log("Email send: " + info.response);
      res.status(200).send("Correo de verificación enviado con éxito");
    }
  });
});

router.post("/updateAccount", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      const { name, lastname, username, email, password, photo, olduser } =
        fields;
      const user = await User.findOne({ username: olduser[0] });

      if (!user) {
        res.status(400).send("El usuario no existe");
      } else {
        user.name = name[0];
        user.lastname = lastname[0];
        user.username = username[0];
        user.email = email[0];
        user.password = await user.encryptPassword(password[0]);
        user.photo = photo[0];
        await user.save();

        res.status(200).send("Su cuenta ha sido modificada con éxito");
      }
    });
  } catch (error) {
    res.status(500).send("Error al actulizar la cuenta");
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({}, "username");
    const usernames = users.map((user) => user.username);

    res.json(usernames);
  } catch (error) {
    res.status(500).send("Error al obtener los nombres de los consultores");
  }
});

router.post("/setEnterprise", async (req, res, next) => {
  const { name, bucket } = req.body;

  const enterprise = new Enterprise({
    name: name,
    bucket: bucket,
  });

  await enterprise.save();

  res.json({ create: true });
});

router.get("/getEnterprises", async (req, res) => {
  try {
    const enterprises = await Enterprise.find({}, "name");
    const enterprisenames = enterprises.map((enterprise) => enterprise.name);

    res.json(enterprisenames);
  } catch (error) {
    res.status(500).send("Error de conexión");
  }
});

router.post("/getBucket", async (req, res) => {
  try {
    const enterprise = await Enterprise.findOne({ name: req.body.enterprise });
    const bucket = enterprise.bucket;

    res.json(bucket);
  } catch (error) {
    res.status(500).send("Error de conexión");
  }
});

module.exports = router;

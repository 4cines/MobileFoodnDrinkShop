const selectUserQuery = require("../../db/queries/users/selectUserQuery");
const {generateError} = require("../../helpers");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  try {
    const {user, password} = req.body;

    if (!user || !password) {
      generateError("Complete todos los campos", 400);
    }

    const dataUser = await selectUserQuery(user);

    if (dataUser.length < 1) {
      generateError("Usuario no válido", 404);
    }

    const dbPswrd = dataUser[0].Contrasenya;

    const userPasswordHash = crypto.createHash('md5').update(password).digest('hex');

    if (userPasswordHash !== dbPswrd) {
       generateError("Contraseña incorrecta", 401);
    }
     
    const userInfo = {
      id: dataUser[0].Id_user.toString(),
    };

    const token = jwt.sign(userInfo, process.env.SECRET, {
      expiresIn: "7d",
    });


    res.send({
      status: "ok",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
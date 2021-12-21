const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../../models");
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    //validate
    const schema = joi.object({
      name: joi.string().min(4).required(),
      email: joi.string().email().min(6).required(),
      password: joi.string().min(6).required(),
    });
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.status(404).send({
        status: "failed",
        message: error.details[0].message,
      });
    }

    //check Users
    const checkUsers = await user.findOne({
      where: { email },
    });
    if (checkUsers) {
      return res.send({
        status: "failed",
        message: "email & password sudah terdaftar",
      });
    }
    //enkripsy password
    const passwordStrength = 10;
    const passwordHashed = await bcrypt.hash(password, passwordStrength);
    //create user
    const createUser = await user.create({
      ...req.body,
      password: passwordHashed,
    });

    //token
    const token = jwt.sign({ user: createUser.id }, "aodeijao");
    const username = createUser.name;

    res.send({
      status: "success",
      message: "Selamat Anda telah terdaftar",
      data: {
        user: createUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().min(6).required(),
    });
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.status(404).send({
        status: "failed",
        message: error.details[0].message,
      });
    }
    const getUsers = await user.findOne({
      where: { email },
    });
    if (!getUsers) {
      return res.status(404).send({
        status: "failed",
        message: "email and password don't match",
      });
    }
    //compare password
    const isValidPassword = await bcrypt.compare(password, getUsers.password);
    if (!isValidPassword) {
      return res.status(400).send({
        status: "failed",
        message: "password salah",
      });
    }
    const token = jwt.sign({ email: getUsers.email }, "aodeijao");
    res.send({
      status: "success",
      data: {
        user: getUsers,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

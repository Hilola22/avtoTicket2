const { sendErrorResponse } = require("../helpers/send.error.response");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Role = require("../models/role.model");

const addUser = async (req, res) => {
  try {
    const { full_name, phone_number, email, password, confirm_password } =
      req.body;

    const condidate = await User.findOne({ where: { email } });
    if (condidate) {
      return sendErrorResponse({ message: "User not found" }, res);
    }

    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Passwords not match" }, res);
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      full_name,
      phone_number,
      email,
      hashed_password,
    });

    res.status(201).send({ message: "New user added!", newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
      attributes: ["full_name", "phone_number"],
    });
    res.status(200).send({ data: users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateUser = await User.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "User updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy({
      where: { id },
    });

    if (!deleteUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  findAll,
  findOne,
  update,
  remove,
};

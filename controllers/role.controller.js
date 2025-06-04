const { sendErrorResponse } = require("../helpers/send.error.response");
const Role = require("../models/role.model");
const User = require("../models/user.model");

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const position = await Role.findOne({
      where: { name: name.toLowerCase() },
    });
    if (position) {
      return sendErrorResponse({ message: "Bunday role mavjud" }, res);
    }

    const newRole = await Role.create({
      name: name.toLowerCase(),
      description,
    });

    res.status(201).send({ message: "New role added!", newRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          attributes: ["name"]
        }],
    });
    res.status(200).send({ data: roles });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      return res.status(404).send({ message: "Role not found" });
    }
    res.status(200).send({ data: role });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateRole = await Role.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Role updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRole = await Role.destroy({
      where: { id },
    });

    if (!deleteRole) {
      return res.status(404).send({ message: "Role not found" });
    }

    res.status(200).send({ message: "Role deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRole,
  findAll,
  findOne,
  update,
  remove,
};

const { sendErrorResponse } = require("../helpers/send.error.response");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const UserRole = require("../models/user_role.model");

const addUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId, {
      include: { model: Role, attributes: ["id"] },
    });
    if (!user) {
      return sendErrorResponse({ message: "Bunday user mavjud emas" }, res);
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse({ message: "Bunday role mavjud emas" }, res);
    }

    const hasRole = user.roles.some((r) => r.id !== roleId);
    if (hasRole) {
      return sendErrorResponse(
        { message: "Bunday role allaqachon mavjud" },
        res
      );
    }

    const newUserRole = await UserRole.create({ userId, roleId });

    res.status(201).send({ message: "New user role added!", newUserRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).send({ data: userRoles });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const userRole = await UserRole.findOne({ where: { id } });
    if (!userRole) {
      return res.status(404).send({ message: "User role not found" });
    }
    res.status(200).send({ data: userRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateUserRole = await UserRole.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "User role updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUserRole = await UserRole.destroy({
      where: { id },
    });

    if (!deleteUserRole) {
      return res.status(404).send({ message: "User role not found" });
    }

    res.status(200).send({ message: "User role deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUserRole,
  findAll,
  findOne,
  update,
  remove,
};

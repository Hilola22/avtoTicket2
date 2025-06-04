const { sendErrorResponse } = require("../helpers/send.error.response");
const Driver = require("../models/drivers.model");

const addDriver = async (req, res) => {
  try {
    const { name, phone_number } = req.body;

    const condidate = await Driver.findOne({ where: { phone_number } });
    if (condidate) {
      return sendErrorResponse({ message: "Driver not found" }, res);
    }

    const newDriver = await Driver.create({ name, phone_number });

    res.status(201).send({ message: "New driver added!", newDriver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const drivers = await Driver.findAll({});
    res.status(200).send({ data: drivers });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findOne({ where: { id } });
    if (!driver) {
      return res.status(404).send({ message: "Driver not found" });
    }
    res.status(200).send({ data: driver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateDriver = await Driver.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Driver updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDriver = await Driver.destroy({
      where: { id },
    });

    if (!deleteDriver) {
      return res.status(404).send({ message: "Driver not found" });
    }

    res.status(200).send({ message: "Driver deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDriver,
  findAll,
  findOne,
  update,
  remove,
};

const { sendErrorResponse } = require("../helpers/send.error.response");
const Buses = require("../models/buses.model");

const addBus = async (req, res) => {
  try {
    const { number_plate, seat_count, model } = req.body;

    const newBus = await Buses.create({
      number_plate,
      seat_count,
      model,
    });

    res.status(201).send({ message: "New bus added!", newBus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const buses = await Buses.findAll({});
    res.status(200).send({ data: buses });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Buses.findOne({ where: { id } });
    if (!bus) {
      return res.status(404).send({ message: "Bus not found" });
    }
    res.status(200).send({ data: bus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateBus = await Buses.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Bus updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBus = await Buses.destroy({
      where: { id },
    });

    if (!deleteBus) {
      return res.status(404).send({ message: "Bus not found" });
    }

    res.status(200).send({ message: "Bus deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBus,
  findAll,
  findOne,
  update,
  remove,
};

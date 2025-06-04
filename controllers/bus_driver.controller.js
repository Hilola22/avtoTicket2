const { sendErrorResponse } = require("../helpers/send.error.response");
const BusDriver = require("../models/bus_driver.model");
const Buses = require("../models/buses.model");
const Driver = require("../models/drivers.model");

const addBusDriver = async (req, res) => {
  try {
    const { busId, driverId } = req.body;
    const newBusDriver = await BusDriver.create({ busId, driverId });

    res.status(201).send({ message: "New bus bus driver added!", newBusDriver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const busDrivers = await BusDriver.findAll({
      include: [
        {
          model: Buses,
          attributes: ["number_plate", "seat_count", "model"]
        },
        {
          model: Driver,
          attributes: ["name", "phone_number"]
        }
      ]
    });
    res.status(200).send({ data: busDrivers });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const busDriver = await BusDriver.findOne({ where: { id } });
    if (!busDriver) {
      return res.status(404).send({ message: "Bus driver not found" });
    }
    res.status(200).send({ data: busDriver });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateBusDriver = await BusDriver.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Bus driver updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBusDriver = await BusDriver.destroy({
      where: { id },
    });

    if (!deleteBusDriver) {
      return res.status(404).send({ message: "Bus driver not found" });
    }

    res.status(200).send({ message: "Bus driver deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBusDriver,
  findAll,
  findOne,
  update,
  remove,
};

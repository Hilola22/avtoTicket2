const { sendErrorResponse } = require("../helpers/send.error.response");
const Schedule = require("../models/bus_schedules.model");

const addSchedule = async (req, res) => {
  try {
    const { routeId, busId, departure_time, price } = req.body;

    const newSchedule = await Schedule.create({
      routeId,
      busId,
      departure_time,
      price,
    });

    res.status(201).send({ message: "New schedule added!", newSchedule });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).send({ data: schedules });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findOne({ where: { id } });
    if (!schedule) {
      return res.status(404).send({ message: "Schedule not found" });
    }
    res.status(200).send({ data: schedule });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateSchedule = await Schedule.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Schedule updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSchedule = await Schedule.destroy({
      where: { id },
    });

    if (!deleteSchedule) {
      return res.status(404).send({ message: "Schedule not found" });
    }

    res.status(200).send({ message: "Schedule deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addSchedule,
  findAll,
  findOne,
  update,
  remove,
};

const { sendErrorResponse } = require("../helpers/send.error.response");
const Schedule = require("../models/bus_schedules.model");
const passangerTicket = require("../models/passanger.model");
const User = require("../models/user.model");

const addPassanger = async (req, res) => {
  try {
    const {
      scheduleId,
      seat_number,
      full_name,
      passport_number,
      phone_number,
      age,
      userId,
      status,
      date,
    } = req.body;

    const newPassanger = await passangerTicket.create({
      ...req.body
    });

    res.status(201).send({ message: "New passanger ticket added!", newPassanger });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const passanger = await passangerTicket.findAll({
      include: [
        {
          model: Schedule,
        },
        {
          model: User,
          attributes: ["id", "full_name", "phone_number", "email"]
        }
      ],
    });
    res.status(200).send({ data: passanger });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const passanger = await passangerTicket.findOne({ where: { id } });
    if (!passanger) {
      return res.status(404).send({ message: "Passanger ticket not found" });
    }
    res.status(200).send({ data: passanger });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updatePassanger = await passangerTicket.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Passanger ticket updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePassanger = await passangerTicket.destroy({
      where: { id },
    });

    if (!deletePassanger) {
      return res.status(404).send({ message: "Passanger ticket not found" });
    }

    res.status(200).send({ message: "Passanger ticket deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addPassanger,
  findAll,
  findOne,
  update,
  remove,
};

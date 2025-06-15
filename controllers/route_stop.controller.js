const { sendErrorResponse } = require("../helpers/send.error.response");
const Districts = require("../models/districts.model");
const routeStop = require("../models/route_stop.model");
const Routes = require("../models/routes.model");

const addrouteStop = async (req, res) => {
  try {
    const { routeId, districtId, stop_order, arrival_time, departure_time } = req.body;

    const newrouteStop = await routeStop.create({
      routeId,
      districtId,
      stop_order,
      arrival_time,
      departure_time,
    });

    res.status(201).send({ message: "New route stop added!", newrouteStop });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const route_stops = await routeStop.findAll({
      include: [
        {
          model: Districts,
          attributes: ["name", "regionId"],
        },
        {
          model: Routes
        }
      ],
    });
    res.status(200).send({ data: route_stops });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const route_stop = await routeStop.findOne({ where: { id } });
    if (!route_stop) {
      return res.status(404).send({ message: "Route stop not found" });
    }
    res.status(200).send({ data: route_stop });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updaterouteStop = await routeStop.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Route stop updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleterouteStop = await routeStop.destroy({
      where: { id },
    });

    if (!deleterouteStop) {
      return res.status(404).send({ message: "Route stop not found" });
    }

    res.status(200).send({ message: "Route stop deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addrouteStop,
  findAll,
  findOne,
  update,
  remove,
};

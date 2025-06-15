const { sendErrorResponse } = require("../helpers/send.error.response");
const routeStop = require("../models/route_stop.model");
const Routes = require("../models/routes.model");
const subRoute = require("../models/sub_route.model");

const addsubRoute = async (req, res) => {
  try {
    const { routeId, districtId, stop_order, arrival_time, departure_time } = req.body;

    const newsubRoute = await subRoute.create({
      routeId,
      districtId,
      stop_order,
      arrival_time,
      departure_time,
    });

    res.status(201).send({ message: "New sub route added!", newsubRoute });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const subRoutes = await subRoute.findAll({
      include: [
        {
          model: routeStop,
        },
        {
          model: Routes,
        },
      ],
    });
    res.status(200).send({ data: subRoutes });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const subRoute = await subRoute.findOne({ where: { id } });
    if (!subRoute) {
      return res.status(404).send({ message: "Sub route not found" });
    }
    res.status(200).send({ data: subRoute });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updatesubRoute = await subRoute.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Sub route updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletesubRoute = await subRoute.destroy({
      where: { id },
    });

    if (!deletesubRoute) {
      return res.status(404).send({ message: "Sub route not found" });
    }

    res.status(200).send({ message: "Sub route deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addsubRoute,
  findAll,
  findOne,
  update,
  remove,
};

const { sendErrorResponse } = require("../helpers/send.error.response");
const Districts = require("../models/districts.model");
const Routes = require("../models/routes.model");

const addRoutes = async (req, res) => {
  try {
    const { from_district_id, to_district_id, distance, estimated_time } = req.body;

    const newRoutes = await Routes.create({
      from_district_id,
      to_district_id,
      distance,
      estimated_time,
    });

    res.status(201).send({ message: "New route added!", newRoutes });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const routes = await Routes.findAll({
      include: [
        {
          model: Districts,
          attributes: ["name", "regionId"],
        },
      ],
    });
    res.status(200).send({ data: routes });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const routes = await Routes.findOne({ where: { id } });
    if (!routes) {
      return res.status(404).send({ message: "Routes not found" });
    }
    res.status(200).send({ data: routes });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateRoutes = await Routes.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Routes updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRoutes = await Routes.destroy({
      where: { id },
    });

    if (!deleteRoutes) {
      return res.status(404).send({ message: "Routes not found" });
    }

    res.status(200).send({ message: "Routes deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRoutes,
  findAll,
  findOne,
  update,
  remove,
};

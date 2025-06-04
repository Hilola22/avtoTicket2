const { sendErrorResponse } = require("../helpers/send.error.response");
const Regions = require("../models/regions.model");

const addRegion = async (req, res) => {
  try {
    const { name } = req.body;
    const newRegion = await Regions.create({ name });

    res.status(201).send({ message: "New region added!", newRegion });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const regions = await Regions.findAll({});
    res.status(200).send({ data: regions });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const region = await Regions.findOne({ where: { id } });
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }
    res.status(200).send({ data: region });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateRegion = await Regions.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Region updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRegion = await Regions.destroy({
      where: { id },
    });

    if (!deleteRegion) {
      return res.status(404).send({ message: "Region not found" });
    }

    res.status(200).send({ message: "Region deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRegion,
  findAll,
  findOne,
  update,
  remove,
};

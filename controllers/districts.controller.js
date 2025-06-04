const { sendErrorResponse } = require("../helpers/send.error.response");
const Districts = require("../models/districts.model");
const Regions = require("../models/regions.model");

const addDistrict = async (req, res) => {
  try {
    const { name, regionId } = req.body;
    const newDistrict = await Districts.create({ name, regionId });

    res.status(201).send({ message: "New district added!", newDistrict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const districts = await Districts.findAll({
      include: [
        {
          model: Regions,
          attributes: ["name"]
        }
      ]
    });
    res.status(200).send({ data: districts });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const district = await Districts.findOne({ where: { id } });
    if (!district) {
      return res.status(404).send({ message: "District not found" });
    }
    res.status(200).send({ data: district });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateDistrict = await Districts.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "District updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDistrict = await Districts.destroy({
      where: { id },
    });

    if (!deleteDistrict) {
      return res.status(404).send({ message: "District not found" });
    }

    res.status(200).send({ message: "District deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDistrict,
  findAll,
  findOne,
  update,
  remove,
};

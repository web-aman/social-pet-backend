const Pet = require("../models/petModel");
const moment = require("moment");
const mongoose = require("mongoose");
const { paginationQuery, pagination } = require("../functions/common");
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerPet = async (req, res) => {
  try {
    if (req?.fileValidationError) {
      return res.status(400).send({
        status: 400,
        message: req.fileValidationError,
      });
    }

    let obj = {
      petName: req?.body?.petName.trim(),
      petCategory: req?.body?.petCategory,
      age: req?.body?.age,
      gender: req?.body?.gender,
      petCategory: req?.body?.petCategory,
      petBreads: req?.body?.petBreads,
      dob: moment(new Date(req?.body?.dob)).format(
        "YYYY-MM-DD[T00:00:00.000Z]"
      ),
      location: req?.body?.location,
      address: req?.body?.address,
      aboutPets: req?.body?.aboutPets,
      uploadedBy: req.user._id,
    };

    if (req?.file?.filename) {
      obj["petProfile"] = `pets/${req.file.filename.trim()}`;
      obj["_id"] = mongoose.Types.ObjectId(
        req.file.filename.trim().split(".")[0]
      );
    }

    await Pet.create(obj);
    return res
      .status(201)
      .send({ status: 201, message: "Pet created successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const getPetList = async (req, res) => {
  let condition = {
    isDeleted: false,
  };
  const paginationData = await paginationQuery(req.query);

  if (req.query.search) {
    condition["petBreads"] = req.query.search;
  }

  const [petData, totalCount] = await Promise.all([
    Pet.find(condition)
      .skip(paginationData.skip)
      .limit(paginationData.pageSize),
    Pet.countDocuments(condition),
  ]);

  let obj = {
    page: paginationData.page,
    pageSize: paginationData.pageSize,
  };

  obj["total"] = totalCount;
  const getPagination = await pagination(obj);

  if (petData.length) {
    return res.status(200).send({
      data: petData,
      current: petData.length,
      totalCount,
      pagination: getPagination,
      message: "Pet data successfully received",
    });
  }
  return res.status(200).send({
    data: [],
    message: "No Record found",
  });
};

module.exports = { registerPet, getPetList };

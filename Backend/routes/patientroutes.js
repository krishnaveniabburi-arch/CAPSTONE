import express from 'express';
import Patient from "../models/Patient.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// Get all patients
router.get("/", auth, async (req, res, next) => 

  try {

    const patients = await Patient.find()
      .sort({ createdAt: -1 });


    res.status(200).json(patients);


  } catch (error) {

    next(error);

  }
});
router.get("/:id", auth, async (req, res, next) => {

  try {

    const patient = await Patient.findById(
      req.params.id
    );


    if (!patient) {

      res.status(404);

      throw new Error(
        "Patient not found"
      );

    }


    res.status(200).json(patient);


  } catch (error) {

    next(error);

  }

});
// create patient
router.post("/", auth, async (req, res, next) => {

  try {


    const patient = await Patient.create({

      firstName: req.body.firstName,

      lastName: req.body.lastName,

      age: req.body.age,

      gender: req.body.gender,

      phone: req.body.phone,

      email: req.body.email,

      address: req.body.address,

      doctor: req.body.doctor,

      diagnosis: req.body.diagnosis,

      appointmentDate:
        req.body.appointmentDate,

      notes: req.body.notes,

      createdBy: req.user.id

    });



    res.status(201).json(patient);



  } catch (error) {

    next(error);

  }

});

// Update patient
router.put("/:id", auth, async (req, res, next) => {

  try {


    const patient =
      await Patient.findById(
        req.params.id
      );



    if (!patient) {

      res.status(404);

      throw new Error(
        "Patient not found"
      );

    }



    const updatedPatient =
      await Patient.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true
        }

      );



    res.status(200)
      .json(updatedPatient);



  } catch (error) {

    next(error);

  }

});

// Delete patient
router.delete("/:id", auth, async (req, res, next) => {

  try {
    const patient =
      await Patient.findById(
        req.params.id
      );



    if (!patient) {

      res.status(404);

      throw new Error(
        "Patient not found"
      );

    }



    await patient.deleteOne();



    res.status(200).json({

      message:
        "Patient deleted successfully"

    });



  } catch (error) {

    next(error);

  }

});



export default router;
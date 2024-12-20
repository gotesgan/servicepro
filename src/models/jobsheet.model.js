import { prisma } from "../db/db.js";
import { date } from "../UTILS/TimeDate.js";

const CreateJobsheet = async (req, res) => {
  const {
    cutomer_name,
    cutomer_Contact,
    cutomer_email,
    device_Type,
    device_name,
    device_IMIE,
    problemDescription,
    serviceCharge,
  } = req.body;
  try {
    const jobsheet = await prisma.jobSheet.create({
      data: {
        cutomer_name,
        cutomer_Contact,
        cutomer_email,
        device_Type,
        device_name,
        device_IMIE,
        problemDescription,
        serviceCharge,
        userId: req.user.id,
      },
    });
    console.log(jobsheet);
  } catch (error) {
    console.log(error);
  }
  return;
};

const Updatejobsheet = async (req, res) => {
  let id = Number(req.query.id);
  if (!id) {
    res.status(400).json({ message: "Invalid Job ID" });
    console.log("not pressnt");
    return;
  } else {
    try {
      const job = await prisma.jobSheet.findUnique({
        where: {
          jobID: id,
        },
      });
      console.log(job);
      if (!job) {
        res.status(400).json({
          message: "job not found",
        });
        return;
      }
      try {
        if (job.jobStatus === "Pending") {
          await prisma.jobSheet.update({
            where: {
              jobID: id,
            },
            data: {
              jobStatus: "done",
              dateCompleted: new Date(),
            },
          });
          console.log(job.jobStatus);
        } else {
          await prisma.jobSheet.update({
            where: {
              jobID: id,
            },
            data: {
              jobStatus: "Pending",
              dateCompleted: null,
            },
          });
          console.log(job.jobStatus);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "unabel to change status",
        });
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "something went wrong",
      });
      return;
    }
  }
  res.status(200).json({ message: "job updated succuesfuly" });
  return;
};
const Editjobsheet = async (req, res) => {
  let id = Number(req.query.id);
  if (!id) {
    res.status(400).json({ message: "Invalid Job ID" });
    console.log("not pressnt");
    return;
  }

  const {
    cutomer_name,
    cutomer_Contact,
    cutomer_email,
    problemDescription,
    serviceCharge,
  } = req.body;

  //check if data is presnt or not
  const updateData = {
    cutomer_name: cutomer_name || undefined,
    cutomer_Contact: cutomer_Contact || undefined,
    problemDescription: problemDescription || undefined,
    serviceCharge: serviceCharge || undefined,
  };
  try {
    const update = await prisma.jobSheet.update({
      where: {
        jobID: id,
      },
      data: updateData,
    });
    console.log(update);
    res.status(200).json({
      message: "update successful",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500);
    return;
  }
  return;
};

export { Updatejobsheet };
export { Editjobsheet };
export { CreateJobsheet };

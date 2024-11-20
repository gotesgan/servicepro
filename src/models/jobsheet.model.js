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
};

export { CreateJobsheet };

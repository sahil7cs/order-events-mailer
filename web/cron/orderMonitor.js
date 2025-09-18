import cron from "node-cron";
import { isOrderWithin } from "../services/order.service.js";
import { sendMail } from "../utils/nodemailer.js";

export async function cronTask() {
  try {
    const isOrderWithin30Mins = await isOrderWithin(15);

    if (!isOrderWithin30Mins) {
      await sendMail();
    } else {
      console.log("There has been some orders within the last 15mins");
    }
  } catch (err) {
    console.error("Error in cronTask:", err); 
    throw err; 
  }
}


// Runs every 15 minutes
const task = cron.schedule("*/15 * * * *", cronTask);

task.start();

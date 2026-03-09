import cron from "node-cron";
import User from "../../models/User.js";
import FutureEvent from "../models/FutureEvent.js";
import { predictLifeEvents } from "../services/eventPredictor.js";

cron.schedule("0 0 * * 0", async () => {
  const users = await User.find();

  for (const user of users) {
    const events = await predictLifeEvents(user);

    for (const event of events) {
      await FutureEvent.create({
        userId: user._id,
        eventName: event.eventName,
        probability: event.probability,
        expectedMonth: event.expectedMonth
      });
    }
  }

  console.log("Weekly Future Prediction Completed");
});
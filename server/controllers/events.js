import Event from "../models/event.js";

export const getAllEvents = async (req, res) => {
  try {
    //const events = await Event.find({});
    const events = [
      {
        id: "5d6ede6a0ba62570afcedd3a",
        title: "TEST TITLE",
        description: "TEST DESC",
        date: new Date(),
        createdBy: "5d6ede6a0ba62570afcedd3b",
        venue: "5d6ede6a0ba62570afcedd3c",
      },
      {
        id: "6d6ede6a0ba62570afcedd3a",
        title: "TEST TITLE 2",
        description: "TEST DESC 2",
        date: new Date(),
        createdBy: "6d6ede6a0ba62570afcedd3b",
        venue: "6d6ede6a0ba62570afcedd3c",
      },
    ];
    res.json(events);
  } catch (error) {
    res.status(400).json("Error fetching all events: " + error.message);
  }
};

export const createEvent = async (req, res) => {
  const { name, date, location } = req.body;
  const newEvent = new Event({ name, date, location });
  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res
      .status(400)
      .json({ message: `Failed to create event. Error: ${err.message}` });
  }
};

import axiosInstance from "./axiosInstance";

export const getEvents = async () => {
  try {
    const eventsList = await axiosInstance.get("/events");
    return eventsList;
  } catch (error) {
    throw error;
  }
};

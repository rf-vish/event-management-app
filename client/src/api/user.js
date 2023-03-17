import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  try {
    const newUser = await axiosInstance.post("/register", userData);
    return newUser;
  } catch (error) {
    console.log("Request error:", error.message);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(`Could not create new user. Error: ${error.message}`);
    }
  }
};

export const signIn = async (userData) => {
  try {
    const result = await axiosInstance.post("/login", userData);
    return result;
  } catch (error) {
    console.log("Request error:", error.message);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(`Could not sign in. Error: ${error.message}`);
    }
  }
};

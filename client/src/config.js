// export const API_BASE_URL = "http://localhost:3000";

module.exports = {
  API_BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  apiKey: process.env.REACT_APP_API_KEY || "123456",
  customVariable: "my value",
};

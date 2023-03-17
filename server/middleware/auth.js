import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Invalid username or password");
      throw new Error("Invalid username or password");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Invalid username or password");
      throw new Error("Invalid username or password");
    }
    const token = generateToken(user);
    return { token };
  } catch (error) {
    console.log("Could not authenticate user. Error: " + error.message);
    throw new Error("Could not authenticate user. Error: " + error.message);
  }
};

export const hashPassword = async (password, saltRounds = 12) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Could not hash the password. Error: " + error.message);
  }
};

export const verifyUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // Token is missing, return unauthorized error
    return res.status(401).json({ error: "Unauthorized access!" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded userId to the request object
    req.userId = decoded;

    next();
  } catch (error) {
    console.log("Unauthorized access: " + error.message);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

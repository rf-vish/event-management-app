import User from "../models/user.js";
import {
  hashPassword,
  authenticateUser,
  generateToken,
} from "../middleware/auth.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists. Please try a different username.",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        error: "Email already exists. Please try a different email.",
      });
    }

    // TODO: Add Validation for different fields (email, password etc.)

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();

    // Generate a token for the new user
    const token = generateToken({ savedUser });

    res.status(201).json({
      id: savedUser.id,
      token,
      message: "User succcessfully registered!",
    });
  } catch (error) {
    console.log("Error creating new user: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await authenticateUser(username, password);

    req.session.token = result.token;
    res
      .status(200)
      .json({ message: "User logged in successfully", token: result.token });
  } catch (error) {
    console.log("Error logging in user. Error: " + error.message);
    res
      .status(500)
      .json({ error: "Error logging in user. Error: " + error.message });
  }
};

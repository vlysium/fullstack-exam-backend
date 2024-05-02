import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// reusable function to handle errors
function handleErrors(error: any, res: any): void {
  if (error.code === 11000) { // email already exists
    return res.status(400).json({ message: "Email already exists" });
  }
  if (error.name === "CastError") { // invalid mongodb _id
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (error.message) {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Unexpected server error" });
}

// signup controller
const signup = async (req: any, res: any) => {
  try {
    const { name, email, password }: IUser = req.body;

    // validate the user input
    if (!name || !email || !password) {
      throw new Error("Please enter all fields");
    }

    // validate the password
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    
    // create a new user
    const newUser: IUser = new User({ name, email, password });

    // salt the password
    const salt = await bcrypt.genSalt();

    // hash the password
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    const user = await newUser.save();

    // create a jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role},
      process.env.JWT_SECRET as string,
      { expiresIn: 3600 }
    );

    // send the response to the client
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.balance,
      } as IUser,
    });

  } catch (error: any) {
    handleErrors(error, res);
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, password }: IUser = req.body;

    // validate the user input
    if (!email || !password) {
      throw new Error("Please enter all fields");
    }

    // find the user
    const user = await User.findOne({ email });

    // check if the user exists
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // check if the user is banned
    if (user.is_deleted) {
      throw new Error("Your account is banned from the platform");
    }

    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // create a jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: 3600 }
    );

    // send the response to the client
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.balance,
      } as IUser,
    });

  } catch (error: any) {
    handleErrors(error, res);
  }
}

const getUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error: any) {
    handleErrors(error, res);
  }
}

// soft delete a user in the database
const deleteUser = async (req: any, res: any) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { is_deleted: !req.user.is_deleted }); // allows admins to ban/unban a user
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ message: "User deleted successfully" }); // should be 204 but a message is better
  } catch (error: any) {
    handleErrors(error, res);
  }
}

export default { signup, login, getUser, deleteUser };
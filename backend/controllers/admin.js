import User from "../models/user.js";

// Get All Users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get A User
export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(user);
  } catch (error) {
    if (!error.message) {
      error.message = "User not found";
    }
    next(error);
  }
};

// Update a user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, isAdmin } = req.body;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    await User.findByIdAndRemove(user._id);

    res.json({ message: "User removed" });
  } catch (error) {
    next(error);
  }
};

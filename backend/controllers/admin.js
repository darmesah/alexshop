import User from "../models/user";

// Get All Users
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("name email isAdmin");

    if (!user) {
      const error = new Error("Could not find user information");
      error.statusCode = 404;
      throw error;
    }

    res.json(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

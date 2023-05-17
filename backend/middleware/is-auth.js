import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const error = new Error("Not authenticated. ");
      error.statusCode = 401;
      throw error;
    }

    const token = req.get("Authorization").split(" ")[1];

    let decodedToken;

    decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      const error = new Error("Not Authenticated");
      error.statusCode = 401;
      throw error;
    }

    req.user = await User.findById(decodedToken.userId).select("-password");
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

  next();
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      const error = new Error("Is not an admin");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
